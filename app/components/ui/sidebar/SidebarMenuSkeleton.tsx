"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { showIcon?: boolean }
>(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  
  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex items-center", className)}
      {...props}
    >
      {showIcon && (
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse mr-2" />
      )}
      <div 
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width }}
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
