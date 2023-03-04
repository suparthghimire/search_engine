import React from "react";
import { GetServerSidePropsContext } from "next";
import { SearchAPI } from "@/api/api";
import Head from "next/head";
import { ReturnType, ErrorReturnType } from "@/@types";
import SearchBox from "@/components/SearchBox";
import { Container, Paper, Grid, Title, Divider, Flex } from "@mantine/core";
import SingleWebsiteCard from "@/components/SingleWebsiteCard";
export default function Search(props: ReturnType) {
  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <div>
        {"error" in props ? (
          <h1>{props.error}</h1>
        ) : (
          <Paper p="lg">
            <Grid align="center">
              <Grid.Col span={"content"}>
                <Title>SE</Title>
              </Grid.Col>
              <Grid.Col span={8}>
                <SearchBox defaultValue={props.data.query} />
              </Grid.Col>
            </Grid>
            <Divider my="lg" />
            <div>
              <div>
                Search Results for{" "}
                <span className="font-bold italic">{props.data.query}</span>
              </div>
              <Flex direction="column" gap="lg">
                {props.data.websites.map((ws, idx) => {
                  return (
                    <SingleWebsiteCard key={ws._id + "-" + idx} website={ws} />
                  );
                })}
              </Flex>
            </div>
          </Paper>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { q, page } = context.query;
  if (!q || !page) return { props: {} };
  const data = await SearchAPI(q.toString(), page.toString());
  return {
    props: data,
  };
}
