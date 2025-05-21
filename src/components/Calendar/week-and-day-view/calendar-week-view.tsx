import { startOfWeek, addDays, format, parseISO, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { useCalendar } from "../contexts/calendar-context";
import { fadeIn, staggerContainer, transition } from "../animations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddEditEventDialog } from "../dialogs/add-edit-event-dialog";
import { CalendarTimeline } from "../week-and-day-view/calendar-time-line";
import { WeekViewMultiDayEventsRow } from "../week-and-day-view/week-view-multi-day-events-row";
import { groupEvents } from "../helpers";
import type { IEvent } from "../interfaces";
import { RenderGroupedEvents } from "../week-and-day-view/render-grouped-events";
import { DroppableArea } from "../dnd/droppable-area";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarWeekView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, use24HourFormat } = useCalendar();

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={fadeIn} transition={transition}>
      <motion.div
        className="text-t-quaternary flex flex-col items-center justify-center border-b py-4 text-sm sm:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <p>תצוגה שבועית אינה זמינה במכשירים קטנים.</p>
        <p>אנא עבור לתצוגה יומית או חודשית.</p>
      </motion.div>

      <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
        <div>
          <WeekViewMultiDayEventsRow selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

          {/* Week header */}
          <motion.div className="relative z-20 flex border-b" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <div className="w-18"></div>
            <div className="grid flex-1 grid-cols-7 border-l">
              {weekDays.map((day, index) => (
                <motion.span
                  key={index}
                  className="text-t-quaternary py-2 text-center text-xs font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ...transition }}
                >
                  {format(day, "EE")} <span className="text-t-secondary ml-1 font-semibold">{format(day, "d")}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <ScrollArea className="h-[736px]" type="always">
          <div className="flex">
            {/* Hours column */}
            <motion.div className="relative w-18" variants={staggerContainer}>
              {hours.map((hour, index) => (
                <motion.div
                  key={hour}
                  className="relative"
                  style={{ height: "96px" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02, ...transition }}
                >
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && (
                      <span className="text-t-quaternary text-xs">{format(new Date().setHours(hour, 0, 0, 0), use24HourFormat ? "HH:00" : "h a")}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Week grid */}
            <motion.div className="relative flex-1 border-l" variants={staggerContainer}>
              <div className="grid grid-cols-7 divide-x">
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = singleDayEvents.filter((event) => isSameDay(parseISO(event.startDate), day) || isSameDay(parseISO(event.endDate), day));
                  const groupedEvents = groupEvents(dayEvents);

                  return (
                    <motion.div
                      key={dayIndex}
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: dayIndex * 0.1, ...transition }}
                    >
                      {hours.map((hour, index) => (
                        <motion.div
                          key={hour}
                          className="relative"
                          style={{ height: "96px" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.01, ...transition }}
                        >
                          {index !== 0 && <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>}

                          <DroppableArea date={day} hour={hour} minute={0} className="absolute inset-x-0 top-0 h-[48px]">
                            <AddEditEventDialog startDate={day} startTime={{ hour, minute: 0 }}>
                              <div className="hover:bg-secondary absolute inset-0 cursor-pointer transition-colors" />
                            </AddEditEventDialog>
                          </DroppableArea>

                          <div className="border-b-tertiary pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed"></div>

                          <DroppableArea date={day} hour={hour} minute={30} className="absolute inset-x-0 bottom-0 h-[48px]">
                            <AddEditEventDialog startDate={day} startTime={{ hour, minute: 30 }}>
                              <div className="hover:bg-secondary absolute inset-0 cursor-pointer transition-colors" />
                            </AddEditEventDialog>
                          </DroppableArea>
                        </motion.div>
                      ))}

                      <RenderGroupedEvents groupedEvents={groupedEvents} day={day} />
                    </motion.div>
                  );
                })}
              </div>

              <CalendarTimeline />
            </motion.div>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
