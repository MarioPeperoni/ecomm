import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  text: string;
}

export default function InfoCard({ title, icon, text }: InfoCardProps) {
  return (
    <Card>
      <CardHeader>
        {icon}
        <CardTitle className="text-lg leading-none">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
    </Card>
  );
}
