import { Route, Routes } from "react-router";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MyGallery from "./pages/MyGallery";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="my-gallery" element={<MyGallery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
