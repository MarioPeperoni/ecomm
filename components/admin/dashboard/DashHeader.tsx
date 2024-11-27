import { Separator } from "@/components/ui/separator";

interface DashboardTitleProps {
  title: string;
  subtitle: string;
}

const DashHeader = ({ title, subtitle }: DashboardTitleProps) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2 p-8 pb-0 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default DashHeader;
