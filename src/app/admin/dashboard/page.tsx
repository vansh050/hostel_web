import { DashboardShell } from "@/components/DashboardShell";

export const metadata = {
  title: "Admin Dashboard · Lalpur Hostels",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <DashboardShell />;
}
