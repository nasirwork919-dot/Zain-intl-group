import { useState } from "react";

import { cn } from "@/lib/utils";

export function SmartImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed ? "/placeholder.svg" : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={loading}
      className={cn(className)}
      onError={() => {
        // Prevent infinite loop if placeholder also fails for any reason.
        if (!failed) setFailed(true);
      }}
    />
  );
}