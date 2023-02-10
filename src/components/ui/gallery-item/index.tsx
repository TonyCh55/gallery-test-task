import { Link } from "react-router-dom";
import s from "./styles.module.scss";

interface GalleryItemProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  linkTo: string;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  linkTo,
  ...props
}) => (
  <Link className={s.imgWrapper} to={`/${linkTo}`} key={linkTo}>
    <img {...props} loading="lazy" />
  </Link>
);
