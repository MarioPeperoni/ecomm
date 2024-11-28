import { Separator } from "@/components/ui/separator";

interface DashboardTitleProps {
  title: string;
  subtitle: string;
  component?: React.ReactNode;
}

const DashHeader = ({ title, subtitle, component }: DashboardTitleProps) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2 p-8 pb-0 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div>{component}</div>
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default DashHeader;
