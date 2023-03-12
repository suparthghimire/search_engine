export type SearchReturnType = SuccessSearchReturnType | ErrorReturnType;
export type MarkdownReturnType = SuccessMarkdownReturnType | ErrorReturnType;

export type ErrorReturnType = {
  error: string;
};

export type SingleWebsite = {
  _id: string;
  rank: number;
  cosine_rank: number;
  weighted_sum_rank: number;
  url: string;
  website_content: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
};
export type SuccessSearchReturnType = {
  prevPageNo: number | null;
  nextPageNo: number | null;
  query: string;
  websites: Array<SingleWebsite>;
  total_websites: number;
  time_taken: number;
};
export type SuccessMarkdownReturnType = {
  content: string;
};
