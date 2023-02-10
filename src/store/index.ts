import { createContext } from "react";
import { FetchingState, GalleryItem } from "@/types";

interface Data {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  images: GalleryItem[];
  error: Error | null;
  fetchingState: FetchingState;
}

export const DataContext: React.Context<Data> = createContext({} as Data);
