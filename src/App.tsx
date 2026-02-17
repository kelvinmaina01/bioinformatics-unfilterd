import { Toaster } from "@/components/ui/toaster";
import { AdminRoute } from "./components/AdminRoute";
import AdminDashboardLayout from "./pages/admin/DashboardLayout";
import AdminOverview from "./pages/admin/Overview";
import EventController from "./pages/admin/EventController";
import BlogController from "./pages/admin/BlogController";
import AdminDonations from "./pages/admin/Donations";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DatabaseSeeder } from "./components/DatabaseSeeder"; // Dev tool
import { CompleteProfileModal } from "./components/CompleteProfileModal";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Community from "./pages/Community";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Papers from "./pages/Papers";
import About from "./pages/About";
import SingleEvent from "./pages/SingleEvent";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import UsersList from "./pages/admin/UsersList";
import TeamManager from "./pages/admin/TeamManager";
import HonourCircle from "./pages/admin/HonourCircle";
import { ChatBot } from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> {/* Default theme set to dark */}
        <AuthProvider>
          <DatabaseSeeder />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main Application Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/community" element={<Community />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/papers" element={<Papers />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/events/:id" element={<SingleEvent />} />

              {/* Admin Dashboard Routes (Cockpit) */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboardLayout />
                </AdminRoute>
              }>
                <Route index element={<AdminOverview />} />
                <Route path="community" element={<UsersList />} />
                <Route path="events" element={<EventController />} />
                <Route path="blogs" element={<BlogController />} />
                <Route path="donations" element={<AdminDonations />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="honour-circle" element={<HonourCircle />} />
                <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
          <Toaster />
          <CompleteProfileModal />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
