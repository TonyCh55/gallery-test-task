import { useEffect, useState } from "react";
import { FetchingState, GalleryItem } from "../types";
import { makeUnique } from "@/utils";

interface Options {
  page?: number;
}

export const useFetchImages = (options: Options) => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchingState, setFetchingState] = useState(FetchingState.Idle);

  let url = `https://api.unsplash.com/photos/?client_id=${
    import.meta.env.VITE_IMAGES_API_KEY
  }&page=${options.page || 1}`;

  useEffect(() => {
    function fetchData() {
      setFetchingState(FetchingState.Loading);

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setImages(makeUnique([...images, ...data]));
          setFetchingState(FetchingState.Idle);
        })
        .catch((err) => {
          setError(err as Error);
          setFetchingState(FetchingState.Error);
        });
    }

    fetchData();
  }, [options.page]);

  return { images, error, fetchingState };
};
