import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { themes } from "../../styles/themes";

export default function MetricCard({ label, value }: any) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`p-5 rounded-xl ${themes[theme].card}`}
    >
      <p className="text-sm opacity-70">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${themes[theme].text}`}>
        {value}
      </h3>
    </motion.div>
  );
}
