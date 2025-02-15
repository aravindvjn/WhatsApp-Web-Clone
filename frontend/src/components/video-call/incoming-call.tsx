import React, { useState } from "react";
import { createPortal } from "react-dom";

const IncomingCall = ({ acceptVideoCall }: { acceptVideoCall: () => void }) => {
  const [done, setDone] = useState<boolean>(false);
  if (done) return null;
  return createPortal(
    <div className="fixed inset-0 z-20 top-[10px] -translate-x-1/2 bg-tertiary h-fit p-5 rounded-md shadow-md shadow-black/50 w-fit left-1/2 center flex-col gap-5">
      <p>Incoming call</p>
      <div className="flex gap-5">
        <button
          onClick={() => {
            setDone(true);
          }}
          className="px-3 rounded py-1 bg-red-500"
        >
          Accept
        </button>
        <button
          onClick={() => {
            acceptVideoCall();
            setDone(true);
          }}
          className="px-3 rounded py-1 bg-green"
        >
          Accept
        </button>
      </div>
    </div>,
    document.body
  );
};

export default IncomingCall;
