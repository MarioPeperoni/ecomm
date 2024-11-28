import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function AdminDashboardLoading() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-background">
      <LoadingSpinner size={50} />
    </main>
  );
}
