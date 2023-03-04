import { SingleWebsite } from "@/@types";
import { Card, Text } from "@mantine/core";
import ALink from "./ALink";
export default function SingleWebsiteCard({
  website,
}: {
  website: SingleWebsite;
}) {
  return (
    <article>
      <Card>
        <ALink
          className="text-blue-400 hover:underline visited:text-purple-600 text-xl"
          href={website.url}
        >
          {website.url}
        </ALink>
      </Card>
    </article>
  );
}
