"use client";

import * as React from "react";

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";
