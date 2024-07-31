import Nav from "../components/Nav";
import SearchBox from "../components/SearchBox";
export default function Search() {
  return (
    <div className="inline-flex items-center justify-between w-full">
      <Nav />
      <div
        className=" flex mr-[20%]"
        style={{ position: "relative !important" }}
      >
        <SearchBox />
      </div>
    </div>
  );
}
