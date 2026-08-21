import phonePeClient from "../config/phonepe.js";
import supabase from "../config/supabase.js";
import { StandardCheckoutPayRequest } from "@phonepe-pg/pg-sdk-node";
import { randomUUID } from "crypto";


// ======================================================
// CREATE PAYMENT
// ======================================================

export const createPayment = async (req, res) => {
  try {
    // Logged-in user
    const userId = req.user.id;

    // Mam ne ₹1 test payment bola hai
    // ₹1 = 100 paise
    const amount = 100;

    const merchantOrderId = `MATRI_${randomUUID()}`;

    const redirectUrl =
  `https://matrimonial-alpha.vercel.app/payment-success?orderId=${merchantOrderId}`;

    // ==================================================
    // 1. Pehle pending payment database mein create karo
    // ==================================================

    const { error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          user_id: userId,
          order_id: merchantOrderId,
          plan_name: "Premium",
          amount: 1,
          currency: "INR",
          payment_status: "pending",
        },
      ]);

    if (paymentError) {
      console.error("Payment DB Insert Error:", paymentError);

      return res.status(500).json({
        success: false,
        message: "Unable to create payment record",
        error: paymentError.message,
      });
    }


    // ==================================================
    // 2. PhonePe payment request
    // ==================================================

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(redirectUrl)
      .build();


    // ==================================================
    // 3. PhonePe checkout create
    // ==================================================

    const response = await phonePeClient.pay(request);

    console.log("PhonePe Response:", response);


    // ==================================================
    // 4. Frontend ko checkout URL bhejo
    // ==================================================

    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      orderId: merchantOrderId,
      checkoutUrl: response.redirectUrl,
    });

  } catch (error) {

    console.error("PhonePe Payment Error:", error);

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


    // ==================================================
    // 1. PhonePe se latest status lo
    // ==================================================

    const response = await phonePeClient.getOrderStatus(orderId);

    console.log("PhonePe Status Response:", response);


    const status = response.state;


    // ==================================================
    // 2. PhonePe payment details se transaction ID
    // ==================================================

    let transactionId = null;
    let paymentMethod = null;

    if (
      response.paymentDetails &&
      response.paymentDetails.length > 0
    ) {
      const payment = response.paymentDetails[0];

      transactionId = payment.transactionId || null;
      paymentMethod = payment.paymentMode || null;
    }


    // ==================================================
    // 3. Payment COMPLETED hai to database update karo
    // ==================================================

    if (status === "COMPLETED") {

      const { error: updateError } = await supabase
        .from("payments")
        .update({
          payment_status: "paid",
          transaction_id: transactionId,
          payment_method: paymentMethod,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("order_id", orderId);


      if (updateError) {
        console.error(
          "Payment Update Error:",
          updateError
        );
      }
    }


    // ==================================================
    // 4. Payment FAILED hai to database update karo
    // ==================================================

    if (
      status === "FAILED" ||
      status === "CANCELLED"
    ) {

      const { error: updateError } = await supabase
        .from("payments")
        .update({
          payment_status: "failed",
          transaction_id: transactionId,
          payment_method: paymentMethod,
          updated_at: new Date().toISOString(),
        })
        .eq("order_id", orderId);


      if (updateError) {
        console.error(
          "Failed Payment Update Error:",
          updateError
        );
      }
    }


    // ==================================================
    // 5. Frontend ko response
    // ==================================================

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