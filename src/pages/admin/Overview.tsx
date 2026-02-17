import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverview() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Cockpit Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Users" value="1,234" />
                <StatCard title="Active Events" value="5" />
                <StatCard title="Published Blogs" value="12" />
            </div>

            <div className="bg-muted/30 p-8 rounded-xl border border-dashed border-border text-center">
                <p className="text-muted-foreground">Select a category from the sidebar to manage content.</p>
            </div>
        </div>
    )
}

function StatCard({ title, value }: { title: string, value: string }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
