"use client";

import type { IEvent } from "./interfaces";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useCalendar } from "../../../contexts/calendar/calendar-context";
import { useDragDrop } from "@/hooks/use-drag-drop";

export function EventUpdateHandler() {
  const { setOnEventDropped } = useDragDrop();
  const { updateEvent } = useCalendar();

  const handleEventUpdate = useCallback(
    (event: IEvent, newStartDate: Date, newEndDate: Date) => {
      try {
        const updatedEvent = {
          ...event,
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        };

        updateEvent(updatedEvent);
        toast.success("Event updated successfully");
      } catch {
        toast.error("Failed to update event");
      }
    },
    [updateEvent],
  );

  useEffect(() => {
    setOnEventDropped(handleEventUpdate);
  }, [setOnEventDropped, handleEventUpdate]);

  return null;
}
