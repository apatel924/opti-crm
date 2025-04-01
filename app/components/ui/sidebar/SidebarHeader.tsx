"use client";

import * as React from "react";

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";
