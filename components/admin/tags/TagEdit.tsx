import { Dispatch, SetStateAction, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import { TagExtended } from "@/types/storeExtended";

export default function TagEdit({
  tagGroup,
  tagName,
  form,
  setState,
  disabled,
}: {
  tagGroup: TagExtended | null;
  tagName: string | null;
  form: any;
  setState: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}) {
  const [newTagName, setNewTagName] = useState(tagName || "");

  const addTag = () => {
    if (newTagName.trim()) {
      //Add tag to form
      if (!form.getValues("tags").includes(newTagName.trim())) {
        form.setValue("tags", [...form.getValues("tags"), newTagName.trim()]);
        setNewTagName("");
        setState(false);
      }
    }
  };

  const editTag = () => {
    if (newTagName.trim()) {
      // Edit tag in tagGroup object
      if (tagGroup) {
        tagGroup.Tags = tagGroup.Tags.map((tag) =>
          tag.name === tagName ? { ...tag, name: newTagName.trim() } : tag,
        );
      }

      // Edit tag in form
      if (!form.getValues("tags").includes(newTagName.trim())) {
        form.setValue(
          "tags",
          form
            .getValues("tags")
            .map((tag: string) => (tag === tagName ? newTagName.trim() : tag)),
        );
        setNewTagName("");
        setState(false);
      }

      // Cancel editing if name has not changed
      if (tagName === newTagName.trim()) {
        setState(false);
      }
    }
  };

  const handleInput = () => {
    if (disabled) return;
    // Check if adding new or editing
    if (tagName) {
      editTag();
    } else {
      addTag();
    }
  };

  return (
    <Badge className="items-centers p-2 px-4" variant={"outline"}>
      <div className="">
        <input
          className="h-full w-8 border-primary font-normal ring-primary"
          placeholder="Tag name"
          style={{
            width: `${newTagName.length < 1 ? 9 : newTagName.length + 2}ch`,
          }}
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInput();
            }
          }}
          disabled={disabled}
        />
      </div>

      <p
        className={cn(
          "ml-2 font-bold text-primary hover:cursor-pointer",
          disabled && "text-muted-foreground",
        )}
        onClick={handleInput}
      >
        Enter
      </p>
    </Badge>
  );
}
