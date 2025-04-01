"use client";

import * as React from "react";

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";
