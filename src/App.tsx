import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/admin/auth/RequireAuth';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { DashboardPage } from '@/admin/pages/DashboardPage';
import { LoginPage } from '@/admin/pages/LoginPage';
import { OfferDetailPage } from '@/admin/pages/offers/OfferDetailPage';
import { OffersListPage } from '@/admin/pages/offers/OffersListPage';
import { ProjectDetailPage } from '@/admin/pages/projects/ProjectDetailPage';
import { ProjectsListPage } from '@/admin/pages/projects/ProjectsListPage';
import { RequestDetailPage } from '@/admin/pages/requests/RequestDetailPage';
import { RequestsListPage } from '@/admin/pages/requests/RequestsListPage';
import { ContactMessagesPage } from '@/admin/pages/ContactMessagesPage';
import { SEO } from './components/SEO';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Contact } from './components/sections/Contact.tsx';
import { Hero } from './components/sections/Hero.tsx';
import { Portfolio } from './components/sections/Portfolio.tsx';
import { Services } from './components/sections/Services.tsx';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { ScrollProgress } from './components/ui/ScrollProgress';

const MarketingHomePage = () => {
  return (
    <>
      <SEO />
      <div className="marketing-shell min-h-screen">
        <ScrollProgress />
        <AnimatedBackground />
        <CursorSpotlight />
        <Header />
        <main className="relative z-10 overflow-hidden">
          <Hero />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingHomePage />} />
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
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
