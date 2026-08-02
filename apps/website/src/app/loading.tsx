// apps/website/src/app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-navy">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-tech/5 to-transparent pointer-events-none" />

      {/* Logo with gentle pulse */}
      <div className="relative mb-10">
        <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-xl animate-pulse" />
        <Image
          src="/images/logo/logo2.png"
          alt="ForgeTech Nobles"
          width={120}
          height={120}
          className="relative object-contain animate-pulse"
          priority
        />
      </div>

      {/* Animated loading bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-brand-gold via-brand-tech to-brand-gold animate-[shimmer_1.5s_linear_infinite] bg-[length:200%_100%]" />
      </div>

      <p className="mt-6 text-sm font-medium tracking-widest text-white/40 uppercase">
        Loading...
      </p>
    </div>
  );
}