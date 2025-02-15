import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../../utils/helper/image-crop";
import { BsFillSendFill } from "react-icons/bs";
import { MdNavigateNext, MdOutlineCancel } from "react-icons/md";
import { createStatus } from "../../utils/api-calls/create-status";


const StatusPreview = ({
  image,
  setImage,
}: {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);

  //actions to perform the status submission
  const [state, action, isPending] = useActionState(
    createStatus.bind(null, file),
    {
      message: "",
      success: false,
    }
  );

  //Handling croping and zooming
  const onCropComplete = async (
    _croppedArea: Area,
    croppedAreaPixels: Area
  ) => {

    try {
      const croppedImgBlob = (await getCroppedImg(
        image,
        croppedAreaPixels
      )) as Blob;

      const croppedImgUrl = URL.createObjectURL(croppedImgBlob);
      setCroppedImage(croppedImgUrl);
    } catch (error) {
      console.error("Failed to crop image", error);
    }
  };

  const handleDone = async () => {
    if (croppedImage) {
      setImage(croppedImage);
      const croppedBlob = await fetch(croppedImage).then((res) => res.blob());
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
        type: "image/jpeg",
      });
      setFile(croppedFile);
    }
  };

  //resetting everything after successful response
  useEffect(() => {
    if (state.success) {
      setImage("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedImage(null);
      setFile(null);
    }

  }, [state.message]);
  
  return createPortal(
    <div className="fixed inset-0 flex flex-col items-center z-20 bg-black justify-center bg-primary w-full h-dvh">
      <div className="max-w-md bg-white p-4 rounded-lg shadow-lg center">


        <Cropper
          style={{
            containerStyle: {
              height: "calc(100% - 100px)",
              overflow: "hidden",
              objectFit: "cover",
              margin: "20px auto",
              marginBottom: 80,
              backgroundColor: "transparent",
            },
          }}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={9 / 16}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />


        <form
          action={action}
          className="w-full flex-col mt-4 absolute center bottom-[25px] gap-2"
        >
          {!state.success && state.message && !isPending && (
            <div className="p-2 mb-5 rounded border-red-500 text-red-600 bg-red-300 border">
              <p>{state.message}</p>
            </div>
          )}
          {isPending && (
            <div className="p-2 mb-5 rounded border-blue-500 text-blue-600 bg-blue-300 border">
              <p>Sending...</p>
            </div>
          )}


          <div className="flex center w-full gap-2">
            <button
              type="button"
              className="bg-red-600  text-white center h-10 w-10 rounded-full"
              onClick={() => setImage("")}
            >
              <MdOutlineCancel size={30} />
            </button>
            <input
              name="text"
              type="text"
              placeholder="Whats on your mind..."
              className="border border-secondaryText bg-primary sm:w-full max-w-[400px] rounded p-2 outline-none placeholder:text-[12px]"
            />
            <button
              type={file ? "submit" : "button"}
              className="bg-green  text-white center h-10 w-10 rounded-full"
              onClick={handleDone}
              disabled={!croppedImage}
            >
              {file ? <BsFillSendFill /> : <MdNavigateNext size={33} />}
            </button>
          </div>


        </form>


      </div>
    </div>,
    document.body
  );
};

export default StatusPreview;
