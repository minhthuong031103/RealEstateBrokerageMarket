"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { IoLocationOutline } from "react-icons/io5";
import {
  CaretSortIcon,
  CheckIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

const types = [
  { label: "Căn hộ", value: "1" },
  { label: "Nhà ở", value: "2" },
  { label: "Văn phòng", value: "3" },
  { label: "Đất đai", value: "4" },
] as const;

const branches = [
  { label: "Thông thường", value: "1" },
  { label: "Yêu thích", value: "2" },
  { label: "Nổi bật", value: "3" },
] as const;

const isRents = [
  { label: "Cho thuê", value: "true" },
  { label: "Cần bán", value: "false" },
] as const;

const loaiCanHos = [
  { label: "Chung cư", value: "1" },
  { label: "Duplex", value: "2" },
  { label: "Penthouse", value: "3" },
] as const;

const loaiNhaOs = [
  { label: "Mặt phố", value: "1" },
  { label: "Ngỏ hẻm", value: "2" },
  { label: "Biệt thự", value: "3" },
] as const;

const loaiVanPhongs = [
  { label: "Văn phòng", value: "1" },
  { label: "Mặt bằng kinh doanh", value: "2" },
  { label: "Shophouse", value: "3" },
  { label: "Officetel", value: "4" },
] as const;

const loaiDatDais = [
  { label: "Thổ cư", value: "1" },
  { label: "Nền dự án", value: "2" },
  { label: "Công nghiệp", value: "3" },
  { label: "Nông nghiệp", value: "4" },
] as const;

const huongs = [
  { label: "Đông", value: "Đông" },
  { label: "Tây", value: "Tây" },
  { label: "Nam", value: "Nam" },
  { label: "Bắc", value: "Bắc" },
  { label: "Đông Bắc", value: "Đông Bắc" },
  { label: "Đông Nam", value: "Đông Nam" },
  { label: "Tây Bắc", value: "Tây Bắc" },
  { label: "Tây Nam", value: "Tây Nam" },
] as const;

const soPhongs = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "Nhiều hơn 6", value: "+" },
] as const;

