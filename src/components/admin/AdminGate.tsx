import { ReactNode, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isAdminLoggedIn } from "@/components/admin/admin-auth";

export function AdminGate({ children }: { children: ReactNode }) {
  const location = useLocation();

  const from = useMemo(() => {
    const next = location.pathname + location.search;
    return next.startsWith("/admin") ? next : "/admin";
  }, [location.pathname, location.search]);

  if (!isAdminLoggedIn()) {
    return (
      <Navigate
        to={`/admin/login?from=${encodeURIComponent(from)}`}
        replace
      />
    );
  }

  return <>{children}</>;
}