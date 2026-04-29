"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import darkPageJson from "../../_data/dark-page.json";
import { trackEvent } from "../../lib/analytics";
import type {
  AuthPageContent,
  DarkPageContent,
} from "../../_data/page-content.types";
import { EVENT_KEYS } from "@/app/lib/events";



type StepKey = "basic" | "questionnaire" | "payment" | "complete";

type BasicFormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  age: string;
  currentStatus: string;
};

type QuestionnaireState = {
  quickUnderstanding: string;
  quickUnderstandingOther: string;
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
  age: false,
  currentStatus: false,
  quickUnderstanding: false,
  quickUnderstandingOther: false,
  exploredField: false,
  paymentMethod: false,
  paymentProofFile: false,
};

const initialStartedSteps: Record<StepKey, boolean> = {
  basic: false,
  questionnaire: false,
  payment: false,
  complete: false,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhoneNumber(value: string) {
  return /^\d{11}$/.test(value);
}

function isValidAge(value: string) {
  const age = Number(value);
  return /^\d{1,3}$/.test(value) && age >= 1 && age <= 120;
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
    case "age":
      if (!values.age.trim()) return "Age is required.";
      return isValidAge(values.age) ? "" : "Enter a valid age.";
    case "currentStatus":
      return values.currentStatus.trim()
        ? ""
        : "Please select your current status.";
    case "quickUnderstanding":
      return values.quickUnderstanding.trim()
        ? ""
        : "Please select one option.";
    case "quickUnderstandingOther":
      return values.quickUnderstanding === "Other" &&
        !values.quickUnderstandingOther.trim()
        ? "Please specify your selection."
        : "";
    case "exploredField":
      return values.exploredField ? "" : "Please choose Yes or No.";
    case "paymentMethod":
      return values.paymentMethod ? "" : "Please select a payment method.";
    case "paymentProofFile":
      return values.paymentProofFile
        ? ""
        : "Upload your payment proof to continue.";
    default:
      return "";
  }
}

function getStepFields(step: StepKey): Array<keyof FormState> {
  switch (step) {
    case "basic":
      return ["fullName", "email", "contactNumber", "age", "currentStatus"];
    case "questionnaire":
      return [
        "exploredField",
        "previousExperience",
        "quickUnderstanding",
        "quickUnderstandingOther",
      ];
    case "payment":
      return [];
    default:
      return [];
  }
}

function isStepValid(step: StepKey, values: FormState) {
  return getStepFields(step).every((field) => !getFieldError(field, values));
}

function isStepComplete(
  step: (typeof progressSteps)[number]["key"],
  values: FormState,
) {
  if (step === "basic") {
    return isStepValid("basic", values);
  }

  if (step === "questionnaire") {
    return isStepValid("basic", values) && isStepValid("questionnaire", values);
  }

  return false;
}

