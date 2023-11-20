"use client";

import { Button } from "@/components/ui/button";
import { Checkbox, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { searchType } from "./LayoutBatDongSan";
import { PickLocation } from "./PickLocation";
import { BiBuildingHouse, BiLabel, BiSolidLayerPlus } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { AiOutlineCompass } from "react-icons/ai";
import { TbBed } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";
import { RangeSelector } from "./RangeSelector";

const types = [
  { label: "Căn hộ", value: "Căn hộ" },
  { label: "Nhà ở", value: "Nhà ở" },
  { label: "Văn phòng", value: "Văn phòng" },
  { label: "Đất", value: "Đất" },
] as const;

const branches = [
  { label: "Thông thường", value: "Thông thường" },
  { label: "Yêu thích", value: "Yêu thích" },
  { label: "Nổi bật", value: "Nổi bật" },
] as const;

const isRents = [
  { label: "Cho thuê", value: "true" },
  { label: "Đăng bán", value: "false" },
] as const;

const loaiCanHos = [];

const loaiNhaOs = [];

const loaiVanPhongs = [];

const loaiDatDais = [];

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
type props = {
  setSearchProps: Dispatch<SetStateAction<searchType>>;
};

export function SearchComponent({ setSearchProps }: props) {
  const { fetchAllDanhMuc } = useBatDongSan();
  const [addressValue, setAddressValue] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000000]);
  const [squareRange, setSquareRange] = useState<number[]>([0, 5000]);
  const [addingFilter, setAddingFilter] = useState(false);

  useEffect(() => {
    const getBatDongSan = async () => {
      await fetchAllDanhMuc().then((data) => {
        data?.map((item) => {
          if (item?.id === 1) {
            //can ho
            item?.loaiHinhs?.map((itemChild) => {
              loaiCanHos.push({
                label: itemChild?.name,
                value: itemChild?.name,
              });
            });
          } else if (item?.id === 2) {
            //dat
            item?.loaiHinhs?.map((itemChild) => {
              loaiDatDais.push({
                label: itemChild?.name,
                value: itemChild?.name,
              });
            });
          } else if (item?.id === 3) {
            //nha o
            item?.loaiHinhs?.map((itemChild) => {
              loaiNhaOs.push({
                label: itemChild?.name,
                value: itemChild?.name,
              });
            });
          } else {
            //van phong
            item?.loaiHinhs?.map((itemChild) => {
              loaiVanPhongs.push({
                label: itemChild?.name,
                value: itemChild?.name,
              });
            });
          }
        });
      });
    };
    getBatDongSan();
  }, []);
  // 1. Define your form.
  const [typeNumber, setTypeNumber] = useState("0");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchWord: "",
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
    setSearchProps({
      searchWord: values.searchWord,
      location: addressValue,
      type: values.type,
      branch: values.branch,
      isRent: values.isRent,
      loaiCanHo: addingFilter === true ? values.loaiCanHo : "",
      loaiNhaO: addingFilter === true ? values.loaiNhaO : "",
      loaiVanPhong: addingFilter === true ? values.loaiVanPhong : "",
      loaiDatDai: addingFilter === true ? values.loaiDatDai : "",
      huongBanCong: addingFilter === true ? values.huongBanCong : "",
      huongCuaChinh: addingFilter === true ? values.huongCuaChinh : "",
      huongDat: addingFilter === true ? values.huongDat : "",
      soPhongNgu: addingFilter === true ? values.soPhongNgu : "",
      soPhongTam: addingFilter === true ? values.soPhongTam : "",
      minPrice: addingFilter === true ? priceRange[0].toString() : "",
      maxPrice: addingFilter === true ? priceRange[1].toString() : "",
      minSquare: addingFilter === true ? squareRange[0].toString() : "",
      maxSquare: addingFilter === true ? squareRange[1].toString() : "",
    });
  }
  return (
    <div className="p-8 mr-6 rounded-xl bg-white border-[1px] shadow-sm">
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
                      variant="bordered"
                      radius="sm"
                      label="Nhập từ khóa"
                      {...field}
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 opacity-50 float-right -mt-9 mr-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <PickLocation
              addressValue={addressValue}
              setAddressValue={setAddressValue}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <div className="mr-6">
                    <Select
                      label="Loại bất động sản"
                      className="h-[52px]"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      selectorIcon={<BiBuildingHouse />}
                      {...field}
                    >
                      {types.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          onClick={() => {
                            setTypeNumber(
                              type.value === "Căn hộ"
                                ? "1"
                                : type.value === "Nhà ở"
                                ? "2"
                                : type.value === "Văn phòng"
                                ? "3"
                                : "4"
                            );
                          }}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isRent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <div className="mr-6">
                    <Select
                      label="Hình thức"
                      className="h-[52px] w-[100%]"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      selectorIcon={<GiReceiveMoney />}
                      {...field}
                    >
                      {isRents.map((isRent) => (
                        <SelectItem key={isRent.value} value={isRent.value}>
                          {isRent.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <div className="mr-6">
                    <Select
                      label="Nhãn"
                      className="h-[52px]"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      selectorIcon={<BiLabel />}
                      {...field}
                    >
                      {branches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="ml-3 mr-3">
                <Checkbox
                  color="danger"
                  isSelected={addingFilter}
                  onValueChange={setAddingFilter}
                >
                  Lọc thêm
                </Checkbox>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {typeNumber === "1" ? (
                    <FormField
                      control={form.control}
                      name="loaiCanHo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <div className="mr-6">
                              <Select
                                label="Loại căn hộ"
                                className="h-[52px]"
                                variant="bordered"
                                radius="sm"
                                size="sm"
                                selectorIcon={<BsHouses />}
                                {...field}
                              >
                                {loaiCanHos.map((loaiCanHo, index) => (
                                  <SelectItem
                                    key={loaiCanHo?.value}
                                    value={loaiCanHo?.value}
                                    defaultChecked={index === 0}
                                  >
                                    {loaiCanHo?.value}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </FormControl>
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
                          <FormControl>
                            <div className="mr-6">
                              <Select
                                label="Loại nhà ở"
                                className="h-[52px]"
                                variant="bordered"
                                radius="sm"
                                size="sm"
                                selectorIcon={<BsHouses />}
                                {...field}
                              >
                                {loaiNhaOs.map((loaiNhaO, index) => (
                                  <SelectItem
                                    key={loaiNhaO?.value}
                                    value={loaiNhaO?.value}
                                    defaultChecked={index === 0}
                                  >
                                    {loaiNhaO?.value}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </FormControl>
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
                          <FormControl>
                            <div className="mr-6">
                              <Select
                                label="Loại văn phòng"
                                className="h-[52px]"
                                variant="bordered"
                                radius="sm"
                                size="sm"
                                selectorIcon={<HiOutlineOfficeBuilding />}
                                {...field}
                              >
                                {loaiVanPhongs.map((loaiVanPhong, index) => (
                                  <SelectItem
                                    key={loaiVanPhong?.value}
                                    value={loaiVanPhong?.value}
                                    defaultChecked={index === 0}
                                  >
                                    {loaiVanPhong?.value}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </FormControl>
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
                          <FormControl>
                            <div className="mr-6">
                              <Select
                                label="Loại đất đai"
                                className="h-[52px]"
                                variant="bordered"
                                radius="sm"
                                size="sm"
                                selectorIcon={<BiSolidLayerPlus />}
                                {...field}
                              >
                                {loaiDatDais.map((loaiDatDai, index) => (
                                  <SelectItem
                                    key={loaiDatDai?.value}
                                    value={loaiDatDai?.value}
                                    defaultChecked={index === 0}
                                  >
                                    {loaiDatDai?.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                  {typeNumber === "1" ? (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="huongBanCong"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormControl>
                              <div className="mr-6">
                                <Select
                                  label="Hướng ban công"
                                  className="h-[52px]"
                                  variant="bordered"
                                  radius="sm"
                                  size="sm"
                                  selectorIcon={<AiOutlineCompass />}
                                  {...field}
                                >
                                  {huongs.map((huong) => (
                                    <SelectItem
                                      key={huong?.value}
                                      value={huong?.value}
                                    >
                                      {huong?.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="huongCuaChinh"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormItem className="flex flex-col">
                              <FormControl>
                                <div className="mr-6">
                                  <Select
                                    label="Hướng cửa chính"
                                    className="h-[52px]"
                                    variant="bordered"
                                    radius="sm"
                                    size="sm"
                                    selectorIcon={<AiOutlineCompass />}
                                    {...field}
                                  >
                                    {huongs.map((huong) => (
                                      <SelectItem
                                        key={huong?.value}
                                        value={huong?.value}
                                      >
                                        {huong?.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
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
                          <FormItem className="flex flex-col">
                            <FormControl>
                              <div className="mr-6">
                                <Select
                                  label="Hướng cửa chính"
                                  className="h-[52px]"
                                  variant="bordered"
                                  radius="sm"
                                  size="sm"
                                  selectorIcon={<AiOutlineCompass />}
                                  {...field}
                                >
                                  {huongs.map((huong) => (
                                    <SelectItem
                                      key={huong?.value}
                                      value={huong?.value}
                                    >
                                      {huong?.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
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
                          <FormItem className="flex flex-col">
                            <FormControl>
                              <div className="mr-6">
                                <Select
                                  label="Hướng đất"
                                  className="h-[52px]"
                                  variant="bordered"
                                  radius="sm"
                                  size="sm"
                                  selectorIcon={<AiOutlineCompass />}
                                  {...field}
                                >
                                  {huongs.map((huong) => (
                                    <SelectItem
                                      key={huong?.value}
                                      value={huong?.value}
                                    >
                                      {huong?.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
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
                            <FormItem className="flex flex-col">
                              <FormControl>
                                <div className="mr-6">
                                  <Select
                                    label="Số phòng ngủ"
                                    className="h-[52px]"
                                    variant="bordered"
                                    radius="sm"
                                    size="sm"
                                    selectorIcon={<TbBed />}
                                    {...field}
                                  >
                                    {soPhongs.map((soPhong) => (
                                      <SelectItem
                                        key={soPhong?.value}
                                        value={soPhong?.value}
                                      >
                                        {soPhong?.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="soPhongTam"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormControl>
                              <div className="mr-6">
                                <Select
                                  label="Số phòng tắm"
                                  className="h-[52px]"
                                  variant="bordered"
                                  radius="sm"
                                  size="sm"
                                  selectorIcon={<PiBathtub />}
                                  {...field}
                                >
                                  {soPhongs.map((soPhong) => (
                                    <SelectItem
                                      key={soPhong?.value}
                                      value={soPhong?.value}
                                    >
                                      {soPhong?.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <RangeSelector
                    range={priceRange}
                    setRange={setPriceRange}
                    type={"Phạm vi giá thành"}
                  />
                  <RangeSelector
                    range={squareRange}
                    setRange={setSquareRange}
                    type={"Phạm vi diện tích"}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button className="w-[90%] bg-red-400" type="submit">
            Tìm kiếm
          </Button>
        </form>
      </Form>
    </div>
  );
}
