import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import throttle from "lodash/throttle";

const scrollPositions: { [key: string]: number } = {};

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = throttle(() => {
      scrollPositions[location.key] = window.scrollY;
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [location.key]);

  useEffect(() => {
    const savedPosition = scrollPositions[location.key];
    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key]);

  return null;
}
