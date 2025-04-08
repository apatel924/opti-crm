"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean }
>(({ asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
