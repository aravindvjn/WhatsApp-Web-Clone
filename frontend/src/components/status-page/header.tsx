import { ChangeEvent, useRef, useState } from "react";
import Text from "../../ui/text";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd, IoMdPhotos } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import StatusPreview from "./status-preview";

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setOptions] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  //trigger the file input
  const handlePicClick = () => {
    inputRef.current?.click();
  };

  //handle the selected image
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage("");
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setOptions(false);
  };


  return (
    <div className="flex justify-between items-center p-2 pt-3">
      {image && <StatusPreview image={image} setImage={setImage}  />}
      <Text type="h4" fontWeight="semibold">
        Status
      </Text>

      <div className="flex items-center gap-3 text-primaryText">
        <div className="relative">

          <div
            onClick={() => setOptions((prev) => !prev)}
            className={`center h-9 w-9 cursor-pointer  rounded-full ${
              showOptions ? "bg-secondary" : ""
            }`}
          >
            <IoMdAdd size={25} />
          </div>

          {showOptions && (
            <div className="absolute right-0 overflow-hidden rounded-lg bg-secondary w-[155px] text-[14px] shadow shadow-black/50">
              <button
                onClick={handlePicClick}
                className="flex items-center w-full  p-3 hover:bg-tertiary gap-2"
              >
                <IoMdPhotos size={20} /> Photos & videos
              </button>
              <button className="flex  w-full items-center p-3 hover:bg-tertiary gap-2">
                <MdEdit size={20} /> Text
              </button>
            </div>
          )}
          
        </div>
        <input
          onChange={handleChangeImage}
          type="file"
          className="hidden"
          ref={inputRef}
        />
        <BsThreeDotsVertical size={18} />
      </div>
    </div>
  );
};

export default Header;
