import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CreateStoreFrom } from "@/components/form/CreateStoreForm";

export default function CreateStoreCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your store</CardTitle>
        <CardDescription>
          To get started with your store we need some things from you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateStoreFrom />
      </CardContent>
    </Card>
  );
}
