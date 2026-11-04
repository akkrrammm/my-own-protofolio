"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export function CopyEmailButton({ email }: { email: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions / insecure context): the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm text-sand transition-colors duration-300 hover:border-flame hover:text-flame"
    >
      {copied ? <Check className="size-4 text-flame" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
    </button>
  );
}
