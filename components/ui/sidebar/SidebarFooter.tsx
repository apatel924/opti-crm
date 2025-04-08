"use client";

import * as React from "react";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";
