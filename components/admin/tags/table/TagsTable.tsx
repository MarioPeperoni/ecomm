import { DataTable } from "@/components/admin/DataTable";
import TagsColumns from "@/components/admin/tags/table/TagsTableColumns";

import { TagExtended } from "@/types/storeExtended";

export default function TagsTable({ data }: { data: TagExtended[] }) {
  const columns = TagsColumns;
  return <DataTable data={data} columns={columns} />;
}
