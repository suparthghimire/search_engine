import SearchBox from "@/components/SearchBox";
import { Center, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <main className="grid h-screen">
        <Center px="md">
          <div>
            <Title py="lg" align="center">
              Search Information in .np Websites
            </Title>
            <div className="w-[75vw] min-w-[390px]">
              <SearchBox />
            </div>
          </div>
        </Center>
      </main>
    </>
  );
}
