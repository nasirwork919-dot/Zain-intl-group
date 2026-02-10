import { useMemo, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function LeadCapture({
  defaultMessage,
}: {
  defaultMessage?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(defaultMessage ?? "");

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && (phone.trim().length >= 7 || email.includes("@"));
  }, [name, phone, email]);

  return (
    <Card className="rounded-[5px] border-white/20 bg-white/70 p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.55)] backdrop-blur supports-[backdrop-filter]:bg-white/55">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Talk to an agent</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Get pricing, payment plans, and a tailored shortlist.
          </div>
        </div>
        <div className="hidden rounded-[5px] bg-[hsl(var(--brand))]/10 px-3 py-2 text-xs font-semibold text-[hsl(var(--brand-ink))] md:block">
          Avg response: 5 mins
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (WhatsApp)"
            className="h-11 rounded-[5px] border-white/50 bg-white/70 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
          />
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11 rounded-[5px] border-white/50 bg-white/70 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
          />
        </div>
      </div>

      <div className="mt-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-11 rounded-[5px] border-white/50 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
        />
      </div>

      <div className="mt-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you looking for? e.g. 2BR in Dubai Marina, budget 3M"
          className="min-h-[110px] rounded-[5px] border-white/50 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          By submitting, you agree to be contacted about relevant properties.
        </div>
        <Button
          disabled={!canSubmit}
          className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 disabled:opacity-50"
          onClick={() => {
            toast({
              title: "Request sent",
              description:
                "Thanks! An agent will reach out shortly with a curated shortlist.",
            });
            setName("");
            setPhone("");
            setEmail("");
            setMessage(defaultMessage ?? "");
          }}
        >
          Send request
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}