'use client';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import useConversation from '@hooks/useConversation';
import { useState } from 'react';
import { ImageDialog } from '@/components/imageDialog';
const Form = () => {
  const { conversationId } = useConversation();
  const [imageFiles, setImageFiles] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };

  // const handleUpload = (result: any) => {
  //   axios.post('/api/messages', {
  //     image: result.info.secure_url,
  //     conversationId: conversationId
  //   })
  // }

  return (
    <div
      className="
        fixed
        bottom-0
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-[83%]
      "
    >
      <ImageDialog
        name="images"
        maxFiles={8}
        customButton={<HiPhoto size={30} className="text-sky-500" />}
        maxSize={1024 * 1024 * 4}
        files={imageFiles}
        setFiles={setImageFiles}
        disabled={false}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />

        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
