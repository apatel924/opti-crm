"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

export const SidebarInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";
