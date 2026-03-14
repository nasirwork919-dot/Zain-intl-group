import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  buildBuyerInquiryLines,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/utils/whatsapp";

export function WhatsAppFloatingButton({
  number = DEFAULT_WHATSAPP_NUMBER,
  defaultMessageLines,
  className,
}: {
  number?: string;
  defaultMessageLines?: string[];
  className?: string;
}) {
  const displayNumber = number.trim() || DEFAULT_WHATSAPP_NUMBER;
  const href = buildWhatsAppUrl({
    number: displayNumber,
    lines: defaultMessageLines ?? buildBuyerInquiryLines({}),
  });

  return (
    <div className={cn("fixed bottom-5 left-5 z-50", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(
              "group inline-flex items-center justify-center",
              "h-11 w-11 rounded-full",
              "border border-white/30",
              "bg-[#128C7E] text-white",
              "shadow-[0_18px_45px_-26px_rgba(18,140,126,0.72)]",
              "ring-1 ring-black/5",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-[#0F7A6E]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E]/35 focus-visible:ring-offset-2",
            )}
          >
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full",
                "bg-white/12 ring-1 ring-white/20",
                "transition-transform duration-200 group-hover:scale-[1.04]",
              )}
            >
              <MessageCircle className="h-5 w-5" />
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent className="rounded-[5px] bg-[#0b1220] text-white/90">
          WhatsApp: {displayNumber}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
