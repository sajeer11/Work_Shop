import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DarkCTAFooterProps {
  logoSrc: string;
  title: {
    accent: string;
    text: string;
  };
  description: string;
  ctaLabel: string;
  ctaHref: string;
  emailPlaceholder: string;
  footerLinks: string[];
  copyrightText: string;
}

export default function DarkCTAFooter({
  logoSrc,
  title,
  description,
  ctaLabel,
  ctaHref,
  emailPlaceholder,
  footerLinks,
  copyrightText,
}: DarkCTAFooterProps) {
  const footerButtonClassName =
    "inline-flex items-center justify-center rounded-full bg-[#99ED43] px-8 py-3 text-[15px] font-prompt font-normal text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105";
  const socialLinkClassName =
    "inline-flex h-5 min-w-5 items-center justify-center font-prompt text-[15px] font-semibold leading-none text-[#99ED43] transition hover:brightness-125";

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.05),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.16),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-[280px] w-full"
          viewBox="0 0 1440 280"
          fill="none"
          preserveAspectRatio="none"
        >
<path
  d="
    M180 0
    V135
    A88 88 0 0 0 268 223
    H430
  "
  transform="translate(-80, 20)"
  stroke="rgba(155,234,52,0.35)"
  strokeWidth="1.5"
  strokeLinecap="round"
  fill="none"
/>
          <path
            d="
              M1260 0
              V135
              A88 88 0 0 1 1172 223
              H1010
            "
            transform="translate(80, 20)"
            stroke="rgba(155,234,52,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="mx-auto max-w-[760px] pt-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src={logoSrc}
                alt="Brand Republic logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-center font-plus text-[54px] font-medium leading-[1.2] tracking-normal text-white">
            <span className="font-bold italic text-[#9BEA34]">{title.accent}</span>{" "}
            {title.text}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] font-prompt font-normal leading-relaxed text-[#FFFFFF]">
            {description}
          </p>

          <form
            id="dark-footer-form"
            action={ctaHref}
            method="get"
            className="gap-2 mx-auto mt-8 flex w-full max-w-xl flex-col rounded-2xl bg-[#FFFFFF1A] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] lg:flex-row lg:rounded-full"
          >
            <input
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              className="min-w-0 flex-1 rounded-full bg-[#FFFFFF1A] px-5 py-3 text-sm text-white placeholder:text-white/28 outline-none"
              required
            />

            <button type="submit" className={`${footerButtonClassName} w-full lg:w-auto`}>
              {ctaLabel}
            </button>
          </form>
        </div>

        <div className="mt-16 pt-6 text-xs text-white/40">
          <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-white/10" />

          <div className="flex flex-col gap-4 border-t border-white/7 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Facebook" className={socialLinkClassName}>
                  f
                </a>
                <a
                  href="https://www.instagram.com/dabrandrepublic?igsh=MTdyNGZvN3FzM3hsNg=="
                  aria-label="Instagram"
                  className={socialLinkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <rect x="3" y="3" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="11.2" cy="4.8" r="0.8" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/brand-republic-pak/"
                  aria-label="LinkedIn"
                  className={socialLinkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  in
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                {footerLinks.map((link) =>
                  link.toLowerCase().includes("registration") ? (
                    <Link key={link} href="/register" className="transition hover:text-[#99ED43]">
                      {link}
                    </Link>
                  ) : (
                    <span key={link}>{link}</span>
                  ),
                )}
              </div>
            </div>

            <p>{copyrightText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
