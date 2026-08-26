function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#401711]">

      {/* Header */}
      <section className="bg-[#401711] px-4 py-14 text-center text-white sm:py-18">
        <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
          Shiva Parvati Matrimonial Trust
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
          Refund Policy
        </h1>
      </section>


      {/* Content */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-[950px]">

          <button
            onClick={() => window.history.back()}
            className="mb-8 inline-flex items-center gap-2 rounded-md border border-[#d7a744] px-4 py-2 text-sm text-[#8c1d18] transition hover:bg-[#f5c45e] hover:text-[#401711]"
          >
            ← Back
          </button>


          {/* 1 */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              1. No Refunds for Free Services
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              Our basic matchmaking services are free and non-refundable.
            </p>
          </div>


          {/* 2 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              2. Refund for Premium Services
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                Refunds will be considered only if the service has not
                been utilized within 5 days of payment.
              </li>

              <li>
                Any service fees already incurred are non-refundable.
              </li>
            </ul>
          </div>


          {/* 3 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              3. Cancellation Policy
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              Users can cancel their premium membership anytime, but no
              partial refunds will be issued for unused subscription
              periods.
            </p>
          </div>


          {/* 4 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              4. Refund Process
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                Refund requests must be submitted via email or phone.
              </li>

              <li>
                Approved refunds will be processed within 7-10 business
                days.
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div className="mt-10 rounded-xl border border-[#ead4bd] bg-[#f7eadb] p-6">
            <h2 className="font-serif text-xl font-semibold text-[#401711]">
              Refund Requests
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#60483d]">
              For refund requests, contact us at{" "}
              <a
                href="tel:9448388711"
                className="font-semibold text-[#8c1d18] hover:text-[#a66a25]"
              >
                +91 94483 88711
              </a>
              .
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default RefundPolicyPage;