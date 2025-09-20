const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-lg text-center relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 ${
                i % 2 === 0 ? "animate-pulse" : "animate-bounce"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl font-bold gradient-text leading-tight">{title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{subtitle}</p>
          
          {/* Feature highlights */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Real-time</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <span className="text-sm font-medium">Secure</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
              <span className="text-sm font-medium">Modern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
