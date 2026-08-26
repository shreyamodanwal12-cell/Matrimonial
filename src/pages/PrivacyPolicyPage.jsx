function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#401711]">

      {/* Header */}
      <section className="bg-[#401711] px-4 py-14 text-center text-white sm:py-18">
        <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
          Shiva Parvati Matrimonial Trust
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-[#d8bfae]">
          Effective Date: 08-02-2025
        </p>
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

          <p className="text-sm leading-7 text-[#60483d] sm:text-[15px]">
            Shiva Parvati Matrimonial Trust, Kalaburagi, Karnataka
            ("we," "our," or "us") is committed to protecting the privacy
            of our users. This Privacy Policy outlines how we collect,
            use, and protect your personal information when you use our
            matrimonial services.
          </p>


          {/* 1 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              1. Information We Collect
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                Personal details such as name, age, gender, contact
                number, email, address, and photographs.
              </li>
              <li>
                Demographic information including religion, caste,
                education, and professional details.
              </li>
              <li>
                Payment information for premium services.
              </li>
              <li>
                Browsing history, IP address, and device information.
              </li>
            </ul>
          </div>


          {/* 2 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              2. How We Use Your Information
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                To create and manage user profiles for matchmaking.
              </li>
              <li>
                To facilitate communication between registered members.
              </li>
              <li>
                To improve our services and user experience.
              </li>
              <li>
                To comply with legal and regulatory requirements.
              </li>
            </ul>
          </div>


          {/* 3 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              3. Data Security
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              We implement appropriate security measures to protect your
              personal data. However, we cannot guarantee absolute
              security due to inherent risks associated with online
              platforms.
            </p>
          </div>


          {/* 4 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              4. Data Sharing &amp; Disclosure
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                We do not sell or share your personal data with third
                parties without consent.
              </li>
              <li>
                Information may be disclosed in case of legal
                obligations or fraud prevention.
              </li>
            </ul>
          </div>


          {/* 5 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              5. User Rights
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              <li>
                You can update or delete your profile anytime.
              </li>
              <li>
                You may request access to your personal data.
              </li>
            </ul>
          </div>


          {/* 6 */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-[#401711]">
              6. Changes to Privacy Policy
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#60483d] sm:text-[15px]">
              We may update this policy periodically. Continued use of
              our services constitutes acceptance of the updated policy.
            </p>
          </div>


          {/* Contact */}
          <div className="mt-10 rounded-xl border border-[#ead4bd] bg-[#f7eadb] p-6">
            <h2 className="font-serif text-xl font-semibold text-[#401711]">
              Contact Us
            </h2>

            <p className="mt-3 text-sm text-[#60483d]">
              For queries, contact us at{" "}
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

export default PrivacyPolicyPage;