const formSchema = z.object({
  searchWord: z.string({}),
  location: z.string({}),
  type: z.string({}),
  branch: z.string({}),
  isRent: z.string({}),
  loaiCanHo: z.string({}),
  loaiNhaO: z.string({}),
  loaiVanPhong: z.string({}),
  loaiDatDai: z.string({}),
  huongBanCong: z.string({}),
  huongCuaChinh: z.string({}),
  huongDat: z.string({}),
  soPhongNgu: z.string({}),
  soPhongTam: z.string({}),
});
export function SearchComponent() {
  // 1. Define your form.
  const [typeNumber, setTypeNumber] = useState("0");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchWord: "",
      location: "",
      type: "",
      branch: "",
      isRent: "",
      loaiCanHo: "",
      loaiNhaO: "",
      loaiVanPhong: "",
      loaiDatDai: "",
      huongBanCong: "",
      huongCuaChinh: "",
      huongDat: "",
      soPhongNgu: "",
      soPhongTam: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="p-8 mr-8 rounded-xl bg-white border-[1px] shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="searchWord"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      className="h-[52px]"
                      placeholder="Nhập từ khóa"
                      {...field}
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 opacity-50 float-right -mt-9 mr-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      className="h-[52px] p-4"
                      placeholder="Vị trí"
                      {...field}
                    />
                    <IoLocationOutline className="h-6 w-6 opacity-50 float-right -mt-9 mr-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        size={"sm"}
                        className={cn(
                          "h-[52px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? types.find((type) => type.value === field.value)
                              ?.label
                          : "Loại bất động sản"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="hidden lg:block">
                    <Command>
                      <CommandGroup>
                        {types.map((type) => (
                          <CommandItem
                            className="h-[52px] w-full"
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("type", type.value);
                              setTypeNumber(type.value);
                            }}
                          >
                            {type.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isRent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        size={"sm"}
                        className={cn(
                          "h-[52px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? isRents.find(
                              (isRent) => isRent.value === field.value
                            )?.label
                          : "Hình thức"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="hidden lg:block">
                    <Command>
                      <CommandGroup>
                        {isRents.map((isRent) => (
                          <CommandItem
                            className="h-[52px] w-full"
                            value={isRent.label}
                            key={isRent.value}
                            onSelect={() => {
                              form.setValue("isRent", isRent.value);
                            }}
                          >
                            {isRent.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                isRent.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        size={"sm"}
                        className={cn(
                          "h-[52px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? branches.find(
                              (branch) => branch.value === field.value
                            )?.label
                          : "Nhãn"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="hidden lg:block">
                    <Command>
                      <CommandGroup>
                        {branches.map((branch) => (
                          <CommandItem
                            className="h-[52px] w-full"
                            value={branch.label}
                            key={branch.value}
                            onSelect={() => {
                              form.setValue("branch", branch.value);
                            }}
                          >
                            {branch.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                branch.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="ml-2">Lọc thêm</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {typeNumber === "1" ? (
                    <FormField
                      control={form.control}
                      name="loaiCanHo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? loaiCanHos.find(
                                        (loaiCanHo) =>
                                          loaiCanHo.value === field.value
                                      )?.label
                                    : "Loại căn hộ"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {loaiCanHos.map((loaiCanHo) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={loaiCanHo.label}
                                      key={loaiCanHo.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "loaiCanHo",
                                          loaiCanHo.value
                                        );
                                      }}
                                    >
                                      {loaiCanHo.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          loaiCanHo.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : typeNumber === "2" ? (
                    <FormField
                      control={form.control}
                      name="loaiNhaO"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? loaiNhaOs.find(
                                        (loaiNhaO) =>
                                          loaiNhaO.value === field.value
                                      )?.label
                                    : "Loại nhà ở"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {loaiNhaOs.map((loaiNhaO) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={loaiNhaO.label}
                                      key={loaiNhaO.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "loaiNhaO",
                                          loaiNhaO.value
                                        );
                                      }}
                                    >
                                      {loaiNhaO.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          loaiNhaO.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : typeNumber === "3" ? (
                    <FormField
                      control={form.control}
                      name="loaiVanPhong"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? loaiVanPhongs.find(
                                        (loaiVanPhong) =>
                                          loaiVanPhong.value === field.value
                                      )?.label
                                    : "Loại văn phòng"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {loaiVanPhongs.map((loaiVanPhong) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={loaiVanPhong.label}
                                      key={loaiVanPhong.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "loaiVanPhong",
                                          loaiVanPhong.value
                                        );
                                      }}
                                    >
                                      {loaiVanPhong.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          loaiVanPhong.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : typeNumber === "4" ? (
                    <FormField
                      control={form.control}
                      name="loaiDatDai"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? loaiDatDais.find(
                                        (loaiDatDai) =>
                                          loaiDatDai.value === field.value
                                      )?.label
                                    : "Loại đất đai"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {loaiDatDais.map((loaiDatDai) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={loaiDatDai.label}
                                      key={loaiDatDai.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "loaiDatDai",
                                          loaiDatDai.value
                                        );
                                      }}
                                    >
                                      {loaiDatDai.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          loaiDatDai.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                  {typeNumber === "1" ? (
                    <div>
                      <FormField
                        control={form.control}
                        name="huongBanCong"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    size={"sm"}
                                    className={cn(
                                      "h-[52px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? huongs.find(
                                          (huong) => huong.value === field.value
                                        )?.label
                                      : "Hướng ban công"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="hidden lg:block">
                                <Command>
                                  <CommandGroup>
                                    {huongs.map((huongBanCong) => (
                                      <CommandItem
                                        className="h-[52px] w-full"
                                        value={huongBanCong.label}
                                        key={huongBanCong.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "huongBanCong",
                                            huongBanCong.value
                                          );
                                        }}
                                      >
                                        {huongBanCong.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            huongBanCong.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="huongCuaChinh"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    size={"sm"}
                                    className={cn(
                                      "h-[52px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? huongs.find(
                                          (huong) => huong.value === field.value
                                        )?.label
                                      : "Hướng cửa chính"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="hidden lg:block">
                                <Command>
                                  <CommandGroup>
                                    {huongs.map((huongCuaChinh) => (
                                      <CommandItem
                                        className="h-[52px] w-full"
                                        value={huongCuaChinh.label}
                                        key={huongCuaChinh.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "huongCuaChinh",
                                            huongCuaChinh.value
                                          );
                                        }}
                                      >
                                        {huongCuaChinh.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            huongCuaChinh.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : typeNumber === "2" || typeNumber === "3" ? (
                    <FormField
                      control={form.control}
                      name="huongCuaChinh"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? huongs.find(
                                        (huong) => huong.value === field.value
                                      )?.label
                                    : "Hướng cửa chính"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {huongs.map((huongCuaChinh) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={huongCuaChinh.label}
                                      key={huongCuaChinh.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "huongCuaChinh",
                                          huongCuaChinh.value
                                        );
                                      }}
                                    >
                                      {huongCuaChinh.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          huongCuaChinh.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : typeNumber === "4" ? (
                    <FormField
                      control={form.control}
                      name="huongDat"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  size={"sm"}
                                  className={cn(
                                    "h-[52px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? huongs.find(
                                        (huong) => huong.value === field.value
                                      )?.label
                                    : "Hướng đất"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="hidden lg:block">
                              <Command>
                                <CommandGroup>
                                  {huongs.map((huongDat) => (
                                    <CommandItem
                                      className="h-[52px] w-full"
                                      value={huongDat.label}
                                      key={huongDat.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "huongDat",
                                          huongDat.value
                                        );
                                      }}
                                    >
                                      {huongDat.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          huongDat.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                  {typeNumber === "1" || typeNumber === "2" ? (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="soPhongNgu"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    size={"sm"}
                                    className={cn(
                                      "h-[52px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? soPhongs.find(
                                          (soPhong) =>
                                            soPhong.value === field.value
                                        )?.label
                                      : "Số phòng ngủ"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="hidden lg:block">
                                <Command>
                                  <CommandGroup>
                                    {soPhongs.map((soPhong) => (
                                      <CommandItem
                                        className="h-[52px] w-full"
                                        value={soPhong.label}
                                        key={soPhong.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "soPhongNgu",
                                            soPhong.value
                                          );
                                        }}
                                      >
                                        {soPhong.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            soPhong.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="soPhongTam"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    size={"sm"}
                                    className={cn(
                                      "h-[52px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? soPhongs.find(
                                          (soPhong) =>
                                            soPhong.value === field.value
                                        )?.label
                                      : "Số phòng tắm"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="hidden lg:block">
                                <Command>
                                  <CommandGroup>
                                    {soPhongs.map((soPhong) => (
                                      <CommandItem
                                        className="h-[52px] w-full"
                                        value={soPhong.label}
                                        key={soPhong.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "soPhongTam",
                                            soPhong.value
                                          );
                                        }}
                                      >
                                        {soPhong.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            soPhong.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="flex flex-row justify-between gap-x-4">
                    <FormField
                      control={form.control}
                      name="searchWord"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                type={"number"}
                                className="h-[52px]"
                                placeholder="Giá nhỏ nhất"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="searchWord"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                type={"number"}
                                className="h-[52px]"
                                placeholder="Giá cao nhất"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-x-4">
                    <FormField
                      control={form.control}
                      name="searchWord"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                type={"number"}
                                className="h-[52px]"
                                placeholder="Diện tích > m2"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="searchWord"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Input
                                type={"number"}
                                className="h-[52px]"
                                placeholder="Diện tích < m2"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button className="w-[90%] bg-red-400" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
