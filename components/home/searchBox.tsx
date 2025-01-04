"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import InputWithIndent from "@/components/ui/inputWithIndent";

import { SearchIcon } from "lucide-react";

export default function SearchBox() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  return (
    <InputWithIndent
      indentValue={<SearchIcon className="size-4 hover:cursor-pointer" />}
      placeholder="Search for stores"
      direction="right"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onIndentClick={() => router.push(`/explore?search=${searchValue}`)}
      indentClassName="hover:cursor-pointer"
    />
  );
}
