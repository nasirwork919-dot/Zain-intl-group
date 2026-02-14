import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  alt = "ZAIN Avenue Reality Real Estate",
  variant = "mark",
}: {
  className?: string;
  alt?: string;
  variant?: "mark" | "lockup";
}) {
  // Current asset is a lockup (icon + text). Keep variants for future flexibility.
  const src = "/brand/logo.webp";

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className={cn(
        "block select-none object-contain",
        variant === "mark" ? "h-10 w-10" : "h-10 w-auto",
        className,
      )}
      draggable={false}
    />
  );
}