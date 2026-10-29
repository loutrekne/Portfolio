"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copier l'adresse email en un clic (plus fiable qu'un mailto pour un recruteur
 * sur un poste sans client mail). Retour immédiat : le libellé glisse,
 * une coche se dessine, le bouton rebondit.
 * Accessibilité : une seule annonce (« Adresse copiée »), dans une région live
 * placée HORS du bouton ; le succès n'est annoncé que si la copie a réussi.
 */
export function CopyEmailButton({
  email,
  copiedLabel,
  failedLabel,
  className = "",
}: {
  email: string;
  copiedLabel: string;
  /** Annoncé si le presse-papiers est indisponible (l'adresse est alors sélectionnée). */
  failedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Repli : sélectionner le texte pour un Cmd+C manuel, et le dire
      const range = document.createRange();
      const node = document.getElementById("email-text");
      if (node) {
        range.selectNodeContents(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      setMessage(failedLabel);
      timer.current = setTimeout(() => setMessage(""), 4000);
      return;
    }
    setCopied(true);
    setMessage(copiedLabel);
    timer.current = setTimeout(() => {
      setCopied(false);
      setMessage("");
    }, 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`group relative btn-spring inline-flex items-center gap-3 overflow-hidden rounded-pill bg-btn px-6 py-3.5 text-btn-fg ${className}`}
      >
        <span className="relative grid">
          <span
            id="email-text"
            aria-hidden={copied}
            className="col-start-1 row-start-1 transition-all duration-300 ease-spring"
            style={{ transform: copied ? "translateY(-120%)" : "none", opacity: copied ? 0 : 1 }}
          >
            {email}
          </span>
          <span
            aria-hidden={!copied}
            className="col-start-1 row-start-1 transition-all duration-300 ease-spring"
            style={{ transform: copied ? "none" : "translateY(120%)", opacity: copied ? 1 : 0 }}
          >
            {copiedLabel}
          </span>
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {copied ? (
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: 0,
                animation: "draw-check 420ms var(--ease-standard) both",
              }}
            />
          ) : (
            <>
              <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
              <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
            </>
          )}
        </svg>
      </button>
      {/* Région live hors du bouton : une seule annonce, sans répéter le nom du bouton */}
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </>
  );
}
