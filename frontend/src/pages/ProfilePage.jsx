import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto p-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Profile</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Manage your account information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="modern-card rounded-3xl p-8 space-y-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="size-40 rounded-3xl object-cover ring-4 ring-white/20 dark:ring-slate-600/30 shadow-2xl group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute -bottom-2 -right-2 
                      bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
                      p-4 rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl
                      transition-all duration-300 hover:scale-110 active:scale-95
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}
                    `}
                  >
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{authUser?.fullName}</h2>
                  <p className="text-slate-600 dark:text-slate-400">{authUser?.email}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <div className="input-modern px-4 py-3 rounded-2xl text-slate-800 dark:text-slate-200">
                      {authUser?.fullName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="input-modern px-4 py-3 rounded-2xl text-slate-800 dark:text-slate-200">
                      {authUser?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Sidebar */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="modern-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Member Since</span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {authUser?.createdAt?.split("T")[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="modern-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Messages Sent</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">200</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Chats</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">12</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Online Time</span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">1h 20m</span>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {isUpdatingProfile && (
              <div className="modern-card rounded-3xl p-6 border-2 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Uploading...</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Please wait while we update your profile</p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
