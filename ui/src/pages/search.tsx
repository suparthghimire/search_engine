import React from "react";
import { GetServerSidePropsContext } from "next";
import { MarkDownAPI, SearchAPI } from "@/api/api";
import Head from "next/head";
import { SearchReturnType, MarkdownReturnType } from "@/@types";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import {
  Container,
  Paper,
  Grid,
  Title,
  Divider,
  Flex,
  Box,
} from "@mantine/core";
import SingleWebsiteCard from "@/components/SingleWebsiteCard";
import { APP_NAME } from "@/utils/constants";
import ProjectInfoMdViewer from "@/components/ProjectInfoMdViewer";
import ZeroResults from "@/components/ZeroResults";
export default function Search(props: {
  search: SearchReturnType;
  markdown: MarkdownReturnType;
}) {
  console.log(props);
  return (
    <>
      <Head>
        <title>
          Search Results - {"error" in props.search ? "" : props.search.query}
        </title>
      </Head>
      <>
        {"error" in props.search ? (
          <h1>{props.search.error}</h1>
        ) : (
          <>
            <Paper p="lg">
              <Flex align="center" gap="lg" className="max-w-[1200px]">
                  <Link href="/">
                  <Title>{APP_NAME}</Title>
                  </Link>
                <SearchBox defaultValue={props.search.query} />
              </Flex>
              <Divider my="lg" />
              <div>
                <Box py="sm">
                  About {props.search.total_websites} results {"("}
                  {props.search.time_taken} seconds{")"}
                </Box>
                {/* <Flex gap="lg"> */}
                <Flex direction="column" gap="lg" className="max-w-[1200px]">
                  {props.search.websites.length <= 0 ? (
                    <ZeroResults query={props.search.query} />
                  ) : (
                    <>
                      {props.search.websites.map((ws, idx) => {
                        return (
                          <SingleWebsiteCard
                            key={ws._id + "-" + idx}
                            website={ws}
                          />
                        );
                      })}
                    </>
                  )}
                </Flex>
                {/* {"error" in props.markdown ? (
                    <h1>{props.markdown.error}</h1>
                  ) : (
                    <Paper radius="md" p="lg" className="border h-fit w-full">
                      <ProjectInfoMdViewer md={props.markdown.content} />
                    </Paper>
                  )} */}
                {/* </Flex> */}
              </div>
            </Paper>
          </>
        )}
      </>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { q, page } = context.query;
  if (!q || !page) return { props: {} };
  const searchPromise = SearchAPI(q.toString(), page.toString());
  const markdownPromise = MarkDownAPI();

  const [search, markdown] = await Promise.all([
    searchPromise,
    markdownPromise,
  ]);

  return {
    props: { search, markdown },
  };
}
