import CreatePost from "../components/CreatePost";
import Nav from "../components/Nav";
export default function Create() {
  return (
    <div className="inline-flex items-center justify-between w-full">
      <div>
        <Nav />
      </div>
      <div className=" mr-[20%]" style={{ position: "relative !important" }}>
        <CreatePost />
      </div>
    </div>
  );
}
