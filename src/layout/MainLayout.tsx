import { Outlet } from "react-router";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