function progressStepStatus(
  currentStep: StepKey,
  step: (typeof progressSteps)[number]["key"],
  values: FormState,
) {
  if (currentStep === "complete") {
    return "complete";
  }

  if (step === currentStep) {
    return "current";
  }

  if (isStepComplete(step, values)) {
    return "complete";
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
  const [startedSteps, setStartedSteps] =
    useState<Record<StepKey, boolean>>(initialStartedSteps);
  const trackedStartedStepsRef = useRef<Set<StepKey>>(new Set());
  const [values, setValues] = useState<FormState>(() => ({
    fullName: "",
    email: "",
    contactNumber: "",
    age: "",
    currentStatus: "",
    quickUnderstanding: "",
    quickUnderstandingOther: "",
    exploredField: "",
    previousExperience: "",
    paymentMethod: "",
    paymentProofName: "",
    paymentProofFile: null,
  }));
  const isQuestionnaireLocked = !isStepValid("basic", values);
  const isPaymentLocked =
    !isStepValid("basic", values) || !isStepValid("questionnaire", values);
  const isCurrentStepLocked =
    (currentStep === "questionnaire" && isQuestionnaireLocked) ||
    (currentStep === "payment" && isPaymentLocked);

  useEffect(() => {
    trackEvent(EVENT_KEYS.ON_REGISTER_PAGE_OPEN, {
      event_category: "register_funnel",
      step_name: "basic",
    });

    const timeoutId = window.setTimeout(() => {
      const emailFromSearch =
        new URLSearchParams(window.location.search).get("email") ?? "";
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
        const restoredValues: FormState = {
          fullName: parsedState.fullName,
          email: parsedState.email || emailFromSearch,
          contactNumber: parsedState.contactNumber,
          age: parsedState.age ?? "",
          currentStatus: parsedState.currentStatus,
          quickUnderstanding: parsedState.quickUnderstanding ?? "",
          quickUnderstandingOther: parsedState.quickUnderstandingOther ?? "",
          exploredField: parsedState.exploredField,
          previousExperience: parsedState.previousExperience,
          paymentMethod: parsedState.paymentMethod,
          paymentProofName: parsedState.paymentProofName,
          paymentProofFile: null,
        };

        setValues(restoredValues);
        setCurrentStep(parsedState.currentStep);
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
      age: values.age,
      currentStatus: values.currentStatus,
      quickUnderstanding: values.quickUnderstanding,
      quickUnderstandingOther: values.quickUnderstandingOther,
      exploredField: values.exploredField,
      previousExperience: values.previousExperience,
      paymentMethod: values.paymentMethod,
      paymentProofName: values.paymentProofName,
    };

    window.localStorage.setItem(
      registerStorageKey,
      JSON.stringify(stateToPersist),
    );
  }, [currentStep, hasRestoredState, values]);

  useEffect(() => {
    if (currentStep !== "complete") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentStep, router]);

  useEffect(() => {
    if (!hasRestoredState) {
      return;
    }

    // trackEvent("register_step_view", {
    //   event_category: "register_funnel",
    //   step_name: currentStep,
    // });
  }, [currentStep, hasRestoredState]);

  useEffect(() => {
    stepOrder.forEach((step) => {
      if (!startedSteps[step] || trackedStartedStepsRef.current.has(step)) {
        return;
      }
      console.log(step);

      trackedStartedStepsRef.current.add(step);

    });
  }, [startedSteps]);

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

  const markStepStarted = (step: StepKey) => {
    setStartedSteps((current) => {
      if (current[step]) {
        return current;
      }

      return {
        ...current,
        [step]: true,
      };
    });
  };

  const handleTextFieldChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      markStepStarted(currentStep);

      const nextValue =
        field === "contactNumber"
          ? event.target.value.replace(/\D/g, "").slice(0, 11)
          : field === "age"
            ? event.target.value.replace(/\D/g, "").slice(0, 3)
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
       trackEvent(EVENT_KEYS.ON_BASIC_INFO_NEXT, {
        event_category: "register_funnel",
        step_name: currentStep,
      });
      trackEvent(EVENT_KEYS.ON_QUESTIONAIRE_SHOW, {
        event_category: "register_funnel",
        step_name: currentStep,
      });
      return;
    }

    if (currentStep === "questionnaire") {
       trackEvent(EVENT_KEYS.ON_QUESTIONAIRE_NEXT, {
        event_category: "register_funnel",
        step_name: currentStep,
      });
      trackEvent(EVENT_KEYS.ON_PAYMENT_SHOW, {
        event_category: "register_funnel",
        step_name: currentStep,
      });
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

  const handleStepChange = (
    nextStep: (typeof progressSteps)[number]["key"],
  ) => {
    setCurrentStep(nextStep);
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
            age: values.age,
            currentStatus: values.currentStatus,
            quickUnderstanding: values.quickUnderstanding,
            quickUnderstandingOther: values.quickUnderstandingOther,
            exploredField: values.exploredField,
            previousExperience: values.previousExperience,
            seatPrice: `${payment.seatPriceCurrency} ${payment.seatPriceAmount}`,
          }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;
          throw new Error(
            data?.message || "Unable to send your registration right now.",
          );
        }

        window.localStorage.removeItem(registerStorageKey);
        trackEvent(EVENT_KEYS.ON_CONFIRM_MY_SEAT, {
          event_category: "register_funnel",
          step_name: currentStep,
        });

        setCurrentStep("complete");
      } catch (error) {
        trackEvent("register_submission_error", {
          event_category: "register_funnel",
          step_name: "payment",
          error_message:
            error instanceof Error ? error.message : "unknown_error",
        });
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Unable to send your registration right now.",
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
                    const status = progressStepStatus(currentStep, step.key, values);
                    const isActive = status !== "upcoming";

                    return (
                      <React.Fragment key={step.key}>
                        <button
                          type="button"
                          onClick={() => handleStepChange(step.key)}
                          aria-current={status === "current" ? "step" : undefined}
                          className={[
                            "inline-flex min-w-[128px] items-center justify-center rounded-full border px-4 py-2 text-[13.5px] font-medium tracking-[0.01em] transition sm:min-w-[152px] sm:text-xs",
                            status === "current" || status === "complete"
                              ? "border-[#99ED43] bg-[#22281d] text-[#daf8ad]"
                              : "border-white/14 bg-white/[0.03] text-white/38",
                            "cursor-pointer hover:border-[#99ED43]/55",
                          ].join(" ")}
                        >
                          {step.label}
                        </button>

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
                  <h1 className="mt-6 lg:text-6xl md:text-5xl text-5xl  leading-[0.96] tracking-[-0.04em] text-[#FFFFFF]  font-medium text-[54px] ">
                    {currentStep === "basic" && title}
                    {currentStep === "questionnaire" && questionnaire.title}
                    {currentStep === "payment" && payment.title}
                  </h1>

                  <p className="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-[#DDDDDD] font-prompt font-normal text-[15px]">
                    {currentStep === "basic" && description}
                    {currentStep === "questionnaire" &&
                      questionnaire.description}
                    {currentStep === "payment" && payment.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
                <div className="relative  items-center justify-center  ">
                  {/* <div className="absolute inset-[10px] rounded-full border border-dashed " /> */}
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

                <h1 className="mt-10 text-[clamp(2.75rem,7vw,4.4rem)] font-sans font-medium leading-none tracking-[-0.05em] text-[#FFFFFF]">
                  {complete.title}
                </h1>

                <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-[#DDDDDD] font-prompt font-normal">
                  {complete.description}{" "}
                  <span className="text-white/80">
                    {values.email || "your email address"}
                  </span>
                  .
                </p>
              </div>
            )}

            {currentStep === "basic" ? (
              <div className="mx-auto mt-14 grid w-full max-w-[760px] gap-4">
                {fields.map((field) => (
                  <label
                    key={field.name}
                    className="grid items-start gap-3 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12 font-medium font-sans text-[#FFFFFF] text-[15px]"
                  >
                    <span className="pt-3 text-sm text-white  font-sans">
                      {field.label}
                    </span>
                    <div>
                      {field.type === "select" ? (
                        <div className="relative">
                          <select
                            name={field.name}
                            value={String(
                              values[field.name as keyof FormState] ?? "",
                            )}
                            onChange={handleTextFieldChange(
                              field.name as keyof FormState,
                            )}
                            onBlur={() =>
                              setTouched((current) => ({
                                ...current,
                                [field.name]: true,
                              }))
                            }
                            className="register-select w-full appearance-none rounded-[10px] border border-white/6 bg-[#252525] px-4 py-3.5 pr-12 text-sm text-white outline-none transition focus:border-[#99ED43]/55"
                          >
                            <option
                              value=""
                              className="bg-[#252525] text-white/40"
                            >
                              {field.placeholder}
                            </option>
                            {field.options?.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#252525]"
                              >
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
                          value={String(
                            values[field.name as keyof FormState] ?? "",
                          )}
                          onChange={handleTextFieldChange(
                            field.name as keyof FormState,
                          )}
                          onBlur={() =>
                            setTouched((current) => ({
                              ...current,
                              [field.name]: true,
                            }))
                          }
                          inputMode={
                            field.name === "contactNumber" ||
                            field.name === "age"
                              ? "numeric"
                              : undefined
                          }
                          maxLength={
                            field.name === "contactNumber" ? 11 : undefined
                          }
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
                {isQuestionnaireLocked ? (
                  <p className="rounded-[12px] border border-[#99ED43]/20 bg-[#263817] px-4 py-3 text-sm text-[#daf8ad]">
                    Complete your basic information first to unlock this section.
                  </p>
                ) : null}

                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4 font-medium text-[15px]">
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
                          disabled={isQuestionnaireLocked}
                          onClick={() => {
                            markStepStarted("questionnaire");
                            updateField("exploredField", option.value);
                            setTouched((current) => ({
                              ...current,
                              exploredField: true,
                            }));
                          }}
                          className={[
                            "flex items-center gap-3 rounded-[10px] border px-4 py-3 text-left  font-prompt text-[15px] transition",
                            isSelected
                              ? "border-[#99ED43] bg-[#303729] text-[#FFFFFF]"
                              : "border-white/6 bg-[#2b2b2b] text-white/56 hover:border-white/16",
                            isQuestionnaireLocked
                              ? "cursor-not-allowed opacity-45"
                              : "",
                          ].join(" ")}
                          aria-pressed={isSelected}
                        >
                          <span
                            className={[
                              "h-3.5 w-3.5 rounded-full border",
                              isSelected
                                ? "border-[#99ED43] bg-[#99ED43]"
                                : "border-white/24 bg-transparent",
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
                    <span className="mb-3 block text-sm text-[#FFFFFF] font-medium text-[15px]">
                      {questionnaire.experienceLabel}{" "}
                      <span className=" font-medium text-[#FFFFFF]">
                        {questionnaire.experienceOptionalLabel}
                      </span>
                    </span>
                    <textarea
                      name="previousExperience"
                      placeholder={
                        isQuestionnaireYes
                          ? questionnaire.experiencePlaceholder
                          : questionnaire.experienceOptionalLabel
                      }
                      value={values.previousExperience}
                      disabled={isQuestionnaireLocked}
                      onChange={handleTextFieldChange("previousExperience")}
                      rows={4}
                      className="w-full resize-none rounded-[12px] border border-white/6 bg-[#2b2b2b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#99ED43]/55 disabled:cursor-not-allowed disabled:opacity-45"
                    />
                  </label>
                </div>

                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4">
                  <span className="mb-4 block text-sm font-medium text-[#FFFFFF]">
                    {questionnaire.quickUnderstandingLabel}
                  </span>

                  <div className="grid gap-3 font-prompt">
                    {questionnaire.quickUnderstandingOptions.map((option) => {
                      const isSelected =
                        values.quickUnderstanding === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={isQuestionnaireLocked}
                          onClick={() => {
                            markStepStarted("questionnaire");
                            updateField("quickUnderstanding", option.value);
                            if (option.value !== "Other") {
                              updateField("quickUnderstandingOther", "");
                            }
                            setTouched((current) => ({
                              ...current,
                              quickUnderstanding: true,
                            }));
                          }}
                          className={[
                            "flex items-center gap-3 rounded-[10px] border px-4 py-3 text-left text-[15px] transition",
                            isSelected
                              ? "border-[#99ED43] bg-[#303729] text-[#FFFFFF]"
                              : "border-white/6 bg-[#2b2b2b] text-white/56 hover:border-white/16",
                            isQuestionnaireLocked
                              ? "cursor-not-allowed opacity-45"
                              : "",
                          ].join(" ")}
                          aria-pressed={isSelected}
                        >
                          <span
                            className={[
                              "h-3 w-3 rounded-full border",
                              isSelected
                                ? "border-[#99ED43] bg-[#99ED43]"
                                : "border-white/24 bg-transparent",
                            ].join(" ")}
                          />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {values.quickUnderstanding === "Other" ? (
                    <input
                      name="quickUnderstandingOther"
                      type="text"
                      placeholder={
                        questionnaire.quickUnderstandingOtherPlaceholder
                      }
                      value={values.quickUnderstandingOther}
                      disabled={isQuestionnaireLocked}
                      onChange={handleTextFieldChange(
                        "quickUnderstandingOther",
                      )}
                      onBlur={() =>
                        setTouched((current) => ({
                          ...current,
                          quickUnderstandingOther: true,
                        }))
                      }
                      className="mt-3 w-full rounded-[10px] border border-white/6 bg-[#2b2b2b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#99ED43]/55 disabled:cursor-not-allowed disabled:opacity-45"
                    />
                  ) : null}

                  {renderError("quickUnderstanding")}
                  {renderError("quickUnderstandingOther")}
                </div>
              </div>
            ) : null}

            {currentStep === "payment" ? (
              <form
                onSubmit={handleComplete}
                className="mx-auto mt-12 w-full max-w-[760px]"
              >
                {isPaymentLocked ? (
                  <p className="mb-4 rounded-[12px] border border-[#99ED43]/20 bg-[#263817] px-4 py-3 text-sm text-[#daf8ad]">
                    Complete the previous steps first to unlock payment confirmation.
                  </p>
                ) : null}

                <div className="rounded-[14px] border border-white/5 bg-[#232323] p-4">
                  <p className="font-medium text-[#FFFFFF] text-[15px] text-center">
                    {payment.subheading}
                  </p>
                  <p className="text-sm text-white/82">
                    {payment.seatPriceLabel}
                  </p>
                  <div className="mt-2 flex items-start gap-2 text-[#99ED43]">
                    <span className="pt-2 text-[0.95rem] font-medium leading-none tracking-[0.02em]">
                      {payment.seatPriceCurrency}
                    </span>
                    <span className="text-[2.45rem] font-medium leading-none">
                      {payment.seatPriceAmount}
                    </span>
                  </div>

                  <div className="mt-5 text-sm leading-relaxed text-white/52">
                    <p className="text-[#FFFFFF] font-medium text-[15px]">
                      {payment.noteLabel}
                    </p>
                    <p className="text-[#DDDDDD] font-prompt  mt-2 whitespace-pre-line italic">
                      {payment.noteText}
                    </p>
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
                    disabled={isSubmitting || isPaymentLocked}
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
                  href="/"
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
                disabled={!isStepValid(currentStep, values) || isCurrentStepLocked}
                className="inline-flex items-center justify-center rounded-full bg-[#99ED43] px-8 py-3 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {currentStep === "basic"
                  ? submitLabel
                  : questionnaire.nextLabel}
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
