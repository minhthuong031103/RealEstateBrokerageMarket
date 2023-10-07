import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const datSchema = z.object({});

export const DatForm = () => {
  const form = useForm<z.infer<typeof datSchema>>({});
  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nhập email của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
