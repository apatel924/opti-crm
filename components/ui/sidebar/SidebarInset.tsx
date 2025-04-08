"use client";

import * as React from "react";

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={className}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";
