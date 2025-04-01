"use client";

import * as React from "react";

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => (
  <div ref={ref} data-sidebar="group-content" {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";
