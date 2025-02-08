
import type { PageType } from "../nav-bar/nav-bar";

const SecondarySection = ({ page }: { page: PageType }) => {
  let activePage;
  
  switch (page) {
    case "chats":
      activePage = <div>Chats</div>;
      break;
    case "profile":
      activePage = <div>Profile Page</div>;
      break;
    default:
      activePage = <div>Unknown Page</div>;
      break;
  }

  return <div className="w-full bg-secondary">{activePage}</div>;
};

export default SecondarySection;
