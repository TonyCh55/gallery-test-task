import { useEffect, Dispatch, SetStateAction } from "react";

export function useClickOutside(
  ref: any,
  cb: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb(false);
      }
    }

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
}
