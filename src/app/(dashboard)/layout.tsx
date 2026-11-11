import React from 'react';
import { VerticalRail } from '@/components/layout/vertical-rail';
import { TopNavBar } from '@/components/layout/top-nav-bar';
import { DemoBanner } from '@/components/layout/demo-banner';
import { InstitutionalFooter } from '@/components/layout/institutional-footer';
import { FinanceProvider } from '@/features/finance/finance-context';
import { FinanceModals } from '@/features/finance/finance-modals';
import { NotificationProvider } from '@/features/notifications/notification-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FinanceProvider>
      <NotificationProvider>
        <div className="flex h-screen overflow-hidden bg-[#F3F4F6] dark:bg-background text-foreground font-sans">
          {/* Left Slim Vertical Rail */}
          <VerticalRail />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden min-w-0 px-3 sm:px-6 py-3">
            {/* Recruiter / Demo Notice Banner */}
            <DemoBanner />

            {/* Floating Top Navigation Bar */}
            <TopNavBar />

            {/* Page Content Canvas */}
            <main className="flex-1 overflow-y-auto pt-2 pb-8 pr-1">
              {children}
              {/* Legal and Institutional Footer */}
              <InstitutionalFooter />
            </main>
          </div>
        </div>
        <FinanceModals />
      </NotificationProvider>
    </FinanceProvider>
  );
}
