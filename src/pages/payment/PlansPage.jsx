import { useState } from "react";

function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

 const plans = [
  {
    id: "basic",
    name: "Basic",
    duration: "1 Month",
    price: "499",
    profileLimit: 10,
    profileText: "View up to 10 profiles",
    description: "A simple start to your matrimonial journey.",
    features: [
      "Create matrimonial profile",
      "View up to 10 member profiles",
      "Send interest requests",
      "Basic profile visibility",
    ],
  },

  {
    id: "premium",
    name: "Premium",
    duration: "3 Months",
    price: "999",
    profileLimit: 50,
    profileText: "View up to 50 profiles",
    popular: true,
    description: "More visibility and better opportunities to connect.",
    features: [
      "Everything in Basic",
      "View up to 50 member profiles",
      "Priority profile visibility",
      "Direct contact access",
      "Premium support",
    ],
  },

  {
    id: "royal",
    name: "Royal",
    duration: "6 Months",
    price: "1,499",
    profileLimit: Infinity,
    profileText: "View unlimited profiles",
    description: "Our complete plan for a serious matrimonial journey.",
    features: [
      "Everything in Premium",
      "View unlimited member profiles",
      "Maximum profile visibility",
      "Priority connection requests",
      "Dedicated support",
      "Royal member badge",
    ],
  },
];

  const selected = plans.find((plan) => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      {/* ================= HEADER ================= */}
      <header className="border-b border-[#eadfce] bg-white">

        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">

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


      {/* ================= HERO ================= */}
      <section className="px-5 pb-8 pt-12 text-center">

        <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
          Premium Membership
        </p>

        <h2 className="mt-3 font-serif text-[32px] font-semibold text-[#4a1712] sm:text-[40px]">
          Choose Your Matrimonial Plan
        </h2>

        <p className="mx-auto mt-3 max-w-[560px] text-[11px] leading-6 text-[#806653]">
          Take the next step towards finding your life partner with a plan
          designed for your matrimonial journey.
        </p>

      </section>


      {/* ================= PLANS ================= */}
      <main className="mx-auto max-w-[1150px] px-5 pb-12">

        <div className="grid gap-5 lg:grid-cols-3">

          {plans.map((plan) => {

            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`
                  relative rounded-2xl border bg-white p-6 transition duration-300
                  ${
                    isSelected
                      ? "border-[#c58a25] shadow-[0_12px_35px_rgba(140,29,24,0.12)]"
                      : "border-[#eadfce] shadow-[0_5px_20px_rgba(73,38,20,0.05)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(73,38,20,0.08)]"
                  }
                `}
              >

                {/* Popular */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8c1d18] px-4 py-1.5 text-[8px] font-semibold uppercase tracking-[1px] text-white">
                    Most Popular
                  </div>
                )}


                {/* Plan Header */}
                <div className="text-center">

                  <p className="text-[9px] font-semibold uppercase tracking-[2px] text-[#a67c35]">
                    {plan.duration}
                  </p>

                  <h3 className="mt-2 font-serif text-[27px] font-semibold text-[#4a1712]">
                    {plan.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-center gap-1">

                    <span className="text-[18px] font-medium text-[#806653]">
                      ₹
                    </span>

                    <span className="font-serif text-[38px] font-semibold leading-none text-[#8c1d18]">
                      {plan.price}
                    </span>

                  </div>

                  <p className="mt-2 text-[9px] text-[#9a806f]">
                    One-time payment
                  </p>

                </div>


                {/* Description */}
                <div className="my-6 border-y border-[#eee4d8] py-5">

                  <p className="text-center text-[10px] leading-5 text-[#806653]">
                    {plan.description}
                  </p>

                </div>
{/* PROFILE LIMIT */}
<div className="mb-5 rounded-lg bg-[#fff7e8] px-4 py-3 text-center">
  <p className="text-[8px] font-semibold uppercase tracking-[1.5px] text-[#a67c35]">
    Profile Access
  </p>

  <p className="mt-1 font-serif text-[17px] font-semibold text-[#8c1d18]">
    {plan.profileText}
  </p>
</div>

                {/* Features */}
                <div className="space-y-3">

                  {plan.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-start gap-2"
                    >

                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f7e8c9] text-[8px] font-bold text-[#8c1d18]">
                        ✓
                      </span>

                      <span className="text-[9px] leading-4 text-[#604738]">
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>


                {/* Select */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`
                    mt-7 h-11 w-full rounded-lg text-[10px] font-semibold transition
                    ${
                      isSelected
                        ? "bg-[#8c1d18] text-white shadow-[0_6px_18px_rgba(140,29,24,0.18)]"
                        : "border border-[#d7a744] text-[#8c1d18] hover:bg-[#fff3dc]"
                    }
                  `}
                >
                  {isSelected ? "✓ Selected Plan" : "Choose Plan"}
                </button>

              </div>
            );
          })}

        </div>


        {/* ================= PAYMENT SUMMARY ================= */}
        <section className="mx-auto mt-8 max-w-[700px] rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_5px_20px_rgba(73,38,20,0.05)] sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-[8px] font-semibold uppercase tracking-[2px] text-[#a67c35]">
                Selected Plan
              </p>

              <h3 className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                {selected.name} Plan
              </h3>

              <p className="mt-1 text-[9px] text-[#9a806f]">
                {selected.duration} • One-time payment
              </p>

            </div>


            <div className="text-left sm:text-right">

              <p className="text-[8px] uppercase tracking-[1px] text-[#9a806f]">
                Total Amount
              </p>

              <p className="mt-1 font-serif text-[28px] font-semibold text-[#8c1d18]">
                ₹{selected.price}
              </p>

            </div>

          </div>


          {/* Pay Now */}
          <button
  type="button"
  onClick={() => {
    localStorage.setItem(
      "selectedPlan",
     JSON.stringify({
  id: selected.id,
  name: selected.name,
  duration: selected.duration,
  price: selected.price,
  profileLimit: selected.profileLimit,
  profileText: selected.profileText,
})
    );

    window.location.href = "/payment";
  }}
  className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-[#d92c2c] text-[11px] font-semibold text-white shadow-[0_7px_18px_rgba(217,44,44,0.18)] transition hover:-translate-y-0.5 hover:bg-[#bd2020]"
>
  Continue to Payment →
</button>

          <p className="mt-3 text-center text-[8px] text-[#a28c7c]">
            🔒 Secure payment • Your information is protected
          </p>

        </section>


        {/* ================= TRUST ================= */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[8px] text-[#9a806f]">

          <span>✓ Secure Payment</span>
          <span>✓ Trusted Matrimonial Platform</span>
          <span>✓ Customer Support</span>

        </div>

      </main>

    </div>
  );
}

export default PlansPage;