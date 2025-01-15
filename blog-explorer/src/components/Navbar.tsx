import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">
            BlogExplorer
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/users"
              className="text-white hover:text-tertiary transition-colors"
            >
              Utilisateurs
            </Link>
            <Link
              to="/posts"
              className="text-white hover:text-tertiary transition-colors"
            >
              Posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
