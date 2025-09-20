import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50 shadow-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-all duration-300">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 shadow-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold gradient-text">EasyChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="group btn btn-sm btn-modern gap-2 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border-white/20 dark:border-slate-600/50"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="group btn btn-sm btn-modern gap-2 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border-white/20 dark:border-slate-600/50">
                  <User className="size-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <button 
                  className="group flex gap-2 items-center px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 transition-all duration-300 hover:scale-105" 
                  onClick={logout}
                >
                  <LogOut className="size-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
