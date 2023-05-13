import Button from "../Button";
import { useState } from "react";
// components
import Icon from "../Icon";
// interfaces
import { SearchBarProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function SearchBar({
  onSearch,
  clearSearch,
}: SearchBarProps) {
  const [search, setSearch] =
    useState("");
  return (
    <C.Search>
      <div>
        {search.length > 0 && (
          <Icon
            name="delete"
            width={20}
            height={20}
            onClick={() => {
              setSearch("");
              clearSearch();
            }}
          />
        )}
        <input
          type="text"
          placeholder="Search Pokemon By Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(search);
            }
          }}
        />
      </div>
      <Button
        search
        onClick={() => {
          onSearch(search);
        }}
      >
        Search
      </Button>
    </C.Search>
  );
}
