import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface DashboardTitleProps {
  title: string;
  subtitle: string;
  component?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

const DashHeader = ({
  title,
  subtitle,
  component,
  breadcrumb,
}: DashboardTitleProps) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2 p-8 pb-0 pt-6">
        <div className="flex flex-col">
          {breadcrumb}
          <div className={cn(breadcrumb && "mt-2")}>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div>{component}</div>
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default DashHeader;
