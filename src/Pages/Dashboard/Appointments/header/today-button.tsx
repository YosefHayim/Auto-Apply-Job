import { formatDate } from "date-fns";
import { motion } from "framer-motion";

import { useCalendar } from "../../../../contexts/calendar/calendar-context";
import { buttonHover, transition } from "../animations";

import { Button } from "@/components/ui/button";

const MotionButton = motion.create(Button);

export function TodayButton() {
  const { setSelectedDate } = useCalendar();

  const today = new Date();
  const handleClick = () => setSelectedDate(today);

  return (
    <MotionButton
      variant="outline"
      className="flex h-14 w-14 flex-col items-center justify-center p-0 text-center"
      onClick={handleClick}
      variants={buttonHover}
      whileHover="hover"
      whileTap="tap"
      transition={transition}
    >
      <motion.span
        className="bg-primary text-primary-foreground w-full py-1 text-xs font-semibold"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, ...transition }}
      >
        {formatDate(today, "MMM").toUpperCase()}
      </motion.span>
      <motion.span className="text-lg font-bold" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, ...transition }}>
        {today.getDate()}
      </motion.span>
    </MotionButton>
  );
}
