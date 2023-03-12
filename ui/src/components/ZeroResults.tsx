import { TrimString } from "@/utils/helpers";
import React from "react";

export default function ZeroResults({ query }: { query: string }) {
  return (
    <div>
      <p>
        Your search - <span className="font-bold">{TrimString(query, 10)}</span>{" "}
        - did not bring any results
      </p>
    </div>
  );
}
