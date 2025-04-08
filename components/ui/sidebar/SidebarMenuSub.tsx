"use client";

import * as React from "react";

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";
