import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { LuPhoneOff } from "react-icons/lu";
import {
  IoVideocam,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import { useSocket } from "../../utils/socket/socket";
import { MdVideoCall } from "react-icons/md";
import IncomingCall from "./incoming-call";

interface VideoCallProps {
  receiverId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ receiverId }) => {
  const [peerId, setPeerId] = useState<string>("");
  const [peer, setPeer] = useState<Peer | null>(null);
  const [call, setCall] = useState<any | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [videoCallRequest, setVideoCallRequest] = useState<any>(null);

  //References to video screen elements
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const { socket } = useSocket();

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => setPeerId(id));

    //Get permissions and stream
    newPeer.on("call", (incomingCall) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((userStream) => {
          setStream(userStream);

          if (localVideoRef.current)
            localVideoRef.current.srcObject = userStream;
          incomingCall.answer(userStream);

          incomingCall.on("stream", (remoteStream) => {
            if (remoteVideoRef.current)
              remoteVideoRef.current.srcObject = remoteStream;
          });

          setCall(incomingCall);
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    });

    setPeer(newPeer);

    return () => newPeer.destroy();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleVideoCallRequest = (data: any) => {
      setVideoCallRequest(data);
    };

    const handleAcceptVideoCall = (data: any) => {
      callPeer(data.peerId);
    };

    socket.on("videoCallRequest", handleVideoCallRequest);
    socket.on("acceptVideoCall", handleAcceptVideoCall);

    return () => {
      socket.off("videoCallRequest", handleVideoCallRequest);
      socket.off("acceptVideoCall", handleAcceptVideoCall);
    };
  }, [socket]);

  //send request to the server
  const requestVideoCall = () => {
    if (!peerId || !receiverId) return;
    socket?.emit("videoCallRequest", { peerId, receiverId });
    callPeer(peerId);
  };

  //initialize the call
  const callPeer = (remotePeerId: string) => {
    if (!peer || !remotePeerId) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);

        if (localVideoRef.current) localVideoRef.current.srcObject = userStream;

        const outgoingCall = peer.call(remotePeerId, userStream);

        outgoingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current)
            remoteVideoRef.current.srcObject = remoteStream;
        });

        setCall(outgoingCall);
      })
      .catch((err) => console.error("Error getting user media:", err));
  };

  const toggleMute = () => {
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsMuted((prev) => !prev);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff((prev) => !prev);
    }
  };

  //on call end clean up everything
  const endCall = () => {
    call?.close();
    stream?.getTracks().forEach((track) => track.stop());
    setCall(null);
    setStream(null);

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  //emit call accepted events back to the server
  const acceptVideoCall = () => {
    if (!videoCallRequest) return;
    socket?.emit("acceptVideoCall", { peerId, receiverId });
    callPeer(videoCallRequest.peerId);
    setVideoCallRequest(null);
  };

  //=> BUTTONS
  const muteToggleButton = isMuted ? (
    <BiSolidMicrophoneOff size={20} />
  ) : (
    <BiSolidMicrophone size={20} />
  );

  const videoToggleButton = isVideoOff ? (
    <IoVideocamOffOutline size={20} />
  ) : (
    <IoVideocamOutline size={20} />
  );
  return (
    <>
      {peerId && (
        <button onClick={requestVideoCall}>
          <IoVideocam size={19} />
        </button>
      )}

      {videoCallRequest && <IncomingCall acceptVideoCall={acceptVideoCall} />}

      {call && (
        <div className="center flex fixed inset-0 w-full h-full bg-black/50  backdrop-blur-2xl border">

          {/* The video from the other person  */}
          <video ref={remoteVideoRef} autoPlay playsInline />

          <div className="absolute right-[10px] aspect-[4/3]  bottom-[10px] min-w-[100px] w-1/4 border overflow-hidden rounded bg-black">
           {/* The video from your device */}
            <video ref={localVideoRef} autoPlay playsInline muted />
          </div>

          <div className="absolute bottom-5 flex gap-10">

            <button
              className="h-[60px] w-[60px] bg-white rounded-full center"
              onClick={toggleMute}
            >
              {muteToggleButton}
            </button>

            <button
              className="h-[60px] w-[60px] bg-white rounded-full center"
              onClick={toggleVideo}
            >
              {videoToggleButton}
            </button>

            <button
              className="h-[60px] w-[60px] bg-white rounded-full center"
              onClick={endCall}
              style={{ background: "red", color: "white" }}
            >
              <LuPhoneOff size={20} />
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default VideoCall;
