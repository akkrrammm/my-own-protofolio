"use client";

import { Check, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { format } from "@/components/ui/Accent";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "message";
type Status = "idle" | "submitting" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 20;

/**
 * Validated contact form, sent to Formspree with fetch — no page reload.
 * The request carries the form's own fields (name, email, projectType,
 * message, plus Formspree's _subject and _gotcha honeypot) and asks for a
 * JSON answer, so success and failure reflect the real response. On
 * success the fields are cleared and a confirmation replaces the form.
 */
export function ContactForm() {
  const { t, locale } = useI18n();
  const f = t.contact.form;
  const uid = useId();
  const endpoint = siteConfig.contactEndpoint;
  const email = siteConfig.contact.email;
  const empty = { name: "", email: "", type: f.types[0], message: "" };

  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(v: typeof values) {
    const found: Partial<Record<Field, string>> = {};
    if (v.name.trim().length < 2) found.name = f.errors.name;
    if (!EMAIL_PATTERN.test(v.email.trim())) found.email = f.errors.email;
    if (v.message.trim().length < MIN_MESSAGE) found.message = f.errors.message;
    return found;
  }

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Re-check live only after the first submit, so nobody is scolded mid-typing.
    if (attempted) setErrors(validate(next));
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const firstInvalid = (["name", "email", "message"] as const).find((key) => found[key]);
    if (firstInvalid) {
      ({ name: nameRef, email: emailRef, message: messageRef })[firstInvalid].current?.focus();
      return;
    }

    // The form's named fields, trimmed (FormData picks up every input's `name`).
    const data = new FormData(event.currentTarget);
    for (const key of ["name", "email", "message"] as const) data.set(key, values[key].trim());

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      // Formspree answers { ok: true } or { errors: [...] }.
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: unknown[] };
      if (!response.ok || result.errors?.length) throw new Error(`Contact endpoint responded ${response.status}`);
      setValues(empty);
      setErrors({});
      setAttempted(false);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const done = status === "sent";
  const errorCount = Object.keys(errors).length;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <m.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[26rem] flex-col items-start justify-center gap-6"
          >
            <m.span
              initial={{ scale: 0.4, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-flame text-ink shadow-[0_0_60px_-10px_rgb(255_152_0/0.8)]"
            >
              <Check className="size-7" aria-hidden />
            </m.span>
            <h3 className="font-display text-3xl leading-heading font-semibold text-cream sm:text-4xl">{f.success.title}</h3>
            <p className="max-w-md text-lg leading-relaxed text-sand">{f.success.text}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-medium text-flame underline decoration-flame/40 underline-offset-[6px] transition-colors hover:text-flame-300"
            >
              {f.again}
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            action={endpoint}
            method="POST"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            aria-describedby={attempted && errorCount > 0 ? `${uid}-summary` : undefined}
            className="space-y-8"
          >
            {/* Formspree extras: the email subject, the page language, and a
                honeypot field that only bots fill in. */}
            <input type="hidden" name="_subject" value={f.subject} />
            <input type="hidden" name="language" value={locale} />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="grid gap-8 sm:grid-cols-2">
              <TextField
                id={`${uid}-name`}
                label={f.name}
                error={errors.name}
                input={
                  <input
                    ref={nameRef}
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder={f.namePlaceholder}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                    className={inputClass}
                  />
                }
              />
              <TextField
                id={`${uid}-email`}
                label={f.email}
                error={errors.email}
                input={
                  <input
                    ref={emailRef}
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    dir="ltr"
                    required
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder={f.emailPlaceholder}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                    className={cn(inputClass, "rtl:text-right")}
                  />
                }
              />
            </div>

            <fieldset>
              <legend className="eyebrow text-dust">{f.type}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {f.types.map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      checked={values.type === type}
                      onChange={() => update("type", type)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex rounded-full border border-cream/15 px-4 py-2 text-sm text-sand transition-colors duration-300 peer-checked:border-flame peer-checked:bg-flame peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flame hover:border-flame/60 hover:text-cream peer-checked:hover:text-ink">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <TextField
              id={`${uid}-message`}
              label={f.message}
              error={errors.message}
              input={
                <textarea
                  ref={messageRef}
                  id={`${uid}-message`}
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder={f.messagePlaceholder}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                  className={cn(inputClass, "resize-none")}
                />
              }
            />

            <div aria-live="polite" id={`${uid}-summary`}>
              {attempted && errorCount > 0 && <p className="sr-only">{f.errors.summary}</p>}
              {status === "error" && (
                <p role="alert" className="flex items-start gap-3 rounded-2xl border border-ember-300/40 bg-ember/15 px-4 py-3 text-sm leading-relaxed text-cream">
                  <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-ember-300" />
                  <span>
                    <strong className="font-semibold">{f.failure.title}</strong> <WithEmail text={f.failure.text} email={email} />
                  </span>
                </p>
              )}
            </div>

            <div className="flex">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative isolate ms-auto inline-flex items-center gap-4 overflow-hidden rounded-full bg-flame py-2 ps-6 pe-2 font-medium text-ink transition-shadow duration-500 hover:shadow-[0_14px_44px_-12px_rgb(255_152_0/0.75)] disabled:cursor-wait disabled:opacity-80"
              >
                <span aria-hidden className="absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] bg-cream transition-transform duration-500 ease-expo group-hover:translate-y-0" />
                {status === "submitting" ? f.sending : status === "error" ? f.retry : f.submit}
                <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink text-flame">
                  {status === "submitting" ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4 transition-transform duration-500 ease-expo group-hover:-rotate-12 rtl:-scale-x-100" />
                  )}
                </span>
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "peer w-full border-0 border-b border-cream/20 bg-transparent px-0 py-3 text-lg text-cream placeholder:text-dust/85 transition-colors duration-300 focus:border-cream/20 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-ember-300";

function TextField({ id, label, error, input }: { id: string; label: string; error?: string; input: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-dust">
        {label}
      </label>
      <div className="relative mt-1">
        {input}
        {/* Focus underline that draws in from the start edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-flame transition-transform duration-500 ease-expo peer-focus:scale-x-100 rtl:origin-right"
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-ember-300"
          >
            <CircleAlert aria-hidden className="size-3.5 shrink-0" />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Renders a dictionary sentence with its {email} placeholder as the address, set left-to-right. */
function WithEmail({ text, email }: { text: string; email: string }) {
  const [before, after] = format(text, { email: "\u0000" }).split("\u0000");
  return (
    <>
      {before}
      <bdi dir="ltr" className="font-medium text-flame">
        {email}
      </bdi>
      {after}
    </>
  );
}
