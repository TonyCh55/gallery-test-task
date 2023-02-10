import { createBrowserRouter } from "react-router-dom";

import { GalleryPage, ErrorPage, GalleryItemPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GalleryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:imageId",
    element: <GalleryItemPage />,
    errorElement: <ErrorPage />,
  },
]);
