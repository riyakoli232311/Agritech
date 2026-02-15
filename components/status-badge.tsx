import { cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; className: string }> = {
  approved: {
    label: "Approved",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  eligible: {
    label: "Eligible",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending_review: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  verified: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  needs_reupload: {
    label: "Re-upload",
    className: "bg-red-50 text-red-700 border-red-200",
  },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-muted text-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
