"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notifications as initialNotifications } from "@/data/mock-data"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationsPageProps {
  onNavigate: (page: string) => void
}

const typeConfig: Record<
  string,
  { icon: React.ElementType; iconColor: string; bg: string }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
  },
  info: {
    icon: Info,
    iconColor: "text-sky-600",
    bg: "bg-sky-50",
  },
}

export function NotificationsPage({ onNavigate: _onNavigate }: NotificationsPageProps) {
  const [notifs, setNotifs] = useState(initialNotifications)

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Stay updated on your applications, deadlines, and new schemes.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="mr-1 h-3.5 w-3.5" />
            Mark All Read
          </Button>
        )}
      </div>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg font-semibold">
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-0">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Bell className="mb-3 h-10 w-10 text-muted-foreground/30" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifs.map((notif) => {
              const config = typeConfig[notif.type] || typeConfig.info
              const Icon = config.icon
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-4 rounded-xl p-4 transition-colors",
                    !notif.read
                      ? "bg-primary/5 border border-primary/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      config.bg
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.iconColor)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={cn(
                          "text-sm text-card-foreground",
                          !notif.read ? "font-semibold" : "font-medium"
                        )}
                      >
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {notif.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {new Date(notif.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {!notif.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markRead(notif.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteNotif(notif.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete notification</span>
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
