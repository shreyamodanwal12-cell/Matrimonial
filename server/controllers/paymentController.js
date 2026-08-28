import phonePeClient from "../config/phonepe.js";
import supabase from "../config/supabase.js";
import { StandardCheckoutPayRequest } from "@phonepe-pg/pg-sdk-node";
import { randomUUID } from "crypto";


// ======================================================
// CREATE PAYMENT
// ======================================================
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";
export const createPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    // ₹1 test payment
    const amount = 100;

    const {
      planName,
      duration,
    } = req.body;

    console.log("Payment Request:", {
      userId,
      planName,
      duration,
    });

    if (!planName) {
      return res.status(400).json({
        success: false,
        message: "Plan name is required",
      });
    }

    const merchantOrderId = `MATRI_${randomUUID()}`;

    const redirectUrl =
       `${FRONTEND_URL}/payment-success?orderId=${merchantOrderId}`;


    // ==========================================
    // CREATE PENDING PAYMENT
    // ==========================================

    const { data: paymentData, error: paymentError } =
      await supabase
        .from("payments")
        .insert([
          {
            user_id: userId,
            order_id: merchantOrderId,
            plan_name: planName,
            amount: 1,
            currency: "INR",
            payment_status: "pending",
          },
        ])
        .select()
        .single();

    if (paymentError) {
      console.error(
        "Payment DB Insert Error:",
        paymentError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to create payment record",
        error: paymentError.message,
      });
    }

    console.log(
      "Payment Created:",
      paymentData
    );


    // ==========================================
    // PHONEPE REQUEST
    // ==========================================

    const request =
      StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .redirectUrl(redirectUrl)
        .build();


    // ==========================================
    // PHONEPE CHECKOUT
    // ==========================================

    const response =
      await phonePeClient.pay(request);

    console.log(
      "PhonePe Response:",
      response
    );


    // ==========================================
    // SEND CHECKOUT URL
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      orderId: merchantOrderId,
      checkoutUrl: response.redirectUrl,
    });

  } catch (error) {

    console.error(
      "PhonePe Payment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create payment",
      error: error.message,
    });
  }
};



// ======================================================
// CHECK PAYMENT STATUS
// ======================================================

export const checkPaymentStatus = async (req, res) => {
  try {

    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }


    // ==========================================
    // 1. PHONEPE STATUS
    // ==========================================

    const response =
      await phonePeClient.getOrderStatus(orderId);

    console.log(
      "PhonePe Status Response:",
      response
    );

    const status = response.state;


    // ==========================================
    // 2. TRANSACTION DETAILS
    // ==========================================

    let transactionId = null;
    let paymentMethod = null;

    if (
      response.paymentDetails &&
      response.paymentDetails.length > 0
    ) {

      const payment =
        response.paymentDetails[0];

      transactionId =
        payment.transactionId || null;

      paymentMethod =
        payment.paymentMode || null;
    }


    // ==========================================
    // 3. PAYMENT RECORD FIND
    // ==========================================

    const {
      data: paymentData,
      error: paymentFetchError,
    } = await supabase
      .from("payments")
      .select("*")
      .eq("order_id", orderId)
      .single();


    if (paymentFetchError || !paymentData) {

      console.error(
        "Payment Record Fetch Error:",
        paymentFetchError
      );

      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }


    // ==========================================
    // 4. PAYMENT COMPLETED
    // ==========================================

   
// ==========================================
// 3. Check karo membership already bani hai
// ==========================================

const { data: existingMembership, error: membershipCheckError } =
  await supabase
    .from("memberships")
    .select("id")
    .eq("payment_id", paymentData.id)
    .maybeSingle();

if (membershipCheckError) {
  console.error(
    "Membership Check Error:",
    membershipCheckError
  );
}


// ==========================================
// 4. Agar membership nahi bani hai
// ==========================================

if (!existingMembership) {

  const startDate = new Date();

  // ------------------------------------------
  // Plan ke according duration decide karo
  // ------------------------------------------

  let duration;
  let months;

  if (paymentData.plan_name === "Basic") {
    duration = "1 Month";
    months = 1;
  }

  else if (paymentData.plan_name === "Premium") {
    duration = "3 Months";
    months = 3;
  }

  else if (paymentData.plan_name === "Royal") {
    duration = "6 Months";
    months = 6;
  }

  else {
    console.error(
      "Unknown Plan:",
      paymentData.plan_name
    );

    return res.status(400).json({
      success: false,
      message: "Invalid plan name",
    });
  }


  // ------------------------------------------
  // End date calculate karo
  // ------------------------------------------

  const endDate = new Date(startDate);

  endDate.setMonth(
    endDate.getMonth() + months
  );


  // ==========================================
  // MEMBERSHIP INSERT
  // ==========================================

  const {
    data: membershipData,
    error: membershipError
  } = await supabase
    .from("memberships")
    .insert([
      {
        user_id: paymentData.user_id,
        plan_name: paymentData.plan_name,
        duration: duration,
        amount: paymentData.amount,
        payment_id: paymentData.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: "ACTIVE",
      },
    ])
    .select()
    .single();


  if (membershipError) {

    console.error(
      "❌ Membership Insert Error:",
      membershipError
    );

  } else {

    console.log(
      "✅ Membership Created Successfully:",
      membershipData
    );
  }

} else {

  console.log(
    "ℹ️ Membership already exists:",
    existingMembership.id
  );
}

    // ==========================================
    // 5. PAYMENT FAILED
    // ==========================================

    if (
      status === "FAILED" ||
      status === "CANCELLED"
    ) {

      const {
        error: failedUpdateError,
      } = await supabase
        .from("payments")
        .update({
          payment_status: "failed",
          transaction_id: transactionId,
          payment_method: paymentMethod,
          updated_at: new Date().toISOString(),
        })
        .eq("order_id", orderId);


      if (failedUpdateError) {

        console.error(
          "Failed Payment Update Error:",
          failedUpdateError
        );
      }
    }


    // ==========================================
    // 6. RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      orderId,
      status,
      response,
    });

  } catch (error) {

    console.error(
      "PhonePe Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to check payment status",
      error: error.message,
    });
  }
};