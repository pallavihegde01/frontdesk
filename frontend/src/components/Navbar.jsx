import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon, Cable, LogOutIcon } from "lucide-react";
import { getAuthUser, logout } from "../lib/api.js"; 

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getAuthUser();
      if (userData?.user) {
        setAuthUser(userData.user);
      }
    };
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO */}
          <div className="pl-5">
            <Link to="/" className="flex items-center gap-2.5">
              <Cable className="size-9 text-secondary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary tracking-wider">
                Frontdesk
              </span>
            </Link>
          </div>

          {/* LOGOUT BTN */}
          
            <button
              className="btn btn-ghost btn-circle"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
