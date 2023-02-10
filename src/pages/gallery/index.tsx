import { useContext } from "react";
import { FetchingState } from "@/types";
import { Preloader, ErrorMessage, GalleryItem } from "@/components";
import { DataContext } from "@/store";
import InfiniteScroll from "react-infinite-scroll-component";
import s from "./styles.module.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export const GalleryPage: React.FC = () => {
  const { currentPage, setCurrentPage, images, error, fetchingState } =
    useContext(DataContext);

  const renderStatus = {
    [FetchingState.Loading]: <Preloader />,
    [FetchingState.Error]: <ErrorMessage>{error?.message}</ErrorMessage>,
    [FetchingState.Idle]: <></>,
  };

  const fetchNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <>
      {renderStatus[fetchingState]}

      <InfiniteScroll
        dataLength={images.length}
        next={fetchNext}
        hasMore
        scrollThreshold={0.85}
        loader={<></>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
          <Masonry className={s.images}>
            {images.map((el) => (
              <GalleryItem
                linkTo={el.id}
                key={el.id + currentPage}
                src={el.urls.small}
                alt={el.description}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </>
  );
};
