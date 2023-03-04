export type ReturnType = SuccessReturnType | ErrorReturnType;

export type ErrorReturnType = {
  error: string;
};

export type SingleWebsite = {
  _id: string;
  rank: number;
  url: string;
};
export type SuccessReturnType = {
  data: {
    prevPageNo: number | null;
    nextPageNo: number | null;
    query: string;
    websites: Array<SingleWebsite>;
  };
};
