export interface Photo {
  id: string;
  alt_description: string;
  description: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  blur_hash: string;
}

export interface PhotosResponse {
  results: Photo[];
}

export interface PhotosParameters {
  query: string;
  per_page: number;
  orientation: string;
}
