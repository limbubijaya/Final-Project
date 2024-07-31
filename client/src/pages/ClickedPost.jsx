import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import ClickPost from "../components/ClickPost";

export default function ClickedPost() {
  const { post } = useParams();
  const { displayName } = useParams();

  return (
    <div className="inline-flex items-center justify-between w-full">
      <div >
        <Nav />
      </div>
      <div className=" mr-[20%]" style={{ position: "relative !important" }}>
        <ClickPost displayName={displayName} post={post} />
      </div>
    </div>
  );
}
