import s from "./styles.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Container: React.FC<Props> = ({ children }) => (
  <div className={s.container}>{children}</div>
);
