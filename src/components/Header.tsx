import { Link } from "react-router";

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gray-100 text-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2 text-lg font-bold">
          Art Gallery
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-gallery" className="hover:underline">
                My Gallery
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
