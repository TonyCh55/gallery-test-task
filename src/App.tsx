import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useFetchImages } from "@/hooks";
import { DataContext } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const { images, error, fetchingState } = useFetchImages({ page });

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          currentPage: page,
          setCurrentPage: setPage,
          images,
          error,
          fetchingState,
        }}
      >
        <RouterProvider router={router} />
      </DataContext.Provider>
    </div>
  );
};

export default App;
