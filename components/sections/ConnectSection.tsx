import Image from "next/image";

export default function ConnectSection() {
  return (
    <section className="container-section w-full py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-4 text-center shadow-md shadow-primary/20 backdrop-blur-md transition-all duration-500 animate-fadeUp sm:p-6">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-70" />

          <div className="connect-hand-float mb-3 flex justify-center">
            <Image
              src="/images/hand.png"
              alt="Collaboration hand illustration"
              width={85}
              height={142}
              className="h-auto w-[85px] object-contain"
            />
          </div>

          <h2 className="text-[13px] font-bold leading-snug text-foreground md:text-[15px]">
            Let&apos;s build something together
          </h2>

          <p className="mx-auto mt-1 max-w-3xl text-[11px] font-medium leading-relaxed text-muted-foreground md:text-[12px]">
            I&apos;m ready to collaborate on MERN and Next.js applications,
            backend APIs, dashboards, AI and third-party integrations, or
            modern web projects, with supporting Angular/MEAN and cloud data
            engineering experience where relevant.
          </p>
        </div>
      </div>
    </section>
  );
}
