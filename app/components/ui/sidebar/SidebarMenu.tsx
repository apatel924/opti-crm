"use client";

import * as React from "react";

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" {...props} />
));
SidebarMenu.displayName = "SidebarMenu";
