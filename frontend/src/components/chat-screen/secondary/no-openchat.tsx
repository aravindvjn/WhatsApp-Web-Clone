import { Link } from "react-router";

const NoOpenChats = () => {
  return (
    <div className="h-full flex-col text-center center w-full bg-tertiary gap-3 px-[20px]">
      <img
        src="/downloadwin.png"
        className="w-2/3 max-w-[350px]"
        alt="Download Whatsapp for Windows"
      />
      <p className="text-3xl font-thin">Download WhatsApp for Windows</p>
      <p className="text-[12px] text-secondaryText max-w-[550px]">
        A Full Feature WhatsApp Web Clone App with React with Typescript,
        Socket.io, Node.js, Express.js and Mongoose developed by Aravind, a Full
        Stack developer
      </p>
      <Link
        to={"https://github.com/aravindvjn/WhatsApp-Web-Clone"}
        className="px-5 text-[12px] font-semibold py-2 rounded-full text-black bg-green"
      >
        Source Code
      </Link>
    </div>
  );
};

export default NoOpenChats;
