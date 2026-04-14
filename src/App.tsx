import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { AdminLayout } from '@/components/layouts/AdminLayout'

// Public pages
import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ObjectDetailPage } from '@/pages/ObjectDetailPage'
import { InfoPackagePage } from '@/pages/InfoPackagePage'
import { RequestCheckoutPage } from '@/pages/RequestCheckoutPage'
import { BlogPage } from '@/pages/BlogPage'
import { NewsPage } from '@/pages/NewsPage'
import { UnpackingsPage } from '@/pages/UnpackingsPage'
import { AILaboratoryPage } from '@/pages/AILaboratoryPage'
import { MarketPage } from '@/pages/MarketPage'
import { LoginPage, RegisterPage } from '@/pages/AuthPages'
import { NotFoundPage } from '@/pages/NotFoundPage'

// Static pages
import { OfferPage } from '@/pages/static/OfferPage'
import { ContactsPage } from '@/pages/static/ContactsPage'
import { DonatePage } from '@/pages/static/DonatePage'
import { StaticPage } from '@/pages/static/StaticPage'

// Dashboard pages
import { DashboardHome } from '@/pages/dashboard/DashboardHome'
import { MyLotsPage } from '@/pages/dashboard/MyLotsPage'
import { DigitalInventoryPage } from '@/pages/dashboard/DigitalInventoryPage'
import { MyGenerationPage } from '@/pages/dashboard/MyGenerationPage'
import { DashboardPlaceholder } from '@/pages/dashboard/DashboardPlaceholder'

// Admin pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminPlaceholder } from '@/pages/admin/AdminPlaceholder'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="object/:slug" element={<ObjectDetailPage />} />
            <Route path="info-package" element={<InfoPackagePage />} />
            <Route path="request/checkout" element={<RequestCheckoutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="unpackings" element={<UnpackingsPage />} />
            <Route path="ai" element={<AILaboratoryPage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            {/* Static pages */}
            <Route path="offer" element={<OfferPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="donate" element={<DonatePage />} />
            <Route path="about" element={<StaticPage titleKey="static.about.title" contentKey="static.about.content" />} />
            <Route path="terms" element={<StaticPage titleKey="static.terms.title" contentKey="static.terms.content" />} />
            <Route path="privacy" element={<StaticPage titleKey="static.privacy.title" contentKey="static.privacy.content" />} />
            <Route path="faq" element={<StaticPage titleKey="static.faq.title" contentKey="static.faq.content" />} />
            <Route path="delivery" element={<StaticPage titleKey="static.delivery.title" contentKey="static.delivery.content" />} />
            <Route path="payments-info" element={<StaticPage titleKey="static.payments.title" contentKey="static.payments.content" />} />
            <Route path="support" element={<StaticPage titleKey="static.support.title" contentKey="static.support.content" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Dashboard routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="lots" element={<MyLotsPage />} />
            <Route path="digital-inventory" element={<DigitalInventoryPage />} />
            <Route path="my-generation" element={<MyGenerationPage />} />
            <Route path="requests" element={<DashboardPlaceholder titleKey="dashboard.myRequests" />} />
            <Route path="unpackings" element={<DashboardPlaceholder titleKey="dashboard.unpackingArchive" />} />
            <Route path="balance" element={<DashboardPlaceholder titleKey="dashboard.balance" />} />
            <Route path="invoices" element={<DashboardPlaceholder titleKey="dashboard.invoices" />} />
            <Route path="ads" element={<DashboardPlaceholder titleKey="dashboard.myAds" />} />
            <Route path="notifications" element={<DashboardPlaceholder titleKey="dashboard.notifications" />} />
            <Route path="support" element={<DashboardPlaceholder titleKey="dashboard.support" />} />
            <Route path="verification" element={<DashboardPlaceholder titleKey="dashboard.verification" />} />
            <Route path="premium" element={<DashboardPlaceholder titleKey="dashboard.premium" />} />
            <Route path="settings" element={<DashboardPlaceholder titleKey="dashboard.settings" />} />
          </Route>

          {/* Admin routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="objects" element={<AdminPlaceholder titleKey="admin.manageObjects" />} />
            <Route path="categories" element={<AdminPlaceholder titleKey="admin.categories" />} />
            <Route path="lots" element={<AdminPlaceholder titleKey="admin.manageLots" />} />
            <Route path="users" element={<AdminPlaceholder titleKey="admin.users" />} />
            <Route path="publish-rights" element={<AdminPlaceholder titleKey="admin.publishRights" />} />
            <Route path="requests" element={<AdminPlaceholder titleKey="admin.requests" />} />
            <Route path="invoices" element={<AdminPlaceholder titleKey="admin.invoices" />} />
            <Route path="payments" element={<AdminPlaceholder titleKey="admin.payments" />} />
            <Route path="reserves" element={<AdminPlaceholder titleKey="admin.reserves" />} />
            <Route path="deliveries" element={<AdminPlaceholder titleKey="admin.deliveries" />} />
            <Route path="returns" element={<AdminPlaceholder titleKey="admin.returns" />} />
            <Route path="blog" element={<AdminPlaceholder titleKey="admin.blog" />} />
            <Route path="news" element={<AdminPlaceholder titleKey="admin.news" />} />
            <Route path="unpackings" element={<AdminPlaceholder titleKey="admin.unpackings" />} />
            <Route path="donations" element={<AdminPlaceholder titleKey="admin.donations" />} />
            <Route path="ai" element={<AdminPlaceholder titleKey="admin.aiModels" />} />
            <Route path="market" element={<AdminPlaceholder titleKey="admin.p2pMarket" />} />
            <Route path="inventory" element={<AdminPlaceholder titleKey="admin.warehouse" />} />
            <Route path="settings" element={<AdminPlaceholder titleKey="admin.portalSettings" />} />
            <Route path="logs" element={<AdminPlaceholder titleKey="admin.systemLogs" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
