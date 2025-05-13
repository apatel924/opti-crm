import { QuickBillingPage } from "@/components/billing/quick-billing-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quick Billing | OptiCRM",
  description: "Process quick billing transactions",
}

export default function QuickBilling() {
  return <QuickBillingPage />
}
