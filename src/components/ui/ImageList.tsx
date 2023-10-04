/** @format */

import { Zoom } from '@components/ui/zoom-image';
import { ScrollArea } from '@components/ui/scroll-area';
import { ImageCus } from '@components/ui/ImageCus';
export const ImageList = ({ files, width, height }) => {
  return (
    <ScrollArea className="h-72">
      <div className="flex items-center gap-2 flex-wrap">
        {files.map((file, i) => {
          return (
            <Zoom key={i}>
              <ImageCus
                src={file?.preview}
                alt={file?.name}
                className={`h-${height} w-${width} shrink-0 rounded-md object-cover object-center`}
              />
            </Zoom>
          );
        })}
      </div>
    </ScrollArea>
  );
};
