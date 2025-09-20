import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-white/20 dark:border-slate-700/50 flex flex-col transition-all duration-300 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
      <div className="border-b border-white/20 dark:border-slate-700/50 w-full p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold text-lg hidden lg:block gradient-text">Contacts</span>
        </div>
        
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-3 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 ${
                showOnlineOnly 
                  ? 'bg-primary border-primary' 
                  : 'border-slate-300 dark:border-slate-600 group-hover:border-primary/50'
              }`}>
                {showOnlineOnly && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
              Show online only
            </span>
          </label>
          <div className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-xs font-medium text-green-700 dark:text-green-400">
            {onlineUsers.length - 1} online
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 modern-scrollbar">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              group w-full p-4 mx-2 mb-2 flex items-center gap-4 rounded-xl
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              ${selectedUser?._id === user._id 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg" 
                : "hover:bg-white/50 dark:hover:bg-slate-700/50 border border-transparent hover:border-white/20 dark:hover:border-slate-600/30"
              }
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <div className="size-12 rounded-2xl overflow-hidden ring-2 ring-white/20 dark:ring-slate-600/30 group-hover:ring-primary/30 transition-all duration-300">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {onlineUsers.includes(user._id) && (
                <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800 flex items-center justify-center">
                  <div className="size-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-primary transition-colors">
                {user.fullName}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  onlineUsers.includes(user._id) ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                }`}></div>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8 px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Users className="size-8 text-slate-400" />
            </div>
            <p className="font-medium">No online users</p>
            <p className="text-sm mt-1">Try adjusting your filter settings</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
