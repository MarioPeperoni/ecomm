import { DataTable } from "@/components/admin/DataTable";
import TagsColumns from "@/components/admin/tags/table/TagsTableColumns";

import { Plus } from "lucide-react";

import { TagExtended } from "@/types/storeExtended";

export default function TagsTable({ data }: { data: TagExtended[] }) {
  const columns = TagsColumns;
  return (
    <DataTable
      data={data}
      columns={columns}
      noDataComponent={<NoDataComponent />}
    />
  );
}

const NoDataComponent = () => (
  <div>
    <p className="text-muted-foreground">
      Your store does not have any configured tags
    </p>
    <p className="flex items-center justify-center text-center text-muted-foreground">
      Press &quot;
      <Plus className="size-5" />
      Add New&quot; button to create tag
    </p>
  </div>
);
