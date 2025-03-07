import { Radio } from 'antd';
import React, { FC, useState } from 'react';

interface PhanLoaiProps {
  listOptions: any;
}

export const PhanLoai: FC<PhanLoaiProps> = ({ listOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState(0);
  return (
    <div className="mt-4">
      <p className="font-medium">Phân loại</p>
      {/* <div className="mt-2 flex space-x-2">
        {listOptions?.map((item, index) => (
          <button
            key={index}
            className={`rounded-lg  border border-2 px-4 py-2 text-xs ${index === selectedOptions ? '   border-purple-500 bg-gradient-to-r from-[#ED1DBF] to-[#3561FE] bg-clip-text  text-transparent' : 'border-gray-300 text-gray-600'}`}
            onClick={() => setSelectedOptions(index)}
          >
            {item}
          </button>
        ))}
      </div> */}
      <Radio.Group defaultValue="a" className="mx-0 mt-1 p-0">
        {listOptions?.map((item, index) => (
          <Radio.Button value={item} className="mx-1 ">
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};
