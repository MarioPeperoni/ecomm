import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
}

export default function StatCard({ title, icon: Icon, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="py-5">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Icon className="text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
