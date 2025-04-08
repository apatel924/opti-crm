"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
