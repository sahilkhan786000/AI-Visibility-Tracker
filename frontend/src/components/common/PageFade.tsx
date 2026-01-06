import { motion, easeOut, easeInOut } from "framer-motion";

import { useTheme } from "../../context/ThemeContext";

export function PageFade({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

const transition =
  theme === "space"
    ? { duration: 0.6, ease: easeOut }
    : { duration: 0.45, ease: easeInOut };


  const initialY = theme === "space" ? 20 : 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
