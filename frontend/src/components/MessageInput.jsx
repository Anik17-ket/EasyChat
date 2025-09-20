import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-6 w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-t border-white/20 dark:border-slate-700/50">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-2xl border-2 border-white/20 dark:border-slate-600/30 shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p className="font-medium">Image ready to send</p>
            <p className="text-xs">Click the send button to share</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              className="w-full input-modern rounded-2xl pr-12 py-4 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            {/* Image upload button */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 group"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image 
                size={20} 
                className={`transition-colors duration-300 ${
                  imagePreview 
                    ? "text-green-500 group-hover:text-green-600" 
                    : "text-slate-400 group-hover:text-primary"
                }`} 
              />
            </button>
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        
        <button
          type="submit"
          className="btn-modern group p-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          disabled={!text.trim() && !imagePreview}
        >
          <Send 
            size={20} 
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
          />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
