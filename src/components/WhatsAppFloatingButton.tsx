import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function toWhatsAppText(lines: string[]) {
  return encodeURIComponent(lines.filter(Boolean).join("\n"));
}

function buildWhatsAppUrl({ number, lines }: { number: string; lines: string[] }) {
  const wa = number.replace(/[^\d]/g, "");
  const text = toWhatsAppText(lines);
  return `https://wa.me/${wa}?text=${text}`;
}

export function WhatsAppFloatingButton({
  number = "+971 50 5033721",
  defaultMessageLines,
  className,
}: {
  number?: string;
  defaultMessageLines?: string[];
  className?: string;
}) {
  const href = buildWhatsAppUrl({
    number,
    lines:
      defaultMessageLines ??
      [
        "Hello Zain Dubai,",
        "I’d like to inquire about a property.",
        "",
        "My name:",
        "My budget:",
        "Preferred area:",
      ],
  });

  return (
    <div className={cn("fixed bottom-5 right-5 z-50", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(
              "group inline-flex items-center gap-3",
              "rounded-full",
              "border border-white/30",
              "bg-[#128C7E] text-white",
              "px-4 py-3",
              "shadow-[0_18px_45px_-22px_rgba(18,140,126,0.75)]",
              "ring-1 ring-black/5",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-[#0F7A6E] hover:shadow-[0_22px_55px_-26px_rgba(18,140,126,0.85)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E]/35 focus-visible:ring-offset-2",
            )}
          >
            <span
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full",
                "bg-white/15 ring-1 ring-white/20",
                "transition-transform duration-200 group-hover:scale-[1.03]",
              )}
            >
              <MessageCircle className="h-5 w-5" />
            </span>

            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-xs font-semibold text-white/85">
                WhatsApp us
              </span>
              <span className="text-sm font-extrabold tracking-tight">
                +971 50 5033721
              </span>
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent className="rounded-[5px] bg-[#0b1220] text-white/90">
          Chat with us on WhatsApp
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
