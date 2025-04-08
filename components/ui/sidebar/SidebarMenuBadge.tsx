"use client";

import * as React from "react";

export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
