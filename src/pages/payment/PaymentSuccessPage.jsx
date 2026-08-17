function PaymentSuccessPage() {
  const orderDetails = {
    plan: "Premium",
    duration: "3 Months",
    amount: "999",
    orderId: "SPM-2026-001245",
    date: "15 August 2026",
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

        </div>
      </header>


      {/* ================= SUCCESS CONTENT ================= */}
      <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-5 py-12">

        <div className="w-full max-w-[600px]">

          {/* Success Card */}
          <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-8 text-center shadow-[0_10px_35px_rgba(73,38,20,0.08)] sm:px-10 sm:py-10">

            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-[#e5f3e9] bg-[#e7f6ed]">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#287b51] text-[25px] font-bold text-white">
                ✓
              </div>

            </div>


            {/* Heading */}
            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
              Payment Successful
            </p>

            <h2 className="mt-2 font-serif text-[32px] font-semibold text-[#4a1712] sm:text-[38px]">
              Congratulations! 🎉
            </h2>

            <p className="mx-auto mt-3 max-w-[430px] text-[10px] leading-5 text-[#806653]">
              Your premium membership has been successfully activated.
              Your matrimonial journey just got better.
            </p>


            {/* Membership Activated */}
            <div className="mt-7 rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5 text-left">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[1.5px] text-[#a67c35]">
                    Membership Activated
                  </p>

                  <h3 className="mt-1 font-serif text-[23px] font-semibold text-[#8c1d18]">
                    {orderDetails.plan} Plan
                  </h3>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {orderDetails.duration} membership
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[8px] text-[#9a806f]">
                    Amount Paid
                  </p>

                  <p className="mt-1 font-serif text-[25px] font-semibold text-[#4a1712]">
                    ₹{orderDetails.amount}
                  </p>
                </div>

              </div>

            </div>


            {/* Order Details */}
            <div className="mt-5 rounded-xl border border-[#eadfce] bg-white p-5 text-left">

              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[1.5px] text-[#8c1d18]">
                Transaction Details
              </p>

              <div className="space-y-3">

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] text-[#9a806f]">
                    Order ID
                  </span>

                  <span className="text-[9px] font-semibold text-[#4f3425]">
                    {orderDetails.orderId}
                  </span>
                </div>

                <div className="h-px bg-[#f0e7dc]" />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] text-[#9a806f]">
                    Payment Date
                  </span>

                  <span className="text-[9px] font-semibold text-[#4f3425]">
                    {orderDetails.date}
                  </span>
                </div>

                <div className="h-px bg-[#f0e7dc]" />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] text-[#9a806f]">
                    Payment Status
                  </span>

                  <span className="rounded-full bg-[#e7f6ed] px-3 py-1 text-[8px] font-semibold text-[#287b51]">
                    Paid
                  </span>
                </div>

              </div>

            </div>


            {/* Buttons */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="h-11 rounded-lg bg-[#8c1d18] text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(140,29,24,0.16)] transition hover:-translate-y-0.5 hover:bg-[#711611]"
              >
                Go to Home
              </button>

              <button
                type="button"
                onClick={() => {
                  alert("Profile page will be connected later.");
                }}
                className="h-11 rounded-lg border border-[#d7a744] bg-white text-[10px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5df]"
              >
                View My Profile
              </button>

            </div>


            {/* Security Message */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[8px] text-[#9a806f]">
              <span>🔒</span>
              <span>Your payment was processed securely.</span>
            </div>

          </div>


          {/* Bottom Message */}
          <p className="mt-6 text-center font-serif text-[17px] italic text-[#751b17]">
            “Your beautiful story begins here.”
          </p>

        </div>

      </main>

    </div>
  );
}

export default PaymentSuccessPage;