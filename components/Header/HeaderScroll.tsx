"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const HeaderScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current < 10 || current < previous) {
      setHidden(false);
    } else if (current > previous && current > 100) {
      setHidden(true);
    }
  });

  return (
    <motion.div
      className="sticky top-0 z-50"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default HeaderScroll;