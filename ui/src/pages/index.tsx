import SearchBox from "@/components/SearchBox";
import { Button, Center } from "@mantine/core";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <main className="grid h-screen">
        <Center px="md">
          <div className="w-[75vw] min-w-[390px]">
            <SearchBox />
          </div>
        </Center>
      </main>
    </>
  );
}
