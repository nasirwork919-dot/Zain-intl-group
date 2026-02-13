import { cn } from "@/lib/utils";
import { ListPropertyForm } from "@/components/real-estate/ListPropertyForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function ListPropertyDialog({
  open,
  onOpenChange,
  whatsappNumber = "+971521362224",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  whatsappNumber?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-5xl overflow-hidden rounded-[5px] p-0",
          "border border-white/40 bg-transparent shadow-none",
        )}
      >
        <div className="bg-[hsl(var(--page))] p-4 sm:p-6">
          <ListPropertyForm
            whatsappNumber={whatsappNumber}
            onDone={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}