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
}

export interface PhotosResponse {
  results: Photo[];
}
