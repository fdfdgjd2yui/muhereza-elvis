import React from 'react';

interface HeroSectionProps {
  onOpenApply: () => void;
  scrollToSection: (id: string) => void;
  onSelectResultsPortal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApply,
  scrollToSection,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#001f3f] text-foreground">
      {/* Video Background: Fullscreen <video> element with autoPlay, loop, muted, playsInline */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Navigation Bar: relative z-10, flex row, justify-between, px-8 py-6, max-w-7xl mx-auto */}
      <header className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Logo: "Velorah®" (® as <sup className="text-xs">), text-3xl tracking-tight, Instrument Serif font, text-foreground */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-3xl tracking-tight text-foreground cursor-pointer select-none"
        >
          Velorah<sup className="text-xs">®</sup>
        </div>

        {/* Nav links (hidden on mobile, md:flex): Home (active, text-foreground), Studio, About, Journal, Reach Us — all text-sm text-muted-foreground with hover:text-foreground transition-colors */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-foreground transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('programs')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Studio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('why-nexus')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('news')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Journal
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Reach Us
          </button>
        </nav>

        {/* CTA button: "Begin Journey", liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground, hover:scale-[1.03] */}
        <button
          type="button"
          onClick={onOpenApply}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Begin Journey
        </button>
      </header>

      {/* Hero Section: relative z-10, flex column, centered, text-center, px-6 pt-32 pb-40 py-[90px] */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] my-auto max-w-7xl mx-auto w-full">
        {/* H1: "Where dreams rise through the silence." — text-5xl sm:text-7xl md:text-8xl, leading-[0.95], tracking-[-2.46px], max-w-7xl, font-normal, Instrument Serif. The words "dreams" and "through the silence." wrapped in <em className="not-italic text-muted-foreground"> for color contrast */}
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext: text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed — "We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work." */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        {/* CTA button: "Begin Journey", liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12, hover:scale-[1.03] cursor-pointer */}
        <button
          type="button"
          onClick={onOpenApply}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer transition-transform animate-fade-rise-delay-2"
        >
          Begin Journey
        </button>
      </div>

      {/* Subtle bottom spacing */}
      <div className="relative z-10 h-6 pointer-events-none" />
    </section>
  );
};
