/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { PickLocation } from '../../bat-dong-san/(components)/PickLocation';
import { useRouter } from 'next/navigation';

const types = [
  { label: 'Căn hộ', value: 'Căn hộ' },
  { label: 'Nhà ở', value: 'Nhà ở' },
  { label: 'Văn phòng', value: 'Văn phòng' },
  { label: 'Đất', value: 'Đất' },
] as const;

const isRents = [
  { label: 'Cho thuê', value: 'true' },
  { label: 'Đăng bán', value: 'false' },
] as const;

const formSchema = z.object({
  searchWord: z.string({}),
  type: z.string({}),
  isRent: z.string({}),
});

export function SearchBar() {
  const router = useRouter();
  const [addressValue, setAddressValue] = useState('');

  useEffect(() => {}, []);
  // 1. Define your form.
  const [typeNumber, setTypeNumber] = useState('0');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchWord: '',
      type: '',
      isRent: '',
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      `/bat-dong-san?tukhoa=${values.searchWord}&diachi=${addressValue}&loaibds=${values.type}&hinhthuc=${values.isRent}`
    );
  }
  return (
    <div className="flex justify-center">
      <div className="w-[80%] p-3 bg-[#ffffff36] rounded-md mt-6">
        <div className="rounded-md bg-white border-[1px] shadow-sm p-8 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:grid lg:grid-cols-5 lg:gap-2 space-y-4 lg:space-y-0"
            >
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
                                  type.value === 'Căn hộ'
                                    ? '1'
                                    : type.value === 'Nhà ở'
                                    ? '2'
                                    : type.value === 'Văn phòng'
                                    ? '3'
                                    : '4'
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
              <Button
                className="w-[90%] bg-red-400 hover:bg:text-white bg:bg-slate-800"
                type="submit"
              >
                Tìm kiếm
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
