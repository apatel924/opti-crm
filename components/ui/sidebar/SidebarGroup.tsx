"use client";

import * as React from "react";

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";
