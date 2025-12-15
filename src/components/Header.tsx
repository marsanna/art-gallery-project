import { Link } from "react-router";

function Header() {
  return (
    <header>
      ---
      <nav>
        <Link to="/" className="hover:underline">
          Home |
        </Link>
        <Link to="my-gallery" className="hover:underline">
          My Gallery |
        </Link>
      </nav>
      ---
    </header>
  );
}

export default Header;
