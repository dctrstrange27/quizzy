import { Outlet } from "react-router-dom";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Navigation } from "../routes/navigation";

const Home = () => {
  return (
    <>
        <div className={`min-h-screen relative`}>
        <Navigation></Navigation>
        <div className="w-full h-16"></div>
        <div className="px-14 flex flex-col items-center p-5 w-full  text-[#041b2d] dark:text-[#eaeaea]">
          <BsFillJournalBookmarkFill className="w-5 h-5 " />
          <h1 className="font-bold text-base">Reviewers</h1>
          <p className="font-light text-center text-sm max-w-md">
            These are reviewers/questions that are created & shared by different
            students to practice for their exam.{" "}
          </p>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
