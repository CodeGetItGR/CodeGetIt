import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/admin/auth/RequireAuth';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { DashboardPage } from '@/admin/pages/DashboardPage';
import { LoginPage } from '@/admin/pages/LoginPage';
import { OfferDetailPage } from '@/admin/pages/offers/OfferDetailPage';
import { OffersListPage } from '@/admin/pages/offers/OffersListPage';
import { PublicOfferPage } from '@/pages/PublicOfferPage';
import { ProjectDetailPage } from '@/admin/pages/projects/ProjectDetailPage';
import { ProjectsListPage } from '@/admin/pages/projects/ProjectsListPage';
import { RequestDetailPage } from '@/admin/pages/requests/RequestDetailPage';
import { RequestsListPage } from '@/admin/pages/requests/RequestsListPage';
import { ContactMessagesPage } from '@/admin/pages/ContactMessagesPage';
import { SettingsPage } from '@/admin/pages/SettingsPage';
import { SEO } from '@/components/SEO';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AnnouncementBanner } from './components/sections/AnnouncementBanner';
import { Contact } from './components/sections/Contact.tsx';
import { Hero } from './components/sections/Hero.tsx';
import { Portfolio } from './components/sections/Portfolio.tsx';
import { Services } from './components/sections/Services.tsx';
import { ProcessTimeline } from './components/sections/ProcessTimeline.tsx';
import { ValueProposition } from './components/sections/ValueProposition.tsx';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { PublicSettingsProvider } from '@/settings/PublicSettingsProvider';
import {AppProviders} from "@/admin/providers/AppProviders";

const MarketingHomePage = () => {
  return (
    <PublicSettingsProvider>
      <>
        <SEO />
        <div className="marketing-shell min-h-screen">
          <ScrollProgress />
          <AnimatedBackground />
          <CursorSpotlight />
          <Header />
          <main className="relative z-10 overflow-hidden">
            <AnnouncementBanner />
            <Hero />
            <Services />
            <ValueProposition />
            <ProcessTimeline />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </div>
      </>
    </PublicSettingsProvider>
  );
};

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<MarketingHomePage />} />
        <Route path="/offers/:token" element={<PublicOfferPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<RequireAuth requireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="requests" element={<RequestsListPage />} />
            <Route path="requests/:id" element={<RequestDetailPage />} />
            <Route path="offers" element={<OffersListPage />} />
            <Route path="offers/:id" element={<OfferDetailPage />} />
            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="messages" element={<ContactMessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
}

export default App;
