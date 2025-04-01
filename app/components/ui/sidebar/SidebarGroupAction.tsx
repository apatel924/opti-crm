"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
