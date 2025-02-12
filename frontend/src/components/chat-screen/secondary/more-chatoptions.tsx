import { useEffect, useState } from "react";
import { IoAdd, IoDocument, IoPerson } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import {  IoMdPhotos } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { BiPoll } from "react-icons/bi";
import { RiEmojiStickerFill } from "react-icons/ri";

const MoreChatOpions = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    setShowOptions(false);
  }, []);

  return (
    <div className="relative w-[50px]">
      <motion.button
        onClick={() => setShowOptions((prev) => !prev)}
        type="button"
        className="h-[35px] w-[35px] center rounded-full"
        style={{
          backgroundColor: showOptions ? "rgba(255,255,255,0.2)" : "",
          color: showOptions ? "#fff" : "",
        }}
        animate={{ rotateZ: showOptions ? 45 : 0 }}
      >
        <IoAdd size={28} />
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{ transformOrigin: "left bottom" }}
            className="absolute bottom-[60px] text-primaryText left-[10px] bg-fourthColor  rounded-lg text-[14px] w-[200px] overflow-hidden shadow shadow-black/30"
          >
            <ul className="flex flex-col">
              {options.map((option, index) => (
                <li
                  className="flex cursor-pointer hover:bg-white/10 px-5 py-3 items-center gap-2"
                  key={index}
                  onClick={option.onclick}
                >
                  <span className="w-[30px]">{option.icon}</span> {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoreChatOpions;

const options = [
  {
    label: "Doccument",
    icon: <IoDocument className="text-purple-500" size={20} />,
    onclick: () => {},
  },
  {
    label: "Photos & videos",
    icon: <IoMdPhotos className="text-blue-600" size={20} />,
    onclick: () => {},
  },
  {
    label: "Camera",
    icon: <FaCamera className="text-pink-500" size={20} />,
    onclick: () => {},
  },
  {
    label: "Contact",
    icon: <IoPerson className="text-blue-500" size={20} />,
    onclick: () => {},
  },
  {
    label: "Poll",
    icon: <BiPoll className="text-yellow-500" size={20} />,
    onclick: () => {},
  },
  {
    label: "New Sticker",
    icon: <RiEmojiStickerFill className="text-green-300" size={20} />,
    onclick: () => {},
  },
];
