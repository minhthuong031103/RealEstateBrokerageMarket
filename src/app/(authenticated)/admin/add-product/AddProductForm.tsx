'use client';
import { Button } from '@/components/new-york/button';
import { Input } from '@/components/new-york/input';
import { Label } from '@/components/new-york/label';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FileDialog } from './FileDialog';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { type FileWithPath } from 'react-dropzone';

import { generateReactHelpers } from '@uploadthing/react/hooks';
import { Zoom } from '@/components/new-york/zoom-image';
import Image from 'next/image';
import { Textarea } from '@/components/new-york/text-area';
type FileWithPreview = FileWithPath & {
  preview: string;
};
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

function AddProductForm() {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [thumbnail, setThumbnail] = React.useState<FileWithPreview[]>([]);
  const { isUploading, startUpload } = useUploadThing('imageUploader');
  console.log(files);
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const images = await startUpload([...thumbnail, ...files]).then((res) => {
      const formattedImages = res?.map((image) => ({
        id: image.key,
        name: image.key.split('_')[1] ?? image.key,
        url: image.url,
      }));
      return formattedImages ?? null;
    });

    console.log(images);

    await fetch('/api/admin/product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        price: parseInt(data.price),
        image: [...images],
        thumbnail: images?.[0],
      }),
    });
  };
  return (
    <div className="grid w-full max-w-2xl gap-5">
      <div className="space-y-2 flex flex-col">
        <Label>Name</Label>
        <Controller
          control={control}
          defaultValue={''}
          name={'name'}
          render={({ field }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter product name"
              />
            );
          }}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label>Price</Label>
        <Controller
          control={control}
          defaultValue={''}
          name={'price'}
          render={({ field }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter product price"
              />
            );
          }}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label>Description</Label>
        <Controller
          control={control}
          defaultValue={''}
          name={'description'}
          render={({ field }) => {
            return (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter product description"
              />
            );
          }}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label>Image</Label>
        {files?.length ? (
          <div className="flex items-center gap-2">
            {files.map((file, i) => (
              <Zoom key={i}>
                <Image
                  src={file.preview}
                  alt={file.name}
                  className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                  width={80}
                  height={80}
                />
              </Zoom>
            ))}
          </div>
        ) : null}
        <Controller
          defaultValue={''}
          name={'image'}
          control={control}
          render={({ field }) => {
            return (
              <FileDialog
                setValue={field.onChange}
                name="images"
                maxFiles={8}
                maxSize={1024 * 1024 * 4}
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
                disabled={false}
              />
            );
          }}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label>Thumbnail</Label>
        {thumbnail?.length ? (
          <div className="flex items-center gap-2">
            {thumbnail.map((file, i) => (
              <Zoom key={i}>
                <Image
                  src={file.preview}
                  alt={file.name}
                  className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                  width={80}
                  height={80}
                />
              </Zoom>
            ))}
          </div>
        ) : null}

        <Controller
          defaultValue={''}
          name={'thumbnail'}
          control={control}
          render={({ field }) => {
            return (
              <FileDialog
                setValue={field.onChange}
                name="images"
                maxFiles={1}
                maxSize={1024 * 1024 * 4}
                files={thumbnail}
                setFiles={setThumbnail}
                isUploading={isUploading}
                disabled={false}
              />
            );
          }}
        />
      </div>

      <Button
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
        className="mt-20"
      >
        Add product
      </Button>
    </div>
  );
}

export default AddProductForm;
