export default function ContactWays() {
  return (
    <div className="w-full lg:w-2/5 text-center lg:text-left">
      <h3 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] font-fraunces mb-4">
        Ways to reach us
      </h3>
      <p className="text-[#8A8A85] text-base leading-relaxed mb-10">
        We&apos;re a small team. No ticketing queues, no bots — just real people who care about
        making your events go viral.
      </p>

      {/* Email card */}
      <div className="flex items-center gap-5 bg-[#F4F4F2] border border-[#EAEAE6] rounded-[14px] px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div>
          <p className="text-base font-semibold text-left">Email us</p>
          <p className="text-[#8A8A85] text-sm mt-0.5">hello@badge.build</p>
        </div>
      </div>
    </div>
  );
}