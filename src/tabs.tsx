import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils" // Giả sử bạn có file utils này từ shadcn

// 1. Định nghĩa các biến thể cho TabsTrigger
const tabsTriggerVariants = cva(
  // Các class CSS cơ bản áp dụng cho tất cả các biến thể
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Biến thể mặc định (nền xám)
        default:
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        // Biến thể mới: gạch chân
        underline:
          "bg-transparent shadow-none border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// 2. Mở rộng props của TabsTrigger để chấp nhận `variant`
interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
    className?: string;
    variant?: "default" | "underline" | null | undefined;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    // 3. Sử dụng `cn` để kết hợp các class từ CVA
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// --- Các component khác giữ nguyên hoặc tùy chỉnh nhẹ ---

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    // Tùy chỉnh nhỏ: loại bỏ nền của list khi dùng variant `underline`
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
