const STATS = [
  {
    value: "5,000+",
    label: "Companies launched",
  },
  {
    value: "60+",
    label: "Countries served",
  },
  {
    value: "50",
    label: "U.S. states + DC",
  },
  {
    value: "$120M+",
    label: "Revenue handled",
  },
  {
    value: "4.9★",
    label: "Customer rating",
  },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2d68] via-[#7b1b86] to-[#b0074f] py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-white/70">
            By the numbers
          </span>

          <h2 className="mt-8 max-w-2xl text-balance text-center text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white md:text-6xl">
            Metrics that speak for themselves.
          </h2>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="relative flex min-h-[112px] flex-col items-center justify-center px-4 text-center"
            >
              {index !== 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-20 w-px -translate-y-1/2 bg-white/15 lg:block"
                />
              )}

              <div className="whitespace-nowrap text-4xl font-extrabold leading-none tracking-[-0.045em] text-white md:text-5xl lg:text-[3.25rem]">
                {stat.value}
              </div>

              <div className="mt-5 whitespace-nowrap text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/55 md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}