import s from "./styles.module.scss";

interface Props {
  children?: string;
}

export const ErrorMessage: React.FC<Props> = ({ children }) => (
  <div className={s.text}>{children}</div>
);
