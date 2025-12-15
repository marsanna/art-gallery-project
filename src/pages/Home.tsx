import Gallery from "../components/Gallery.tsx";
import Search from "../components/Search.tsx";

function Home() {
  return (
    <>
      <h1>Art Gallery</h1>
      <Search />
      ---
      <Gallery />
      ---
    </>
  );
}

export default Home;
