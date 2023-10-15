'use client';

import toast from 'react-hot-toast';

import { UploadDropzone } from '@/lib/uploadthing';
// import { ourFileRouter } from '@/app/api/uploadthing/core';

interface VideoUploadProps {
  onChange: (url?: string) => void;
  endpoint: any;
}

export const VideoUploadInput = ({ onChange, endpoint }: VideoUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
