"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { farmerProfile, notifications } from "@/data/mock-data"
import {
  LayoutDashboard,
  User,
  Sparkles,
  MessageSquare,
  ClipboardList,
  FileCheck,
  Search,
  Bell,
  Settings,
  LogOut,
  Wheat,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "My Profile", icon: User, id: "profile" },
  { label: "Scheme Recommendations", icon: Sparkles, id: "recommendations" },
  { label: "AI Assistant", icon: MessageSquare, id: "chat" },
  { label: "Applications Tracker", icon: ClipboardList, id: "applications" },
  { label: "Document Verification", icon: FileCheck, id: "documents" },
  { label: "Scheme Explorer", icon: Search, id: "explorer" },
]

const secondaryItems = [
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Settings", icon: Settings, id: "settings" },
]

interface AppSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  const { logout } = useAuth()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wheat className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold text-sidebar-foreground">
              KisanMitra
            </span>
            <span className="text-[11px] leading-none text-sidebar-foreground/60">
              Scheme Discovery
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.id === "notifications" && unreadCount > 0 && (
                    <SidebarMenuBadge className="bg-primary/10 text-primary">
                      {unreadCount}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="rounded-lg"
              onClick={() => logout()}
            >
              <Avatar className="h-8 w-8 rounded-lg border border-sidebar-border">
                <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {farmerProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="truncate text-sm font-medium">
                  {farmerProfile.name}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {farmerProfile.village}, {farmerProfile.district}
                </span>
              </div>
              <LogOut className="ml-auto h-4 w-4 text-sidebar-foreground/40" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
