/** @format */

import { Zoom } from '../ui/zoom-image';
import { ScrollArea } from '@components/ui/scroll-area';
import { ImageCus } from '../ui/ImageCus';
import { Button } from '@components/ui/button';
import { Icons } from '@/assets/Icons';

export const ImageListChat = ({ files, width, height, onDelete }) => {
  const handleDelete = (index) => {
    if (onDelete) {
      onDelete(index);
    }
  };

  return (
    <ScrollArea className="h-fit z-10 w-[90%] lg:w-[90%]">
      <div className="flex items-start">
        {files.map((file, i) => (
          <div key={i} className="relative flex flex-col items-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7 z-10"
              onClick={() => handleDelete(i)}
            >
              <Icons.close
                className="h-2 w-2 text-primary"
                aria-hidden="true"
              />
              <span className="sr-only">Remove file</span>
            </Button>
            <Zoom>
              <ImageCus
                src={file?.preview || file?.url}
                alt={file?.name}
                className={`h-${height} w-${width} shrink-0 rounded-md object-cover object-center`}
              />
            </Zoom>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
