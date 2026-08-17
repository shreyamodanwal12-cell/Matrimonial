import { useState } from "react";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const selectedPlan = {
    name: "Premium",
    duration: "3 Months",
    price: 999,
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    alert(
      "Payment UI is ready. Actual payment gateway will be connected later."
    );
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      {/* ================= HEADER ================= */}
      <header className="border-b border-[#eadfce] bg-white">

        <div className="mx-auto flex max-w-[1150px] items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[20px] text-[#f5c45e]">
              ॐ
            </div>

            <div>
              <h1 className="font-serif text-[18px] font-semibold text-[#8c1d18]">
                Shiva Parvati
              </h1>

              <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                Matrimonial
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg border border-[#eadfce] px-4 py-2 text-[10px] font-medium text-[#806653] transition hover:bg-[#fff5e8] hover:text-[#8c1d18]"
          >
            ← Back
          </button>

        </div>

      </header>


      {/* ================= PAGE TITLE ================= */}
      <section className="px-5 pb-7 pt-10 text-center">

        <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
          Secure Checkout
        </p>

        <h2 className="mt-2 font-serif text-[32px] font-semibold text-[#4a1712]">
          Complete Your Payment
        </h2>

        <p className="mx-auto mt-2 max-w-[500px] text-[10px] leading-5 text-[#806653]">
          Complete your details and choose your preferred payment method.
        </p>

      </section>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1000px] px-5 pb-14">

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">


          {/* ================= LEFT: PAYMENT FORM ================= */}
          <section className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_6px_25px_rgba(73,38,20,0.06)] sm:p-7">

            <div className="mb-6">

              <h3 className="font-serif text-[23px] font-semibold text-[#4a1712]">
                Customer Details
              </h3>

              <p className="mt-1 text-[9px] text-[#9a806f]">
                Enter the details required to continue.
              </p>

            </div>


            <form onSubmit={handlePayment}>

              {/* Name */}
              <div>

                <label className="mb-1.5 block text-[10px] font-medium text-[#563927]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="h-11 w-full rounded-lg border border-[#e7d8c7] bg-[#fffdf9] px-3 text-[10px] text-[#563927] outline-none transition placeholder:text-[#b6a294] focus:border-[#c58a25] focus:ring-2 focus:ring-[#e7c77e]/30"
                />

              </div>


              {/* Email + Mobile */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-[10px] font-medium text-[#563927]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="h-11 w-full rounded-lg border border-[#e7d8c7] bg-[#fffdf9] px-3 text-[10px] text-[#563927] outline-none transition placeholder:text-[#b6a294] focus:border-[#c58a25] focus:ring-2 focus:ring-[#e7c77e]/30"
                  />

                </div>


                <div>

                  <label className="mb-1.5 block text-[10px] font-medium text-[#563927]">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                    className="h-11 w-full rounded-lg border border-[#e7d8c7] bg-[#fffdf9] px-3 text-[10px] text-[#563927] outline-none transition placeholder:text-[#b6a294] focus:border-[#c58a25] focus:ring-2 focus:ring-[#e7c77e]/30"
                  />

                </div>

              </div>


              {/* Divider */}
              <div className="my-7 h-px bg-[#eee4d8]" />


              {/* Payment Method */}
              <div>

                <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                  Payment Method
                </h3>

                <p className="mt-1 text-[9px] text-[#9a806f]">
                  Select how you would like to pay.
                </p>

              </div>


              <div className="mt-5 space-y-3">

                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-[#c58a25] bg-[#fff8ea]"
                      : "border-[#eadfce] bg-white hover:bg-[#fffaf5]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8e8ca] text-[17px]">
                      📱
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        UPI
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        Google Pay, PhonePe, Paytm & more
                      </p>

                    </div>

                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      paymentMethod === "upi"
                        ? "border-[#8c1d18]"
                        : "border-[#cdbca9]"
                    }`}
                  >
                    {paymentMethod === "upi" && (
                      <span className="h-2 w-2 rounded-full bg-[#8c1d18]" />
                    )}
                  </div>

                </button>


                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#c58a25] bg-[#fff8ea]"
                      : "border-[#eadfce] bg-white hover:bg-[#fffaf5]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8e8ca] text-[17px]">
                      💳
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        Credit / Debit Card
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        Visa, Mastercard & RuPay
                      </p>

                    </div>

                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      paymentMethod === "card"
                        ? "border-[#8c1d18]"
                        : "border-[#cdbca9]"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <span className="h-2 w-2 rounded-full bg-[#8c1d18]" />
                    )}
                  </div>

                </button>


                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "netbanking"
                      ? "border-[#c58a25] bg-[#fff8ea]"
                      : "border-[#eadfce] bg-white hover:bg-[#fffaf5]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8e8ca] text-[17px]">
                      🏦
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        Net Banking
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        Pay securely through your bank
                      </p>

                    </div>

                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      paymentMethod === "netbanking"
                        ? "border-[#8c1d18]"
                        : "border-[#cdbca9]"
                    }`}
                  >
                    {paymentMethod === "netbanking" && (
                      <span className="h-2 w-2 rounded-full bg-[#8c1d18]" />
                    )}
                  </div>

                </button>

              </div>


              {/* Pay Button */}
              <button
                type="submit"
                className="mt-7 h-12 w-full rounded-lg bg-[#d92c2c] text-[11px] font-semibold text-white shadow-[0_7px_18px_rgba(217,44,44,0.18)] transition hover:-translate-y-0.5 hover:bg-[#bd2020]"
              >
                Pay ₹{selectedPlan.price} Securely
              </button>

              <p className="mt-3 text-center text-[8px] text-[#a28c7c]">
                🔒 Your payment information is secure and protected.
              </p>

            </form>

          </section>


          {/* ================= RIGHT: ORDER SUMMARY ================= */}
          <aside className="h-fit rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_6px_25px_rgba(73,38,20,0.06)] sm:p-6">

            <p className="text-[8px] font-semibold uppercase tracking-[2px] text-[#a67c35]">
              Order Summary
            </p>

            <h3 className="mt-2 font-serif text-[24px] font-semibold text-[#4a1712]">
              Your Membership
            </h3>


            {/* Plan */}
            <div className="mt-6 rounded-xl bg-[#fff8ea] p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] uppercase tracking-[1px] text-[#a67c35]">
                    Selected Plan
                  </p>

                  <h4 className="mt-1 font-serif text-[22px] font-semibold text-[#8c1d18]">
                    {selectedPlan.name}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedPlan.duration} membership
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-serif text-[26px] font-semibold text-[#4a1712]">
                    ₹{selectedPlan.price}
                  </p>

                </div>

              </div>

            </div>


            {/* Benefits */}
            <div className="mt-6">

              <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#8c1d18]">
                Included Benefits
              </p>

              <div className="mt-4 space-y-3">

                {[
                  "Unlimited profile browsing",
                  "Priority profile visibility",
                  "Direct contact access",
                  "Premium support",
                ].map((benefit) => (

                  <div
                    key={benefit}
                    className="flex items-center gap-2"
                  >

                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#f7e8c9] text-[8px] font-bold text-[#8c1d18]">
                      ✓
                    </span>

                    <span className="text-[9px] text-[#604738]">
                      {benefit}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Price Breakdown */}
            <div className="mt-6 border-t border-[#eadfce] pt-5">

              <div className="flex items-center justify-between">

                <span className="text-[9px] text-[#806653]">
                  Membership
                </span>

                <span className="text-[10px] font-medium text-[#4f3425]">
                  ₹{selectedPlan.price}
                </span>

              </div>


              <div className="mt-3 flex items-center justify-between">

                <span className="text-[9px] text-[#806653]">
                  Taxes
                </span>

                <span className="text-[10px] font-medium text-[#4f3425]">
                  Included
                </span>

              </div>


              <div className="mt-4 flex items-center justify-between border-t border-[#eadfce] pt-4">

                <span className="text-[11px] font-semibold text-[#4a1712]">
                  Total
                </span>

                <span className="font-serif text-[25px] font-semibold text-[#8c1d18]">
                  ₹{selectedPlan.price}
                </span>

              </div>

            </div>


            {/* Security */}
            <div className="mt-6 rounded-lg border border-[#eee4d8] bg-[#fffaf5] p-3">

              <div className="flex gap-2">

                <span className="text-[13px]">
                  🔒
                </span>

                <p className="text-[8px] leading-4 text-[#806653]">
                  Your transaction will be processed securely. We never store
                  your card or payment credentials.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default PaymentPage;