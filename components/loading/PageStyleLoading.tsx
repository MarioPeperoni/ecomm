import LoadingDots from "@/components/loading/LoadingDots";

const PageStyleLoading = ({ storeName }: { storeName: string }) => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <p className="text-2xl font-semibold">{storeName}</p>
      <p>Loading your store page, please hold on a moment...</p>
      <LoadingDots dotsStyle="w-4 h-4" containterStyle="mt-6" />
    </div>
  </div>
);

export default PageStyleLoading;
