import { HostelLeadsShell } from "@/components/HostelLeadsShell";

export const metadata = {
  title: "Hostel Leads · Lalpur Admin",
  robots: { index: false, follow: false },
};

export default async function HostelLeadsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <HostelLeadsShell slug={slug} />;
}
