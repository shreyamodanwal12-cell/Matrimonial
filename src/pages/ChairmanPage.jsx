import { useEffect, useRef } from "react";

import chairman1 from "../assets/chairman1.jpeg";
import chairman2 from "../assets/chairman2.jpeg";
import chairman3 from "../assets/chairman3.jpeg";


// =====================================================
// SCROLL REVEAL COMPONENT
// =====================================================

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.transitionDelay = `${delay}ms`;
          element.classList.add("chairman-reveal-show");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`chairman-reveal ${className}`}
    >
      {children}
    </div>
  );
}


// =====================================================
// MAIN PAGE
// =====================================================

function ChairmanPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf4] text-[#401711]">

      {/* =================================================
          CUSTOM ANIMATION CSS
      ================================================= */}

      <style>{`
        .chairman-reveal {
          opacity: 0;
          transform: translateY(45px) scale(0.97);
          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .chairman-reveal-show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .chairman-float {
          animation: chairmanFloat 5s ease-in-out infinite;
        }

        @keyframes chairmanFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        .chairman-glow {
          animation: chairmanGlow 3s ease-in-out infinite;
        }

        @keyframes chairmanGlow {
          0%, 100% {
            box-shadow:
              0 15px 45px rgba(140, 29, 24, 0.15);
          }

          50% {
            box-shadow:
              0 20px 55px rgba(140, 29, 24, 0.25);
          }
        }

        .gold-line {
          position: relative;
        }

        .gold-line::after {
          content: "";
          display: block;
          width: 70px;
          height: 2px;
          margin-top: 14px;
          background: #d7a744;
        }

        .gold-line-center::after {
          margin-left: auto;
          margin-right: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .chairman-reveal,
          .chairman-float,
          .chairman-glow {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#401711] px-4 pb-16 pt-7 text-[#f8e8d5] sm:pb-24 sm:pt-9">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d7a744]/20" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full border border-[#d7a744]/10" />


        {/* Back */}

        <div className="relative z-10 mx-auto max-w-[1180px]">

          <button
            onClick={() => window.history.back()}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#d7a744]/60 px-5 py-2.5 text-xs font-medium text-[#f5c45e] transition duration-300 hover:bg-[#f5c45e] hover:text-[#401711]"
          >
            ← Back
          </button>


          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">

            {/* HERO TEXT */}

            <Reveal>

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <span className="h-px w-10 bg-[#d7a744]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
                    About Our Chairman
                  </p>

                </div>


                <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  Shri Chandrashekhar
                  <span className="mt-2 block text-[#f5c45e]">
                    Kakkeri
                  </span>
                </h1>


                <p className="mt-7 max-w-[600px] text-sm leading-7 text-[#d8bfae] sm:text-[15px]">
                  A dedicated engineer, social worker and community
                  leader committed to education, social service and
                  meaningful matrimonial initiatives.
                </p>


                {/* Small highlights */}

                <div className="mt-8 flex flex-wrap gap-3">

                  <span className="rounded-full border border-[#d7a744]/40 bg-white/5 px-4 py-2 text-[10px] text-[#f8e8d5]">
                    Engineering Professional
                  </span>

                  <span className="rounded-full border border-[#d7a744]/40 bg-white/5 px-4 py-2 text-[10px] text-[#f8e8d5]">
                    Social Leader
                  </span>

                  <span className="rounded-full border border-[#d7a744]/40 bg-white/5 px-4 py-2 text-[10px] text-[#f8e8d5]">
                    Community Service
                  </span>

                </div>

              </div>

            </Reveal>


            {/* HERO IMAGE COLLAGE */}

            <Reveal delay={150}>

              <div className="relative mx-auto h-[430px] w-full max-w-[470px] sm:h-[500px]">

                {/* Gold glow */}

                <div className="absolute right-3 top-4 h-[82%] w-[75%] rounded-[35px] border border-[#d7a744]/30" />


                {/* Main image */}

                <div className="chairman-glow absolute left-1/2 top-4 h-[390px] w-[270px] -translate-x-1/2 overflow-hidden rounded-[30px] border-[5px] border-[#d7a744] bg-[#8c1d18] shadow-2xl sm:h-[450px] sm:w-[310px]">

                  <img
                    src={chairman1}
                    alt="Shri Chandrashekhar Kakkeri"
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* Small image 2 */}

                <div className="chairman-float absolute bottom-2 left-0 h-[145px] w-[125px] overflow-hidden rounded-2xl border-4 border-[#f5c45e] bg-white shadow-xl sm:h-[165px] sm:w-[145px]">

                  <img
                    src={chairman2}
                    alt="Chairman"
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* Small image 3 */}

                <div
                  className="chairman-float absolute right-0 top-24 h-[145px] w-[125px] overflow-hidden rounded-2xl border-4 border-[#f5c45e] bg-white shadow-xl sm:h-[165px] sm:w-[145px]"
                  style={{ animationDelay: "1.2s" }}
                >

                  <img
                    src={chairman3}
                    alt="Chairman"
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* OM badge */}

                <div className="absolute bottom-7 right-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-2xl text-[#f5c45e] shadow-lg sm:right-12">
                  ॐ
                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section className="px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[1000px]">

          <Reveal>

            <div className="text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a66a25]">
                A Journey of Service
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#401711] sm:text-4xl">
                Dedicated to Service & Community
              </h2>

              <div className="mx-auto mt-4 h-[2px] w-14 bg-[#d7a744]" />

            </div>

          </Reveal>


          <div className="mt-10 space-y-6">

            <Reveal delay={100}>
              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                Like the saying of Jainism,{" "}
                <span className="font-serif font-semibold text-[#751b17]">
                  "Damo nāsti dayāparaḥ"
                </span>
                , meaning "There is no religion higher than kindness,"
                Shri Chandrashekhar Kakkeri has dedicated his life to
                serving society with sincerity, compassion and
                responsibility.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                During his student days, he was elected to the student
                union and demonstrated strong organizational skills and
                leadership by helping solve educational problems faced
                by students. His early efforts reflected the commitment
                to social service that continued throughout his life.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                His journey has been guided by the principle of{" "}
                <span className="font-serif font-semibold text-[#751b17]">
                  "Satya Shuddha Kayaka"
                </span>{" "}
                — truthful and pure work — and the belief that sincere
                duty and responsibility should always be upheld.
              </p>
            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          PROFESSIONAL CAREER
      ================================================= */}

      <section className="bg-[#f7eadb] px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[1000px]">

          <Reveal>

            <p className="gold-line text-[10px] font-semibold uppercase tracking-[3px] text-[#a66a25]">
              Professional Career
            </p>

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#401711] sm:text-4xl">
              A Distinguished Engineering Career
            </h2>

          </Reveal>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <Reveal delay={100}>

              <CareerCard
                number="01"
                title="Engineering Graduate"
                text="An engineering graduate who began his professional journey with a strong foundation in technical education."
              />

            </Reveal>


            <Reveal delay={180}>

              <CareerCard
                number="02"
                title="Government Service"
                text="Joined Government Service as an Engineer in 1984 and served across important public departments."
              />

            </Reveal>


            <Reveal delay={260}>

              <CareerCard
                number="03"
                title="Public Administration"
                text="Served in irrigation departments, PWD and later contributed as an efficient authority in the Zilla Parishads."
              />

            </Reveal>

          </div>


          <Reveal delay={320}>

            <div className="mt-8 rounded-2xl border border-[#ead4bd] bg-white p-6 shadow-[0_10px_30px_rgba(73,38,20,0.06)] sm:p-8">

              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                He retired from Government Service in{" "}
                <strong className="text-[#751b17]">
                  2018
                </strong>
                , but retirement did not mark the end of his commitment
                to learning and social service.
              </p>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          SOCIAL RESPONSIBILITY
      ================================================= */}

      <section className="px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[1050px]">

          <Reveal>

            <div className="text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a66a25]">
                Social Responsibility
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#401711] sm:text-4xl">
                Leadership Beyond Profession
              </h2>

              <p className="mx-auto mt-5 max-w-[780px] text-sm leading-7 text-[#60483d]">
                With a strong desire to contribute to society, Shri
                Chandrashekhar Kakkeri has taken responsibility in
                several professional and social organizations.
              </p>

            </div>

          </Reveal>


          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            <Reveal delay={100}>
              <OrganizationCard
                title="Institute of Engineers (India)"
                text="Served as a Member and Honorary President of the local branch."
                icon="⚙"
              />
            </Reveal>

            <Reveal delay={180}>
              <OrganizationCard
                title="Public Welfare Committee"
                text="Served as Vice President and contributed towards public welfare initiatives."
                icon="🤝"
              />
            </Reveal>

            <Reveal delay={260}>
              <OrganizationCard
                title="Retired Engineers' Welfare Association"
                text="Actively participated in initiatives supporting retired engineering professionals."
                icon="🏛"
              />
            </Reveal>

            <Reveal delay={340}>
              <OrganizationCard
                title="Karnataka Graduate Engineers' Association"
                text="Served as Vice President and remained actively involved in professional activities."
                icon="🎓"
              />
            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          LAW & LEARNING
      ================================================= */}

      <section className="relative overflow-hidden bg-[#401711] px-4 py-16 text-[#f8e8d5] sm:py-24">

        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full border border-[#d7a744]/20" />

        <div className="relative mx-auto max-w-[900px] text-center">

          <Reveal>

            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
              Lifelong Learning
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Learning Has No Age
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-14 bg-[#d7a744]" />

          </Reveal>


          <Reveal delay={150}>

            <div className="mt-9 rounded-2xl border border-[#d7a744]/30 bg-white/5 p-7 backdrop-blur-sm sm:p-10">

              <div className="mb-5 text-4xl text-[#f5c45e]">
                ✦
              </div>

              <p className="text-sm leading-8 text-[#d8bfae] sm:text-[15px]">
                Even at the age of 60, during the challenging period of
                the COVID crisis, Shri Chandrashekhar Kakkeri completed
                a law degree. His decision was not driven by financial
                gain, but by the vision that legal knowledge would allow
                him to serve society more effectively.
              </p>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          MATRIMONIAL SERVICE
      ================================================= */}

      <section className="px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[1000px]">

          <Reveal>

            <p className="gold-line text-[10px] font-semibold uppercase tracking-[3px] text-[#a66a25]">
              Matrimonial Service
            </p>

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#401711] sm:text-4xl">
              Supporting Meaningful Connections
            </h2>

          </Reveal>


          <div className="mt-10 space-y-6">

            <Reveal delay={100}>
              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                Understanding the importance of noble social activities
                and community welfare, Shri Chandrashekhar Kakkeri played
                a significant role in the Veerashaiva Bride and Groom
                Convention.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                He contributed by collecting details of brides and grooms
                from different parts of the state and organizing the
                information according to educational qualifications.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="rounded-2xl border-l-4 border-[#d7a744] bg-[#fff8ed] p-6 shadow-sm sm:p-8">

                <p className="text-sm leading-8 text-[#60483d] sm:text-[15px]">
                  This effort resulted in a comprehensive{" "}
                  <strong className="text-[#751b17]">
                    "Bride and Groom Information"
                  </strong>{" "}
                  directory, helping families access organized
                  matrimonial information and making the process of
                  finding suitable matches more meaningful and
                  accessible.
                </p>

              </div>
            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          FAMILY & SUPPORT + IMAGES
      ================================================= */}

      <section className="bg-[#f7eadb] px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[1050px]">

          <Reveal>

            <div className="text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a66a25]">
                Family & Support
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#401711] sm:text-4xl">
                A Partnership in Service
              </h2>

            </div>

          </Reveal>


          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_1fr]">

            <Reveal>

              <div className="space-y-5 text-sm leading-8 text-[#60483d] sm:text-[15px]">

                <p>
                  Behind Shri Chandrashekhar Kakkeri&apos;s achievements
                  stands the constant support and inspiration of his
                  devoted wife, Smt. Basavarajeshwari Chandrashekhar
                  Kakkeri.
                </p>

                <p>
                  Her encouragement and support have played an important
                  role in his philanthropic and social activities.
                </p>


                <div className="mt-6 rounded-xl border border-[#ead4bd] bg-white p-5 shadow-sm">

                  <p className="font-serif text-lg font-semibold text-[#751b17]">
                    Together in Service
                  </p>

                  <p className="mt-1 text-xs leading-6 text-[#806653]">
                    A journey strengthened by family, values and
                    commitment to society.
                  </p>

                </div>

              </div>

            </Reveal>


            {/* FAMILY IMAGE */}

            <Reveal delay={150}>

              <div className="relative mx-auto max-w-[450px]">

                <div className="absolute -inset-3 rounded-[28px] border border-[#d7a744]/50" />

                <div className="relative overflow-hidden rounded-[25px] border-4 border-[#d7a744] bg-white shadow-[0_15px_40px_rgba(73,38,20,0.12)]">

                  <img
                    src={chairman3}
                    alt="Shri Chandrashekhar Kakkeri and family"
                    className="h-[330px] w-full object-cover sm:h-[390px]"
                  />

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          MESSAGE
      ================================================= */}

      <section className="px-4 py-16 sm:py-24">

        <div className="mx-auto max-w-[900px] text-center">

          <Reveal>

            <div className="text-5xl leading-none text-[#d7a744]">
              ❝
            </div>

            <p className="mt-4 font-serif text-xl leading-9 text-[#401711] sm:text-3xl sm:leading-10">
              Compassion, sincere work and dedication to society can
              create a lasting impact on the lives of others.
            </p>

          </Reveal>


          <Reveal delay={180}>

            <div className="mt-9">

              <div className="mx-auto mb-4 h-px w-16 bg-[#d7a744]" />

              <p className="text-sm font-semibold text-[#401711]">
                – Prof. Venkanna Donne Gowda
              </p>

              <p className="mt-1 text-xs text-[#80665a]">
                Retired Kannada Professor
              </p>

              <p className="text-xs text-[#80665a]">
                Sharanbasaveshwara Kalama Vidyalaya, Kalaburagi
              </p>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="relative overflow-hidden bg-[#8c1d18] px-4 py-14 text-center text-white sm:py-16">

        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full border border-[#f5c45e]/20" />

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full border border-[#f5c45e]/20" />


        <Reveal>

          <div className="relative">

            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
              Shiva Parvati Matrimonial
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
              Begin Your Journey With Us
            </h2>

            <p className="mx-auto mt-3 max-w-[600px] text-sm leading-6 text-[#f8e8d5]">
              Discover meaningful connections through Shiva Parvati
              Matrimonial.
            </p>

            <a
              href="/register"
              className="mt-7 inline-flex rounded-full bg-[#f2c15b] px-7 py-3 text-sm font-semibold text-[#4a1b12] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#ffd477]"
            >
              Register Free →
            </a>

          </div>

        </Reveal>

      </section>

    </div>
  );
}


// =====================================================
// CAREER CARD
// =====================================================

function CareerCard({ number, title, text }) {
  return (
    <div className="group h-full rounded-2xl border border-[#ead4bd] bg-white p-6 shadow-[0_6px_22px_rgba(73,38,20,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(73,38,20,0.10)]">

      <div className="flex items-center justify-between">

        <span className="font-serif text-3xl font-semibold text-[#d7a744]">
          {number}
        </span>

        <span className="h-2 w-2 rounded-full bg-[#8c1d18] transition duration-300 group-hover:scale-150" />

      </div>

      <h3 className="mt-6 font-serif text-xl font-semibold text-[#401711]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#60483d]">
        {text}
      </p>

    </div>
  );
}


// =====================================================
// ORGANIZATION CARD
// =====================================================

function OrganizationCard({ title, text, icon }) {
  return (
    <div className="group rounded-2xl border border-[#ead4bd] bg-white p-6 shadow-[0_6px_22px_rgba(73,38,20,0.05)] transition duration-300 hover:-translate-y-2 hover:border-[#d7a744] hover:shadow-[0_15px_35px_rgba(73,38,20,0.10)]">

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3dc] text-xl transition duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold text-[#401711]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#60483d]">
        {text}
      </p>

    </div>
  );
}


export default ChairmanPage;