import { TinhTrangPhapLy } from '@/lib/constant';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';

export const GiayToPhapLy = ({ setPhapLy }) => {
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
    <div>
      <Select
        isRequired
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
    </div>
  );
};
