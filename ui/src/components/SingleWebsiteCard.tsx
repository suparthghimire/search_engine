import { SingleWebsite } from "@/@types";
import { TrimString } from "@/utils/helpers";
import { Paper, Text, Box, Flex } from "@mantine/core";
import ALink from "./ALink";
export default function SingleWebsiteCard({
  website,
}: {
  website: SingleWebsite;
}) {
  return (
    <article className="w-full">
      <Paper shadow="sm" p="sm" withBorder>
        <div className="mb-0.5 text-sm text-neutral-400 truncate ...">
          {TrimString(website.url, 80)}
        </div>
        <ALink
          className="text-blue-400 hover:underline visited:text-purple-600"
          href={website.url}
        >
          <div className="text-xl">
            {TrimString(website.metadata.title || website.url, 80)}
          </div>
        </ALink>
        <p className="w-full h-[3.1rem] text-ellipsis overflow-hidden ...">
          {website.website_content}
        </p>
        <Flex wrap="wrap" mt="md" gap="sm">
          <ScoreComponent title="PR Score" score={website.rank} />
          <ScoreComponent
            title="Cosine Similarity Score"
            score={website.cosine_rank}
          />
          <ScoreComponent
            title="Weighted Sum Score"
            score={website.weighted_sum_rank}
          />
        </Flex>
      </Paper>
    </article>
  );
}

function ScoreComponent({ score, title }: { score: number; title: string }) {
  return (
    <Box
      p="sm"
      style={{
        border: "1px solid #5e5e5e",
        borderRadius: "0.5rem",
      }}
    >
      <p className="font-bold text-[1rem]">{title}</p>
      <p className="text-xs">{score}</p>
    </Box>
  );
}
