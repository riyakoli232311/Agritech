"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { RecommendationsPage } from "@/components/pages/recommendations-page"
import { ChatPage } from "@/components/pages/chat-page"
import { ApplicationsPage } from "@/components/pages/applications-page"
import { DocumentsPage } from "@/components/pages/documents-page"
import { ExplorerPage } from "@/components/pages/explorer-page"
import { NotificationsPage } from "@/components/pages/notifications-page"
import { SettingsPage } from "@/components/pages/settings-page"

const pages: Record<string, React.ComponentType<{ onNavigate: (page: string) => void }>> = {
  dashboard: DashboardPage,
  profile: ProfilePage,
  recommendations: RecommendationsPage,
  chat: ChatPage,
  applications: ApplicationsPage,
  documents: DocumentsPage,
  explorer: ExplorerPage,
  notifications: NotificationsPage,
  settings: SettingsPage,
}

export function DashboardLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const PageComponent = pages[currentPage] || DashboardPage

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <SidebarInset>
        <AppNavbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex-1 overflow-auto">
          <PageComponent onNavigate={setCurrentPage} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
