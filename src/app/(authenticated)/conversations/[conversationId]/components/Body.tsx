/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

// import axios from 'axios';
// import { useEffect, useRef } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import useConversation from '@hooks/useConversation';
import MessageBox from './MessageBox';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import toast from 'react-hot-toast';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { ImageDialog } from '@/components/imageDialog';
import { z } from 'zod';
import { useImage } from '@/hooks/useImage';
import DialogCustom from '@/components/ui/dialogCustom';
import { Spinner } from '@nextui-org/react';
import { ImageListChat } from '@/components/imageList/ImageListChat';
import NewMessage from './NewMessage';

const Body = ({ session }) => {
  const [isUploading, setIsUploading] = useState(false);

  const [isSent, setIsSent] = useState(true);
  const [newMessage1, setNewMessage1] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const { onUploadImage } = useImage();
  const [formData, setFormData] = useState({
    images: null,
  });
  //Create ZodSchema
  const fileSchema = z.instanceof(File);
  const imageJSONSchema = z.object({
    id: z.string().min(1, 'Image must not be empty'),
    name: z.string().min(1, 'Image must not be empty'),
    url: z.string().min(1, 'Image must not be empty'),
  });
  const imageSchema = z.union([fileSchema, imageJSONSchema]);
  const formDataSchema = z.object({
    images: z.array(imageSchema),
  });
  const { conversationId } = useConversation();
  const queryClient = useQueryClient();
  const [lastToastId, setLastToastId] = useState<any>();
  // Getting conversationId from the query parameters
  const updateMessages = (newMessage) => {
    queryClient.setQueryData(['messages', conversationId], (prevData) => {
      if (prevData?.pages[0]) {
        const newData = {
          pages: [
            {
              messages: [...newMessage, ...prevData?.pages[0]?.messages],
              nextCursor: prevData.pages[0]?.nextCursor,
            },
            ...prevData.pages.slice(1),
          ],
        };

        return newData;
      }
      // Assume your data structure has a 'pages' array
    });
  };
  const fetchMessages = async ({ conversationId, cursor, pageSize }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/messages?conversationId=${conversationId}&cursor=${cursor}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    if (lastToastId) {
      toast.dismiss(lastToastId);
    }
  }, [lastToastId]);
  const { socket, isConnected } = useChatSocket({
    session,
    conversationId,
    callback: (data) => {
      //o day se handle message duoc gui toi
      queryClient.refetchQueries(['messages', conversationId]);
      setIsSent(true);
      // const i = toast.custom((t) => (
      //   <div
      //     className={`${
      //       t.visible
      //         ? "animate-appearance-in"
      //         : "animate-appearance-out duration-200"
      //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      //   >
      //     <div className="flex-1 w-0 p-4">
      //       <div className="flex items-start">
      //         <div className="flex-shrink-0 pt-0.5">
      //           <img
      //             className="h-10 w-10 rounded-full"
      //             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
      //             alt=""
      //           />
      //         </div>
      //         <div className="ml-3 flex-1">
      //           <p className="text-sm font-medium text-gray-900">You</p>
      //           <p className="mt-1 text-sm text-gray-500">Sent Successful!</p>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex border-l border-gray-200">
      //       <button
      //         onClick={() => toast.dismiss(t.id)}
      //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      //       >
      //         Close
      //       </button>
      //     </div>
      //   </div>
      // ));

      // setTimeout(() => {
      //   setLastToastId(i);
      // }, 2000);

      queryClient.refetchQueries(['conversations']);
      setTimeout(() => {
        setTemporaryMessages([]);
      }, 100);
      // khong duoc dung refetchQueries vi no se goi lai ham fetchMessages
      // dieu nay se fetch nhieu lan
    },
  });
  const useInfiniteMessagesQuery = (conversationId, pageSize) => {
    return useInfiniteQuery(
      ['messages', conversationId],
      ({ pageParam }) =>
        fetchMessages({ conversationId, cursor: pageParam, pageSize }),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || null,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
      }
    );
  };

  const pageSize = 8;
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteMessagesQuery(conversationId, pageSize);
  const [newMessage, setNewMessage] = useState('');
  const [temporaryMessages, setTemporaryMessages] = useState([]);
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    if (!newMessage && imageFiles.length === 0) return;

    // setMessages((messages) => [...messages, newMessage]);

    if (socket) {
      if (imageFiles.length > 0) {
        const validationResult = formDataSchema.safeParse(formData);
        if (validationResult.success) {
          setIsUploading(true);
          const formData1 = new FormData();
          imageFiles.forEach((file) => {
            formData1.append('images', file);
          });

          const response = await onUploadImage({
            formData: formData1,
            callback: () => {
              setFormData({
                images: null,
              });
              setImageFiles([]);
              setIsUploading(false);
            },
          });

          try {
            // Parse the JSON data into an array of objects
            const images = JSON.parse(response.uploadImages);

            // Iterate over the images array and emit a socket event for each image
            images.forEach((image) => {
              const newMessage = {
                content: 'Hình ảnh', // Assuming you want to send the image URL as content
                userId: session.user.id,
                conversationId,
                fileUrl: image.url, // Replace 'yourConversationId' with the actual conversation ID
              };
              const temporaryMessage = {
                id: temporaryMessages.length + 1, // Generate a unique ID for the temporary message
                content: 'Hình ảnh',
                userId: session.user.id,
                conversationId,
                fileUrl: image.url,
              };
              setTemporaryMessages([...temporaryMessages, temporaryMessage]);
              updateMessages([temporaryMessage]);
              // Emit the 'newMessage' event with the newMessage object
              socket.emit('newMessage', newMessage);
            });
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          // setIsUploading(false);
          // const temporaryMessage = {
          //   id: temporaryMessages.length + 1, // Generate a unique ID for the temporary message
          //   content: newMessage,
          //   userId: 4,
          //   conversationId,
          //   images: data,
          // };
          // setTemporaryMessages([...temporaryMessages, temporaryMessage]);
          // socket.emit('newMessage', {
          //   content: newMessage,
          //   userId: 4,
          //   conversationId,
          //   images: data,
          // });
          setImageFiles([]);
        }
      }
      if (newMessage) {
        const temporaryMessage = {
          id: temporaryMessages.length + 1, // Generate a unique ID for the temporary message
          content: newMessage,
          userId: session.user.id,
          conversationId,
          createdAt: new Date().toISOString(), //it will be like: 2021-08-31T07:00:00.000Z
        };
        setTemporaryMessages([...temporaryMessages, temporaryMessage]);
        updateMessages([temporaryMessage]);
        socket.emit('newMessage', {
          content: newMessage,
          userId: session.user.id,
          conversationId,
        });

        setNewMessage('');
      }
    }
  };
  const handleDelete = (index) => {
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);
  };
  const handleImagesChange = () => {
    setFormData({ ...formData, images: imageFiles });
  };
  return (
    <div className=" overflow-hidden">
      {isUploading ? (
        <DialogCustom
          className="w-[60%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={isUploading}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <Spinner size="lg" />
            <div className="text-center font-semibold text-xs sm:text-sm">
              Upload Image...
            </div>
          </div>
        </DialogCustom>
      ) : null}
      {/* <div>
        <Button
          onClick={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        >
          load more
        </Button>
        <SocketIndicator isConnected={isConnected} />
      </div> */}
      <div className="w-full h-[75%]">
        <div
          id="scrollableDiv"
          className="h-[650px] lg:h-[550px] w-full overflow-y-auto flex flex-col-reverse"
        >
          <InfiniteScroll
            dataLength={
              data
                ? data.pages.reduce(
                    (acc, page) => acc + page.messages.length,
                    0
                  ) + 1
                : 0
            }
            next={() => {
              fetchNextPage();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
            inverse={true}
            hasMore={hasNextPage || false}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {/* {temporaryMessages
              .slice() // Create a shallow copy to avoid modifying the original array
              .reverse() // Reverse the order
              .map((message) => (
                <NewMessage key={message.id} data={message} />
              ))} */}
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.messages.map((message) => (
                  <MessageBox
                    isLast={index === page.messages.length - 1}
                    key={message.id}
                    data={message}
                  />
                ))}
              </React.Fragment>
            ))}
          </InfiniteScroll>
        </div>
      </div>

      <div
        className="
        fixed
        bottom-0
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        flex-col
        items-center 
        gap-2 
        lg:gap-4 
        w-full
        z-1000 
      "
      >
        {imageFiles?.length ? (
          <ImageListChat
            files={imageFiles}
            height={16}
            width={16}
            onDelete={handleDelete}
          />
        ) : null}
        <div className="flex items-center flex-row w-full">
          <div className="flex items-center gap-2 lg:gap-4 w-full ">
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Type a message..."
              className="
          text-black
          font-light
          py-1
          px-4
          bg-neutral-100 
          w-[90%] lg:w-[75%] 
          rounded-full
          focus:outline-none
        "
            />

            <button
              type="button"
              onClick={handleSendMessage}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
