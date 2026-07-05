const Preloader = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 flex select-none items-center justify-center bg-background"
    >
      <div className="relative space-y-6 text-center">
        {/* Glow background */}
        <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-60 blur-3xl animate-pulse motion-reduce:animate-none" />

        {/* Name */}
        <h1 className="relative text-3xl font-black text-gradient sm:text-4xl">
          Muhammad Ali Nawaz
        </h1>

        {/* Role */}
        <p className="relative tracking-wide text-muted-foreground">
          MERN Stack Developer · Next.js Developer · MEAN Stack Developer
        </p>

        {/* Loader */}
        <div className="relative mx-auto h-1 w-48 overflow-hidden rounded-full bg-border">
          <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-primary animate-[loading_1.2s_infinite] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
