"use client";

import * as React from "react";
import { Input } from "@/app/components/ui/input";

export const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
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
