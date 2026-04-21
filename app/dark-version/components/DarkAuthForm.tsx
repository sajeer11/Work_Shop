"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import darkPageJson from "../../_data/dark-page.json";
import type { DarkPageContent } from "../../_data/page-content.types";

interface DarkAuthField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel";
  placeholder: string;
}

interface DarkAuthFormProps {
  badge: string;
  title: string;
  description: string;
  submitLabel: string;
  formAction: string;
  alternatePrompt?: string;
  alternateLabel?: string;
  alternateHref?: string;
  fields: DarkAuthField[];
}

const darkPageData = darkPageJson as DarkPageContent;

export default function DarkAuthForm({
  badge,
  title,
  description,
  submitLabel,
  formAction,
  alternatePrompt,
  alternateLabel,
  alternateHref,
  fields,
}: DarkAuthFormProps) {
  const hasAlternateAction = Boolean(alternatePrompt && alternateLabel && alternateHref);
  const { hero } = darkPageData;
  const searchParams = useSearchParams();
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setVisiblePasswords((current) => ({
      ...current,
      [fieldName]: !current[fieldName],
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#121212] px-4 py-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(155,234,52,0.045),transparent_20%),radial-gradient(circle_at_82%_80%,rgba(104,90,205,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),transparent_35%,transparent_70%,rgba(255,255,255,0.008))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col">
        <header className="flex items-center gap-4">
        
         

          <a
            href="/dark-version"
            className="ml-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-[#99ED43]/35 hover:text-white"
          >
            Back To The Site
          </a>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center py-8 sm:py-12 lg:py-14">
          <section className="relative grid w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(29,29,29,0.98),rgba(21,21,21,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[0.9fr_1.1fr] lg:rounded-[32px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.022),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-white/8" />

            <div className="relative min-h-[260px] overflow-hidden border-b border-white/6 p-5 sm:p-6 md:min-h-[320px] lg:min-h-[580px] lg:border-b-0 lg:border-r lg:border-white/6 lg:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#2d3e18_0%,#1e2615_34%,#141414_100%)]" />
              <div className="absolute inset-4 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.045),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.14))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center">
                  <div className="relative h-10 w-28 opacity-95 sm:h-11 sm:w-32 ml-2 mt-2">
                    <Image
                      src="/Vector.svg"
                      alt="Brand Republic logo"
                      fill
                      sizes="128px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-1 flex-col justify-center md:mt-10 ml-2 mb-2">
                  <div className="max-w-[340px]">
                    <span className="inline-flex rounded-full border border-[#99ED43]/25 bg-[#99ED43]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c8f58a]">
                      {hero.badge}
                    </span>
                    <div className="mt-5">
                      <p className="text-[clamp(1.6rem,4vw,2.8rem)] font-prompt leading-[0.96] tracking-tight text-white">
                        <span className="text-[#99ED43]">{hero.headline.top}</span>
                        <br />
                        {hero.headline.bottom}
                      </p>
                    </div>
                    <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-white/68 sm:mt-5">
                      {hero.description}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>

            <div className="relative p-5 sm:p-7 lg:p-9">
              <div className="mx-auto w-full max-w-[390px] md:max-w-full lg:max-w-[390px]">
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full border border-[#9BEA34]/20 bg-[#22261d] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#a7e64b]">
                    {badge}
                  </span>

                  <h1 className="mt-4 text-[clamp(1.7rem,4vw,2.6rem)] font-prompt leading-[1] tracking-tight text-white">
                    {title}
                  </h1>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/62">
                    {description}
                  </p>
                </div>

                <form action={formAction} method="get" className="space-y-4">
                  {fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/66">
                        {field.label}
                      </span>
                      <div className="relative">
                        <input
                          name={field.name}
                          type={
                            field.type === "password" && visiblePasswords[field.name]
                              ? "text"
                              : field.type
                          }
                          placeholder={field.placeholder}
                          autoComplete={field.name}
                          defaultValue={field.name === "email" ? searchParams.get("email") ?? "" : ""}
                          className="w-full rounded-[14px] border border-white/8 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/22 focus:border-[#99ED43]/40 focus:bg-white/[0.06] sm:py-3.5"
                          required
                        />
                        {field.type === "password" ? (
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(field.name)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.12em] text-white/42 transition hover:text-white/72"
                          >
                            {visiblePasswords[field.name] ? "Hide" : "Show"}
                          </button>
                        ) : null}
                      </div>
                    </label>
                  ))}

                  <label className="flex items-start gap-3 rounded-[14px] border border-white/6 bg-white/[0.02] px-4 py-3 text-xs text-white/52">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-[#99ED43]"
                      required
                    />
                    <span>
                      I agree to the <span className="text-white/74">terms & conditions</span>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#99ED43] px-8 py-3.5 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105"
                  >
                    {submitLabel}
                  </button>
                </form>

                {hasAlternateAction ? (
                  <p className="mt-5 text-center text-sm leading-relaxed text-white/58">
                    {alternatePrompt}{" "}
                    <a
                      href={alternateHref}
                      className="font-medium text-[#99ED43] transition hover:underline"
                    >
                      {alternateLabel}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
