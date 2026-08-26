function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#401711]">

      {/* Header */}
      <section className="bg-[#401711] px-4 py-14 text-center text-white sm:py-18">
        <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
          Shiva Parvati Matrimonial Trust
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
          Terms &amp; Conditions
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
              1. Acceptance of Terms
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              By using Shiva Parvati Matrimonial Trust services, you
              agree to abide by these terms.
            </p>
          </div>


          {/* 2 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              2. Eligibility
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              Users must be 18 years or older to register. The provided
              information must be accurate and truthful.
            </p>
          </div>


          {/* 3 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              3. Account Security
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              Users are responsible for maintaining account
              confidentiality. Unauthorized access or misuse of accounts
              is prohibited.
            </p>
          </div>


          {/* 4 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              4. Code of Conduct
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              Users must respect the privacy of others. Harassment,
              abusive behavior, or fraudulent activity will lead to
              account termination.
            </p>
          </div>


          {/* 5 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              5. Service Availability
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              We strive to provide uninterrupted services but do not
              guarantee 100% uptime.
            </p>
          </div>


          {/* 6 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              6. Limitation of Liability
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              We are not responsible for any financial, emotional, or
              legal consequences resulting from matches made through our
              platform.
            </p>
          </div>


          {/* 7 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              7. Modification of Terms
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              We reserve the right to modify these terms at any time.
            </p>
          </div>


          {/* Contact */}
          <div className="mt-10 rounded-xl border border-[#ead4bd] bg-[#f7eadb] p-6">
            <h2 className="font-serif text-xl font-semibold text-[#401711]">
              Contact Us
            </h2>

            <p className="mt-3 text-sm text-[#60483d]">
              For concerns, contact us at{" "}
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

export default TermsPage;