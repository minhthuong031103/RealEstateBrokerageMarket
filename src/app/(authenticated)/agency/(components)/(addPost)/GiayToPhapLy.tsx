import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { TinhTrangPhapLy } from '@/lib/constant';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';

export const GiayToPhapLy = ({
  setPhapLy,
  phapLyImageFiles,
  setPhapLyImageFiles,
}) => {
  const [selectedPhapLy, setSelectedPhapLy] = React.useState(new Set([]));
  const [phapLyTouched, setPhapLyTouched] = React.useState(false);

  useEffect(() => {
    if (selectedPhapLy) {
      const phapLyValueArray = Array.from(selectedPhapLy);
      setPhapLy(phapLyValueArray?.[0]);
    }
  }, [selectedPhapLy]);

  const isPhapLyValid = selectedPhapLy.size > 0;
  return (
    <div className="flex flex-col gap-y-3">
      <Select
        key={'phaply'}
        radius={'md'}
        label="Tình trạng pháp lý"
        isInvalid={isPhapLyValid || !phapLyTouched ? false : true}
        errorMessage={
          isPhapLyValid || !phapLyTouched
            ? ''
            : 'Vui lòng chọn tình trạng pháp lý'
        }
        autoFocus={false}
        placeholder="Chọn tình trạng pháp lý"
        selectedKeys={selectedPhapLy}
        onSelectionChange={setSelectedPhapLy}
        onClose={() => setPhapLyTouched(true)}
        className="max-w-xs lg:max-w-lg"
      >
        {TinhTrangPhapLy?.map((phaply) => (
          <SelectItem key={phaply.value} value={phaply.value}>
            {phaply.value.toString()}
          </SelectItem>
        ))}
      </Select>
      <div className="font-bold text-sm">Hình ảnh pháp lý </div>
      {phapLyImageFiles?.length ? (
        <ImageList
          className={'w-full h-36'}
          files={phapLyImageFiles}
          height={32}
          width={32}
        />
      ) : null}
      <FileDialog
        className="max-w-xs lg:max-w-lg"
        name="phapLyImages"
        maxFiles={8}
        maxSize={1024 * 1024 * 4}
        files={phapLyImageFiles}
        setFiles={setPhapLyImageFiles}
        disabled={false}
      />
    </div>
  );
};
