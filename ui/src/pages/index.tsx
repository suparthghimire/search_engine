import SearchBox from "@/components/SearchBox";
import { APP_NAME } from "@/utils/constants";
import { Center, Title } from "@mantine/core";
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
              {APP_NAME}
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
