import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/admin/auth/RequireAuth';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { DashboardPage } from '@/admin/pages/DashboardPage';
import { LoginPage } from '@/admin/pages/LoginPage';
import { OfferDetailPage } from '@/admin/pages/offers/OfferDetailPage';
import { OffersListPage } from '@/admin/pages/offers/OffersListPage';
import { PublicOfferPage } from '@/pages/publicOffer/PublicOfferPage.tsx';
import { ProjectDetailPage } from '@/admin/pages/projects/ProjectDetailPage';
import { ProjectsListPage } from '@/admin/pages/projects/ProjectsListPage';
import { RequestDetailPage } from '@/admin/pages/requests/RequestDetailPage';
import { RequestsListPage } from '@/admin/pages/requests/RequestsListPage';
import { ContactMessagesPage } from '@/admin/pages/ContactMessagesPage';
import { SettingsPage } from '@/admin/pages/SettingsPage';
import { AppProviders } from '@/admin/providers/AppProviders';
import { LandingPage } from '@/pages/landing';

function App() {
    return (
        <AppProviders>
            <Routes>
                <Route path="/" element={<LandingPage />} />
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
