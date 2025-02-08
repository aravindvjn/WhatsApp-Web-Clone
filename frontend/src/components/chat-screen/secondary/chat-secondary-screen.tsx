import Chats from "./chats";
import Footer from "./footer";
import Header from "./header";

const ChatSecondaryScreen = () => {
  return (
    <div className="h-dvh relative w-full">
      <Header />
      <Chats />
      <Footer />
    </div>
  );
};

export default ChatSecondaryScreen;
