import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-white/30 to-slate-50/30 dark:from-slate-800/30 dark:to-slate-900/30">
      <div className="max-w-lg text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center float group-hover:scale-110 transition-all duration-500 shadow-2xl">
              <MessageSquare className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform duration-500" />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-secondary/40 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent/50 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold gradient-text">Welcome to EasyChat!</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Select a conversation from the sidebar to start chatting with your friends and colleagues
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Real-time</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Secure</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Modern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
