/** @format */

import { ScrollArea } from '@components/ui/scroll-area';
import { X } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
function DialogCustom({
  isModalOpen,
  onClose,
  children,
  className,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(isModalOpen);
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    // Example usage
    //scroll bar prevent body from moving
    function setScrollbarWidthProperty() {
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollbarWidth}px`
      );
    }
    window.addEventListener('resize', setScrollbarWidthProperty);
    // Call this function when your app loads
    setScrollbarWidthProperty();
    // Disable scrolling on the body when the dialog is open
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.classList.remove('no-scroll');
    };
  }, [isModalOpen]);

  // Use useEffect to handle isModalOpen changes
  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
    } else {
      handleClose();
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 120);
  };
  return (
    isVisible && (
      <div className="w-full h-full">
        `
        <div
          className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${
            isModalOpen ? `animate-in fade-in-0` : ''
          }  ${isClosing ? 'animate-out fade-out-0 ' : ''}
  `}
        ></div>
        `
        <div
          className={cn(
            `fixed left-[50%] top-[50%] z-50 max-w-full translate-x-[-50%] 
      translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 w-[90%] h-[90%]
       lg:w-[60%]   ${
         isModalOpen
           ? `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`
           : ''
       } ${
              isClosing
                ? 'animate-out fade-out-10 zoom-out-95 slide-out-to-left-1/2  slide-out-to-top-[48%] '
                : ''
            }
       `,
            className
          )}
        >
          <div className="h-full w-full ">
            <ScrollArea className="h-full w-full px-3">
              <div className="flex items-end justify-end mb-3">
                <Button variant={'outline'} onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-full h-full">{children}</div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  );
}

export default DialogCustom;
