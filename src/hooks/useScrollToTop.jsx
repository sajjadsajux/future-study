import React, { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Some browsers need a slight delay for smooth behavior
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);
};

export default useScrollToTop;
