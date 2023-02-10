import { DataContext } from "@/store";
import {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FetchingState, GalleryItem } from "@/types";
import { Preloader, ErrorMessage, ButtonIcon } from "@/components";
import { useClickOutside } from "@/hooks";
import { download } from "./utils";
import clsx from "clsx";
import s from "./styles.module.scss";

export const GalleryItemPage = () => {
  const navigate = useNavigate();
  const { images, error, fetchingState } = useContext(DataContext);
  const { imageId } = useParams();

  const [show, setShow] = useState(false);

  const chooseResolutionBtnRef = useRef(null);
  useClickOutside(chooseResolutionBtnRef, setShow);

  const [currentItem, setCurrentItem] = useState<GalleryItem | undefined>(
    undefined
  );

  const item = useMemo(
    () => images.find((el) => el.id === imageId),
    [images, imageId]
  );

  useEffect(() => {
    setCurrentItem(item);
  });

  const currentItemIndex = useMemo(
    () => images.indexOf(currentItem as GalleryItem),
    [currentItem?.id]
  );

  const goToPrevItem = useCallback(() => {
    if (currentItemIndex) {
      const prevItem = images.find((_, idx) => idx === currentItemIndex - 1);

      if (prevItem) {
        setCurrentItem(prevItem);

        return navigate(`/${prevItem.id}`);
      }
    }
  }, [currentItemIndex]);

  const goToNextItem = useCallback(() => {
    if (currentItemIndex >= 0) {
      const nextItem = images.find((_, idx) => idx === currentItemIndex + 1);

      if (nextItem) {
        setCurrentItem(nextItem);

        return navigate(`/${nextItem.id}`);
      }
    }
  }, [currentItemIndex]);

  const goHome = useCallback(() => navigate("/"), []);

  const resolutions = {
    small: { link: currentItem?.urls.small, resolution: "(640 x 960)" },
    medium: { link: currentItem?.urls.regular, resolution: "(1920 x 2880)" },
    large: { link: currentItem?.urls.raw, resolution: "(2400 x 3600)" },
    original: { link: currentItem?.urls.full, resolution: "(4000 x 6000)" },
  };

  const toggleDownloadMenu = useCallback(() => setShow((prev) => !prev), []);

  const downLoadSpecificResolution = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const size = (e.target as any).textContent
      .toLowerCase()
      .split(" ")[0] as keyof typeof resolutions;

    const neededResolution = resolutions[size].link as string;

    download(neededResolution);
  };

  function renderItem() {
    return currentItem ? (
      <div className={s.overlay}>
        <div className={s.container}>
          <div className={s.header}>
            <div className={s.author}>
              <img src={currentItem.user.profile_image.medium} />
              <span>{currentItem.user.name}</span>
            </div>

            <div className={s.downloadContainer}>
              <button
                type="button"
                onClick={() => download(currentItem.urls.full)}
                className={s.downloadBtn}
              >
                Download Free
              </button>
              <ButtonIcon
                ref={chooseResolutionBtnRef}
                icon="chevronDown"
                className={s.chevronBtn}
                onClick={() => setShow((prev) => !prev)}
              />

              <ul className={clsx(s.resolutions, show && s.resolutions_show)}>
                {Object.entries(resolutions).map((el) => {
                  const size = el[0];
                  const resolution = el[1].resolution;

                  return (
                    <li
                      key={size}
                      tabIndex={0}
                      onClick={downLoadSpecificResolution}
                    >
                      {size} {resolution}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={s.imgWrapper}>
            <img src={currentItem.urls.small} alt={currentItem.description} />
          </div>

          <div
            className={clsx(s.downloadContainer, s.downloadContainer_mobile)}
          >
            <button
              type="button"
              onClick={() => download(currentItem.urls.full)}
              className={s.downloadBtn}
            >
              Download Free
            </button>
            <ButtonIcon
              ref={chooseResolutionBtnRef}
              icon="chevronDown"
              className={s.chevronBtn}
              onClick={toggleDownloadMenu}
            />

            <ul className={clsx(s.resolutions, show && s.resolutions_show)}>
              {Object.entries(resolutions).map((el) => {
                const size = el[0];
                const resolution = el[1].resolution;

                return (
                  <li
                    key={size}
                    tabIndex={0}
                    onClick={downLoadSpecificResolution}
                  >
                    {size} {resolution}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={s.navBtnContainer}>
          <ButtonIcon
            icon="chevronLeft"
            onClick={goToPrevItem}
            className={s.leftIcon}
          />
          <ButtonIcon icon="cross" onClick={goHome} className={s.crossIcon} />
          <ButtonIcon
            icon="chevronRight"
            onClick={goToNextItem}
            className={s.rightIcon}
          />
        </div>
      </div>
    ) : (
      <div className={s.noDataPage}>
        Hm, seems this image hasn't been loaded yet :({" "}
        <button
          type="button"
          onClick={() => navigate("/")}
          className={s.exitButton}
        >
          Exit
        </button>
      </div>
    );
  }

  const renderOptions = {
    [FetchingState.Loading]: <Preloader />,
    [FetchingState.Error]: <ErrorMessage>{error?.message}</ErrorMessage>,
    [FetchingState.Idle]: renderItem(),
  };

  return renderOptions[fetchingState];
};
