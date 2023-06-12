import { useEffect } from "react";

const useOutsideListner = (ref, outsideClickHandler) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideClickHandler(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
export default useOutsideListner;
