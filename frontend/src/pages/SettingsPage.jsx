import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How the things are going?", isSent: false },
  { id: 2, content: "Everything is well Buddy", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Settings</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Customize your chat experience</p>
        </div>

        {/* Theme Section */}
        <div className="modern-card rounded-3xl p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Theme</h2>
            <p className="text-slate-600 dark:text-slate-400">Choose a theme for your chat interface</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95
                  ${theme === t 
                    ? "bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 shadow-lg" 
                    : "hover:bg-white/50 dark:hover:bg-slate-700/50 border-2 border-transparent hover:border-white/20 dark:hover:border-slate-600/30"
                  }
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-12 w-full rounded-xl overflow-hidden shadow-md" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded-lg bg-primary"></div>
                    <div className="rounded-lg bg-secondary"></div>
                    <div className="rounded-lg bg-accent"></div>
                    <div className="rounded-lg bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs font-semibold truncate w-full text-center text-slate-700 dark:text-slate-300">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
                {theme === t && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="modern-card rounded-3xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Preview</h3>
          <div className="rounded-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-xl">
            <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="max-w-2xl mx-auto">
                {/* Mock Chat UI */}
                <div className="modern-card rounded-2xl shadow-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-white/20 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          A
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Alex Roy</h3>
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Online
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-6 min-h-[300px] max-h-[300px] overflow-y-auto modern-scrollbar bg-gradient-to-b from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
                    {PREVIEW_MESSAGES.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"} group`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`flex items-end gap-3 max-w-[70%] ${message.isSent ? "flex-row-reverse" : "flex-row"}`}>
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="size-8 rounded-xl overflow-hidden ring-2 ring-white/20 dark:ring-slate-600/30">
                              <div className={`size-8 flex items-center justify-center text-white font-bold text-sm ${
                                message.isSent ? "bg-gradient-to-br from-primary to-primary/80" : "bg-gradient-to-br from-slate-500 to-slate-600"
                              }`}>
                                {message.isSent ? "Y" : "A"}
                              </div>
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className={`flex flex-col ${message.isSent ? "items-end" : "items-start"}`}>
                            <div className={`
                              message-bubble relative px-4 py-3 rounded-2xl shadow-lg
                              ${message.isSent 
                                ? "bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-md" 
                                : "bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 rounded-bl-md border border-white/20 dark:border-slate-600/30"
                              }
                              group-hover:scale-[1.02] transition-all duration-300
                            `}>
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p className={`text-xs mt-2 ${
                                message.isSent ? "text-white/70" : "text-slate-500 dark:text-slate-400"
                              }`}>
                                12:00 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-6 border-t border-white/20 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="input-modern flex-1 text-sm py-3 rounded-2xl"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn-modern p-3 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
