import Button from "../Button";
import { useState } from "react";
// components
import Icon from "../Icon";
// styles
import * as C from "./styles";

interface SearchBarProps {
  onSearch: (search: string) => void;
  clearSearch: () => void;
}

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
