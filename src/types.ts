export type FetchObject = {
  next_page: string;
  page: number;
  per_page: number;
  photos: [
    {
      [k: string]: {
        avg_color: string;
        height: number;
        id: number;
        liked: boolean;
        photographer: string;
        photographer_id: number;
        photographer_url: string;
        original: string;
        large: string;
      };
    }
  ];
  total_results: number;
};
