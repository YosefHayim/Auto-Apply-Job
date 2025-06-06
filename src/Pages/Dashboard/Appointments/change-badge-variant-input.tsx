"use client";

import { useCalendar } from "../../../contexts/calendar/calendar-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DotIcon, PaletteIcon } from "lucide-react";
import { MotionButton } from "./header/calendar-header";
import { buttonHover } from "./animations";

export function ChangeBadgeVariantInput() {
  const { badgeVariant, setBadgeVariant } = useCalendar();

  return (
    <div className="space-y-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <MotionButton
              variant="outline"
              size="icon"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setBadgeVariant(badgeVariant === "dot" ? "colored" : "dot")}
            >
              {badgeVariant === "dot" ? <DotIcon className="h-5 w-5" /> : <PaletteIcon className="h-5 w-5" />}
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent>Badge variant</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
