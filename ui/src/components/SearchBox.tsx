import { TextInput, useMantineTheme } from "@mantine/core";
import React from "react";
import { Search } from "tabler-icons-react";

export default function SearchBox() {
  const theme = useMantineTheme();
  return (
    <TextInput
      placeholder="Search"
      className="w-full"
      radius="xl"
      size="lg"
      icon={<Search size={theme.fontSizes.lg} />}
    />
  );
}
