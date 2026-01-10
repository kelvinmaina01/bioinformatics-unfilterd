import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Users, Settings, DollarSign } from 'lucide-react';

export default function AdminDashboardLayout() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-24 pb-20 container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-2">
                        <h2 className="text-xl font-bold mb-6 px-4">Admin Panel</h2>

                        <SidebarLink to="/admin" icon={<LayoutDashboard />}>Overview</SidebarLink>
                        <SidebarLink to="/admin/events" icon={<Calendar />}>Events</SidebarLink>
                        <SidebarLink to="/admin/blogs" icon={<FileText />}>Blogs</SidebarLink>
                        <SidebarLink to="/admin/donations" icon={<DollarSign />}>Donations</SidebarLink>
                        <SidebarLink to="/admin/team" icon={<Users />}>Team</SidebarLink>
                        <SidebarLink to="/admin/settings" icon={<Settings />}>Settings</SidebarLink>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 min-h-[500px] border border-border rounded-xl p-6 bg-card/50">
                        <Outlet />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function SidebarLink({ to, icon, children }: { to: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <Link to={to}>
            <Button variant="ghost" className="w-full justify-start gap-2 mb-1">
                {icon}
                {children}
            </Button>
        </Link>
    )
}
