"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BiFilter } from "react-icons/bi";

export function SearchSheetComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-red-400 float-right p-4 mt-auto mb-3 h-4"
          type="submit"
        >
          <BiFilter className="h-6 w-6 mr-4" />
          Lọc danh sách
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
}
