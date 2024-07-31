import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import ProfilePost from "../components/ProfilePost";
import ProfileInfo from "../components/ProfileInfo";
export default function Profile() {
  const { displayName } = useParams();
  return (
    <div className="inline-flex items-center justify-between w-full">
      <div>
        <Nav />
      </div>
      <div
        className=" flex mr-[20%]"
        style={{ position: "relative !important" }}
      >
        <div className="m-0 absolute top-[50%] translate-y-[-50%] translate-x-[-40%] left-[50%]">
          {/* <ProfileInfo displayName={displayName} /> */}
          <ProfilePost displayName={displayName} />
        </div>
      </div>
    </div>
  );
}
