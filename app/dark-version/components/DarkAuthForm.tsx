"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import darkPageJson from "../../_data/dark-page.json";
import type { AuthPageContent, DarkPageContent } from "../../_data/page-content.types";

type StepKey = "basic" | "questionnaire" | "payment" | "complete";

type BasicFormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  currentStatus: string;
};

type QuestionnaireState = {
  reason: string;
  exploredField: "" | "yes" | "no";
  previousExperience: string;
};

type PaymentState = {
  paymentMethod: string;
  paymentProofName: string;
  paymentProofFile: File | null;
};

type FormState = BasicFormState & QuestionnaireState & PaymentState;

type TouchedState = Record<string, boolean>;

type PersistedFormState = Omit<FormState, "paymentProofFile"> & {
  currentStep: Exclude<StepKey, "complete">;
};

const darkPageData = darkPageJson as DarkPageContent;
const registerStorageKey = "dark-auth-form-state";

const stepOrder: StepKey[] = ["basic", "questionnaire", "payment", "complete"];

const progressSteps = [
  { key: "basic" as const, label: "Basic Information" },
  { key: "questionnaire" as const, label: "Questionnaire" },
  { key: "payment" as const, label: "Payment" },
];

const initialTouchedState: TouchedState = {
  fullName: false,
  email: false,
  contactNumber: false,
  currentStatus: false,
  reason: false,
  exploredField: false,
  paymentMethod: false,
  paymentProofFile: false,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhoneNumber(value: string) {
  return /^\d{11}$/.test(value);
}

function getStepIndex(step: StepKey) {
  return stepOrder.indexOf(step);
}

function getFieldError(field: keyof FormState, values: FormState) {
  switch (field) {
    case "fullName":
      return values.fullName.trim() ? "" : "Full name is required.";
    case "email":
      if (!values.email.trim()) return "Email address is required.";
      return isValidEmail(values.email) ? "" : "Enter a valid email address.";
    case "contactNumber":
      if (!values.contactNumber.trim()) return "Contact number is required.";
      return isValidPhoneNumber(values.contactNumber)
        ? ""
        : "Enter a valid 11-digit phone number.";
    case "currentStatus":
      return values.currentStatus.trim() ? "" : "Please select your current status.";
    case "reason":
      return values.reason.trim() ? "" : "Tell us why you want to attend.";
    case "exploredField":
      return values.exploredField ? "" : "Please choose Yes or No.";
    case "paymentMethod":
      return values.paymentMethod ? "" : "Please select a payment method.";
    case "paymentProofFile":
      return values.paymentProofFile ? "" : "Upload your payment proof to continue.";
    default:
      return "";
  }
}

function getStepFields(step: StepKey): Array<keyof FormState> {
  switch (step) {
    case "basic":
      return ["fullName", "email", "contactNumber", "currentStatus"];
    case "questionnaire":
      return ["reason", "exploredField"];
    case "payment":
      return [];
    default:
      return [];
  }
}

function isStepValid(step: StepKey, values: FormState) {
  return getStepFields(step).every((field) => !getFieldError(field, values));
}

function progressStepStatus(currentStep: StepKey, step: (typeof progressSteps)[number]["key"]) {
  const currentIndex = getStepIndex(currentStep);
  const stepIndex = getStepIndex(step);

  if (currentStep === "complete") {
    return "complete";
  }

  if (stepIndex < currentIndex) {
    return "complete";
  }

  if (stepIndex === currentIndex) {
    return "current";
  }

  return "upcoming";
}

export default function DarkAuthForm({
  title,
  description,
  submitLabel,
  fields,
  cancelLabel,
  reserveLabel,
  questionnaire,
  payment,
  complete,
}: AuthPageContent) {
  const { ctaFooter } = darkPageData;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepKey>("basic");
  const [hasRestoredState, setHasRestoredState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [touched, setTouched] = useState<TouchedState>(initialTouchedState);
  const [values, setValues] = useState<FormState>(() => ({
    fullName: "",
    email: "",
    contactNumber: "",
    currentStatus: "",
    reason: "",
    exploredField: "",
    previousExperience: "",
    paymentMethod: "",
    paymentProofName: "",
    paymentProofFile: null,
  }));

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const emailFromSearch = new URLSearchParams(window.location.search).get("email") ?? "";
      const savedState = window.localStorage.getItem(registerStorageKey);

      if (!savedState) {
        setValues((current) => ({
          ...current,
          email: current.email || emailFromSearch,
        }));
        setHasRestoredState(true);
        return;
      }

      try {
        const parsedState = JSON.parse(savedState) as PersistedFormState;

        setCurrentStep(parsedState.currentStep);
        setValues({
          fullName: parsedState.fullName,
          email: parsedState.email || emailFromSearch,
          contactNumber: parsedState.contactNumber,
          currentStatus: parsedState.currentStatus,
          reason: parsedState.reason,
          exploredField: parsedState.exploredField,
          previousExperience: parsedState.previousExperience,
          paymentMethod: parsedState.paymentMethod,
          paymentProofName: parsedState.paymentProofName,
          paymentProofFile: null,
        });
      } catch {
        window.localStorage.removeItem(registerStorageKey);
        setValues((current) => ({
          ...current,
          email: current.email || emailFromSearch,
        }));
      } finally {
        setHasRestoredState(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!hasRestoredState) {
      return;
    }

    if (currentStep === "complete") {
      window.localStorage.removeItem(registerStorageKey);
      return;
    }

    const stateToPersist: PersistedFormState = {
      currentStep,
      fullName: values.fullName,
      email: values.email,
      contactNumber: values.contactNumber,
      currentStatus: values.currentStatus,
      reason: values.reason,
      exploredField: values.exploredField,
      previousExperience: values.previousExperience,
      paymentMethod: values.paymentMethod,
      paymentProofName: values.paymentProofName,
    };

    window.localStorage.setItem(registerStorageKey, JSON.stringify(stateToPersist));
  }, [currentStep, hasRestoredState, values]);

  useEffect(() => {
    if (currentStep !== "complete") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.push("/dark-version");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentStep, router]);

  const markFieldsTouched = (fields: Array<keyof FormState>) => {
    setTouched((current) => {
      const nextTouched = { ...current };

      fields.forEach((field) => {
        nextTouched[field] = true;
      });

      return nextTouched;
    });
  };

  const updateField = (field: keyof FormState, value: string | File | null) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleTextFieldChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const nextValue =
        field === "contactNumber"
          ? event.target.value.replace(/\D/g, "").slice(0, 11)
          : event.target.value;

      updateField(field, nextValue);
    };

  const handleNext = () => {
    const requiredFields = getStepFields(currentStep);

    if (!requiredFields.length) {
      return;
    }

    markFieldsTouched(requiredFields);

    if (!isStepValid(currentStep, values)) {
      return;
    }

    if (currentStep === "basic") {
      setCurrentStep("questionnaire");
      return;
    }

    if (currentStep === "questionnaire") {
      setCurrentStep("payment");
    }
  };

  const handleBack = () => {
    if (currentStep === "questionnaire") {
      setCurrentStep("basic");
      return;
    }

    if (currentStep === "payment") {
      setCurrentStep("questionnaire");
    }
  };

  const handleComplete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void (async () => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: values.fullName,
            email: values.email,
            contactNumber: values.contactNumber,
            currentStatus: values.currentStatus,
            reason: values.reason,
            exploredField: values.exploredField,
            previousExperience: values.previousExperience,
            seatPrice: `${payment.seatPriceCurrency} ${payment.seatPriceAmount}`,
          }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { message?: string } | null;
          throw new Error(data?.message || "Unable to send your registration right now.");
        }

        window.localStorage.removeItem(registerStorageKey);
        setCurrentStep("complete");
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Unable to send your registration right now.",
        );
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const renderError = (field: keyof FormState) => {
    if (!touched[field]) {
      return null;
    }

    const error = getFieldError(field, values);

    if (!error) {
      return null;
    }

    return <p className="mt-2 text-xs text-[#ff8f8f]">{error}</p>;
  };

  const isQuestionnaireYes = values.exploredField === "yes";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#181818] px-4 py-6 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(111,96,214,0.16),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(153,237,67,0.09),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,transparent_74%,rgba(255,255,255,0.016))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1160px] flex-col rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(24,24,24,0.98),rgba(18,18,18,0.98))] px-5 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.4)] sm:px-7 lg:px-10">
        <header className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <Image
              src="/Vector.svg"
              alt="Brand Republic logo"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>

          <Link
            href="/register"
            className="ml-auto inline-flex items-center justify-center rounded-full font-prompt bg-[#99ED43] px-6 py-3 text-xs font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105 sm:text-sm"
          >
            {reserveLabel ?? "Reserve Your Seat"}
          </Link>
        </header>

        <section className="mx-auto flex w-full max-w-[840px] flex-1 flex-col justify-between py-8 sm:py-10">
          <div>
            {currentStep !== "complete" ? (
              <>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  {progressSteps.map((step, index) => {
                    const status = progressStepStatus(currentStep, step.key);
                    const isActive = status !== "upcoming";

                    return (
                      <React.Fragment key={step.key}>
                        <div
                          className={[
                            "inline-flex min-w-[128px] items-center justify-center rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.01em] transition sm:min-w-[152px] sm:text-xs",
                            status === "current" || status === "complete"
                              ? "border-[#99ED43] bg-[#22281d] text-[#daf8ad]"
                              : "border-white/14 bg-white/[0.03] text-white/38",
                          ].join(" ")}
                        >
                          {step.label}
                        </div>

                        {index < progressSteps.length - 1 ? (
                          <div
                            className={[
                              "hidden h-px w-10 sm:block",
                              isActive ? "bg-[#99ED43]" : "bg-white/10",
                            ].join(" ")}
                          />
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="mt-14 text-center">
                 

                  <h1 className="mt-6 lg:text-6xl md:text-5xl text-5xl  leading-[0.96] tracking-[-0.04em] text-[#FFFFFF] font-sans ">
                    {currentStep === "basic" && title}
                    {currentStep === "questionnaire" && questionnaire.title}
                    {currentStep === "payment" && payment.title}
                  </h1>

                  <p className="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-[#DDDDDD] font-prompt ">
                    {currentStep === "basic" && description}
                    {currentStep === "questionnaire" && questionnaire.description}
                    {currentStep === "payment" && payment.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
                <div className="relative  items-center justify-center  ">
                  <div className="absolute inset-[10px] rounded-full border border-dashed " />
                  <div className="relative h-40 w-40">
                    <Image
                      src="/check 1.svg"
                      alt="Success checkmark"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h1 className="mt-10 text-[clamp(2.75rem,7vw,4.4rem)] font-sans leading-none tracking-[-0.05em] text-white">
                  {complete.title}
                </h1>

                <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-white/58 font-prompt">
                  {complete.description}{" "}
                  <span className="text-white/80">{values.email || "your email address"}</span>.
                </p>
              </div>
            )}

            {currentStep === "basic" ? (
              <div className="mx-auto mt-14 grid w-full max-w-[760px] gap-4">
                {fields.map((field) => (
                  <label
                    key={field.name}
                    className="grid items-start gap-3 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12 text-[#FFFFFF]"
                  >
                    <span className="pt-3 text-sm text-white  font-sans">{field.label}</span>
                    <div>
                      {field.type === "select" ? (
                        <div className="relative">
                          <select
                            name={field.name}
                            value={String(values[field.name as keyof FormState] ?? "")}
                            onChange={handleTextFieldChange(field.name as keyof FormState)}
                            onBlur={() =>
                              setTouched((current) => ({ ...current, [field.name]: true }))
                            }
                            className="register-select w-full appearance-none rounded-[10px] border border-white/6 bg-[#252525] px-4 py-3.5 pr-12 text-sm text-white outline-none transition focus:border-[#99ED43]/55"
                          >
                            <option value="" className="bg-[#252525] text-white/40">
                              {field.placeholder}
                            </option>
                            {field.options?.map((option) => (
                              <option key={option.value} value={option.value} className="bg-[#252525]">
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white">
                            v
                          </span>
                        </div>
                      ) : (
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={String(values[field.name as keyof FormState] ?? "")}
                          onChange={handleTextFieldChange(field.name as keyof FormState)}
                          onBlur={() =>
                            setTouched((current) => ({ ...current, [field.name]: true }))
                          }
                          inputMode={field.name === "contactNumber" ? "numeric" : undefined}
                          maxLength={field.name === "contactNumber" ? 11 : undefined}
                           className="w-full rounded-[10px] border border-white/6 bg-[#252525] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#99ED43]/55"
                        />
                      )}
                      {renderError(field.name as keyof FormState)}
                    </div>
                  </label>
                ))}
              </div>
            ) : null}

            {currentStep === "questionnaire" ? (
              <div className="mx-auto mt-14 grid w-full max-w-[760px] gap-4">
                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4">
                  <label className="block">
                    <span className="mb-3 block text-sm text-[#FFFFFF] font-sans">
                      {questionnaire.reasonLabel}
                    </span>
                    <textarea
                      name="reason"
                      placeholder={questionnaire.reasonPlaceholder}
                      value={values.reason}
                      onChange={handleTextFieldChange("reason")}
                      onBlur={() => setTouched((current) => ({ ...current, reason: true }))}
                      rows={5}
                      className="w-full resize-none rounded-[12px] border border-white/6 bg-[#2b2b2b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#99ED43]/55"
                    />
                  </label>
                  {renderError("reason")}
                </div>

                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4 font-sans">
                  <span className="mb-4 block text-sm text-[#FFFFFF] font-sans">
                    {questionnaire.exploredLabel}
                  </span>

                  <div className="grid gap-3 sm:grid-cols-2 font-prompt">
                    {questionnaire.exploredOptions.map((option) => {
                      const isSelected = values.exploredField === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            updateField("exploredField", option.value);
                            setTouched((current) => ({ ...current, exploredField: true }));
                          }}
                          className={[
                            "flex items-center gap-3 rounded-[10px] border px-4 py-3 text-left  font-prompt transition",
                            isSelected
                              ? "border-[#99ED43] bg-[#303729] text-white"
                              : "border-white/6 bg-[#2b2b2b] text-white/56 hover:border-white/16",
                          ].join(" ")}
                          aria-pressed={isSelected}
                        >
                          <span
                            className={[
                              "h-3.5 w-3.5 rounded-full border",
                              isSelected ? "border-[#99ED43] bg-[#99ED43]" : "border-white/24 bg-transparent",
                            ].join(" ")}
                          />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {renderError("exploredField")}
                </div>

                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4">
                  <label className="block">
                    <span className="mb-3 block text-sm text-white/84 font-sans">
                      {questionnaire.experienceLabel}{" "}
                      <span className="text-white/40">{questionnaire.experienceOptionalLabel}</span>
                    </span>
                    <textarea
                      name="previousExperience"
                      placeholder={isQuestionnaireYes ? questionnaire.experiencePlaceholder : questionnaire.experienceOptionalLabel}
                      value={values.previousExperience}
                      onChange={handleTextFieldChange("previousExperience")}
                      rows={4}
                      className="w-full resize-none rounded-[12px] border border-white/6 bg-[#2b2b2b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#99ED43]/55"
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {currentStep === "payment" ? (
              <form onSubmit={handleComplete} className="mx-auto mt-12 w-full max-w-[760px]">
                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4">
                  
                  <p className="font-prompt text-gray-300 text-center">{payment.subheading}</p>
                  <p className="text-sm text-white/82">{payment.seatPriceLabel}</p>
                  <div className="mt-2 flex items-start gap-2 text-[#99ED43]">
                    <span className="pt-2 text-[0.95rem] font-medium leading-none tracking-[0.02em]">
                      {payment.seatPriceCurrency}
                    </span>
                    <span className="text-[3.15rem] font-prompt leading-none">
                      {payment.seatPriceAmount}
                    </span>
                  </div>

                  <div className="mt-5 text-sm leading-relaxed text-white/52">
                    <p className="text-white/76">{payment.noteLabel}</p>
                    <p className="mt-2 whitespace-pre-line italic">{payment.noteText}</p>
                  </div>
                </div>

                {submitError ? (
                  <p className="text-sm text-[#ff8f8f]">{submitError}</p>
                ) : null}

                <div className="mt-10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full font-prompt bg-[#263817] px-7 py-3 text-sm text-[#b8e17c] transition hover:brightness-110"
                  >
                    {payment.backLabel}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full font-prompt bg-[#99ED43] px-8 py-3 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : payment.confirmLabel}
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          {currentStep !== "complete" && currentStep !== "payment" ? (
            <div className="mx-auto mt-12 flex w-full max-w-[760px] items-center justify-between gap-3">
              {currentStep === "basic" ? (
                <Link
                  href="/dark-version"
                  className="inline-flex items-center justify-center rounded-full bg-[#263817] px-7 py-3 text-sm text-[#b8e17c] transition hover:brightness-110 font-prompt"
                >
                  {cancelLabel ?? "Cancel"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center rounded-full bg-[#263817] px-7 py-3 text-sm font-prompt text-[#b8e17c] transition hover:brightness-110"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(currentStep, values)}
                className="inline-flex items-center justify-center rounded-full bg-[#99ED43] px-8 py-3 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {currentStep === "basic" ? submitLabel : questionnaire.nextLabel}
              </button>
            </div>
          ) : null}
        </section>

        <footer className="mt-auto flex flex-col gap-4 border-t border-white/6 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {ctaFooter.footerLinks.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>

          <p>{ctaFooter.copyrightText}</p>
        </footer>
      </div>
    </main>
  );
}
