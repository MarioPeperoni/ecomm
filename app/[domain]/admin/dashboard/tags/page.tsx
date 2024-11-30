import getTags from "@/data/tag";

import DashHeader from "@/components/admin/dashboard/DashHeader";
import AddNewDialog from "@/components/admin/AddNewButton";
import TagAEDialogContent from "@/components/admin/tags/TagAEDialogContent";
import TagsTable from "@/components/admin/tags/table/TagsTable";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <>
      <DashHeader
        title={"Tags"}
        subtitle={"Menage your tags"}
        component={<AddNewDialog DialogContent={TagAEDialogContent} />}
      />
      <section className="mx-2 space-y-2">
        <TagsTable data={tags} />
      </section>
    </>
  );
}
