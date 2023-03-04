import { SearchAPI } from "@/api/api";
import {
  Button,
  Center,
  Flex,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { Search } from "tabler-icons-react";
import { useRouter } from "next/router";
export default function SearchBox({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      query: defaultValue || "",
      pageNumber: 1,
    },
  });

  return (
    <form
      className="w-full"
      onSubmit={form.onSubmit((values) => {
        const urlParams = new URLSearchParams({
          q: values.query,
          page: values.pageNumber.toString(),
        });
        router.push(`/search?${urlParams.toString()}`);
      })}
    >
      <Flex className="w-full " gap="lg">
        <TextInput
          placeholder="Search"
          className="w-full"
          radius="xl"
          size="lg"
          icon={<Search size={theme.fontSizes.lg} />}
          {...form.getInputProps("query")}
        />
        <Button radius="xl" size="lg" type="submit">
          Search
        </Button>
      </Flex>
    </form>
  );
}
