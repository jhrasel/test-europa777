"use client";

import { message, Upload } from "antd";
import { AiOutlineInbox } from "react-icons/ai";
const { Dragger } = Upload;

const DruggableFileInput = ({ onChange, onError }) => {
  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/pdf",
    beforeUpload: (file) => {
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        message.error(`${file.name} is not a PDF file format`);
      }
      return false;
    },
    onChange(info) {
      onChange(info.file);
    },
  };

  return (
    <div className="w-full relative overflow-hidden">
      <Dragger {...props}>
        <p className="items-center"></p>
        <div className="flex justify-center mb-2">
          <AiOutlineInbox className="w-8 h-8" />
        </div>
        <p className="text-md font-semibold">
          Click or drag file to this area to upload
        </p>
        <p className="text-slate-600">
          You can click to select a file or drug, make sure the file in PDF
          format
        </p>
      </Dragger>
    </div>
  );
};

export default DruggableFileInput;
