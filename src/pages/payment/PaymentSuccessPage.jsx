import { useEffect, useState } from "react";

function PaymentSuccessPage() {
  const [paymentStatus, setPaymentStatus] = useState("LOADING");
  const [paymentData, setPaymentData] = useState(null);

  // URL se orderId lena
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  // Backend se PhonePe payment status check karna
  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!orderId) {
          setPaymentStatus("FAILED");
          return;
        }

        const token = localStorage.getItem("token");

const response = await fetch(
  `http://localhost:5000/api/payment/status/${orderId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        const data = await response.json();

        console.log("Payment Status Response:", data);

        if (data.success) {
          setPaymentStatus(data.status);
          setPaymentData(data.response);
        } else {
          setPaymentStatus("FAILED");
        }
      } catch (error) {
        console.error("Payment Status Error:", error);
        setPaymentStatus("FAILED");
      }
    };

    checkStatus();
  }, [orderId]);

  // PhonePe se actual amount
  const amount = paymentData?.amount
    ? paymentData.amount / 100
    : 0;

  // Payment date
  const paymentDate = paymentData?.paymentDetails?.[0]?.timestamp
    ? new Date(
        paymentData.paymentDetails[0].timestamp
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  // ================= LOADING =================
  if (paymentStatus === "LOADING") {
    return (
      <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">
        <header className="border-b border-[#eadfce] bg-white">
          <div className="mx-auto flex max-w-[1150px] items-center px-5 py-4">
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

        <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-5">
          <div className="rounded-2xl border border-[#eadfce] bg-white px-10 py-12 text-center shadow-[0_10px_35px_rgba(73,38,20,0.08)]">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#eadfce] border-t-[#8c1d18]" />

            <h2 className="mt-6 font-serif text-[28px] font-semibold text-[#4a1712]">
              Verifying Payment...
            </h2>

            <p className="mt-2 text-[10px] text-[#806653]">
              Please wait while we confirm your payment with PhonePe.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ================= SUCCESS =================
  if (paymentStatus === "COMPLETED") {
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
                      Premium Plan
                    </h3>

                    <p className="mt-1 text-[9px] text-[#806653]">
                      3 Months membership
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] text-[#9a806f]">
                      Amount Paid
                    </p>

                    <p className="mt-1 font-serif text-[25px] font-semibold text-[#4a1712]">
                      ₹{amount}
                    </p>
                  </div>

                </div>

              </div>


              {/* Transaction Details */}
              <div className="mt-5 rounded-xl border border-[#eadfce] bg-white p-5 text-left">

                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[1.5px] text-[#8c1d18]">
                  Transaction Details
                </p>

                <div className="space-y-3">

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] text-[#9a806f]">
                      Order ID
                    </span>

                    <span className="break-all text-right text-[9px] font-semibold text-[#4f3425]">
                      {orderId}
                    </span>
                  </div>

                  <div className="h-px bg-[#f0e7dc]" />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] text-[#9a806f]">
                      Payment Date
                    </span>

                    <span className="text-[9px] font-semibold text-[#4f3425]">
                      {paymentDate}
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
  window.location.href = "/my-membership";
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

  // ================= PENDING =================
  if (paymentStatus === "PENDING") {
    return (
      <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

        <header className="border-b border-[#eadfce] bg-white">
          <div className="mx-auto flex max-w-[1150px] items-center px-5 py-4">

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

        <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-5 py-12">

          <div className="w-full max-w-[600px]">

            <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-10 text-center shadow-[0_10px_35px_rgba(73,38,20,0.08)] sm:px-10">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-[#fff0c2] bg-[#fff8df]">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7a744] text-[25px] font-bold text-white">
                  !
                </div>

              </div>

              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
                Payment Pending
              </p>

              <h2 className="mt-2 font-serif text-[32px] font-semibold text-[#4a1712] sm:text-[38px]">
                Payment is Processing
              </h2>

              <p className="mx-auto mt-3 max-w-[430px] text-[10px] leading-5 text-[#806653]">
                Your payment is still being processed by PhonePe.
                Please wait a little and check your payment status again.
              </p>

              <div className="mt-7 rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5 text-left">

                <p className="text-[8px] font-semibold uppercase tracking-[1.5px] text-[#a67c35]">
                  Transaction Details
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-[9px] text-[#9a806f]">
                    Order ID
                  </span>

                  <span className="break-all text-right text-[9px] font-semibold text-[#4f3425]">
                    {orderId}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[9px] text-[#9a806f]">
                    Status
                  </span>

                  <span className="rounded-full bg-[#fff4cf] px-3 py-1 text-[8px] font-semibold text-[#a67c35]">
                    Pending
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="mt-7 h-11 w-full rounded-lg bg-[#8c1d18] text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(140,29,24,0.16)] transition hover:-translate-y-0.5 hover:bg-[#711611]"
              >
                Check Payment Status Again
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ================= FAILED =================
  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      <header className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto flex max-w-[1150px] items-center px-5 py-4">

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

      <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-5 py-12">

        <div className="w-full max-w-[600px]">

          <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-10 text-center shadow-[0_10px_35px_rgba(73,38,20,0.08)] sm:px-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-[#f7dddd] bg-[#fff0f0]">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b83232] text-[25px] font-bold text-white">
                ×
              </div>

            </div>

            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
              Payment Failed
            </p>

            <h2 className="mt-2 font-serif text-[32px] font-semibold text-[#4a1712] sm:text-[38px]">
              Payment Unsuccessful
            </h2>

            <p className="mx-auto mt-3 max-w-[430px] text-[10px] leading-5 text-[#806653]">
              We could not confirm your payment.
              Please try again.
            </p>

            <div className="mt-7 rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5 text-left">

              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] text-[#9a806f]">
                  Order ID
                </span>

                <span className="break-all text-right text-[9px] font-semibold text-[#4f3425]">
                  {orderId || "Not Available"}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] text-[#9a806f]">
                  Status
                </span>

                <span className="rounded-full bg-[#fde7e7] px-3 py-1 text-[8px] font-semibold text-[#b83232]">
                  Failed
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-7 h-11 w-full rounded-lg bg-[#8c1d18] text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(140,29,24,0.16)] transition hover:-translate-y-0.5 hover:bg-[#711611]"
            >
              Go to Home
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default PaymentSuccessPage;