import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layout/MainLayout.tsx";
import Home from "./pages/Home.tsx";
import MyGallery from "./pages/MyGallery.tsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="my-gallery" element={<MyGallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
