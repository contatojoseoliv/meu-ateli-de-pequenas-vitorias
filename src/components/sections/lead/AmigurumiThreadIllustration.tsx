import * as React from "react";
import { cn } from "@/lib/utils";

type AmigurumiThreadIllustrationProps = {
  className?: string;
};

/**
 * Ilustração minimalista (SVG) de bola + fio de amigurumi.
 * Usa currentColor para herdar tokens (ex.: text-verde-eucalipto/40).
 */
const AmigurumiThreadIllustration = ({
  className,
}: AmigurumiThreadIllustrationProps) => {
  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="Ilustração de bola de fio de amigurumi com fio ondulado"
      className={cn("h-auto w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* fio ondulado */}
      <path
        d="M38 370 C 110 330, 150 410, 230 370 C 305 332, 350 410, 430 370 C 505 332, 545 410, 610 372"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* pequenos loops */}
      <path
        d="M110 350 C 98 330, 122 320, 134 338 C 146 356, 122 366, 110 350 Z"
        stroke="currentColor"
        strokeWidth="6"
        opacity="0.35"
      />
      <path
        d="M360 392 C 348 372, 374 362, 388 380 C 402 398, 374 410, 360 392 Z"
        stroke="currentColor"
        strokeWidth="6"
        opacity="0.35"
      />

      {/* bola de fio */}
      <g transform="translate(360 40)">
        <circle
          cx="140"
          cy="150"
          r="120"
          stroke="currentColor"
          strokeWidth="10"
          opacity="0.7"
        />

        {/* trama */}
        <path
          d="M55 128 C 100 90, 170 88, 220 120"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M48 162 C 104 130, 170 130, 232 164"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M58 198 C 120 170, 182 170, 236 206"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M88 88 C 116 140, 116 192, 92 240"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M142 72 C 170 136, 170 200, 142 264"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M196 80 C 230 144, 230 206, 198 268"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* saída do fio */}
        <path
          d="M70 250 C 50 295, 40 318, 28 350"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};

export { AmigurumiThreadIllustration };
