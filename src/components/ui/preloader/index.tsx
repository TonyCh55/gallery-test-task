import s from "./styles.module.scss";

export const Preloader: React.FC = () => (
  <div className={s.wrapper}>
    <div className={s.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
