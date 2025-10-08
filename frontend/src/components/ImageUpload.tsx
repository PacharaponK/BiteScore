import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string | null, file?: File) => void;
  imageUrl: string | null;
}

export const ImageUpload = ({ onImageSelect, imageUrl }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Food Image
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {imageUrl ? (
          <motion.div
            key="image-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group"
          >
            <motion.img
              src={imageUrl}
              alt="Food preview"
              className="w-full h-72 object-cover rounded-lg shadow-minimal"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-elevated"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="upload-area"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`border border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${dragActive
                ? "border-foreground/30 bg-muted/50"
                : "border-muted-foreground/20 hover:border-foreground/30 hover:bg-muted/30"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              animate={dragActive ? {
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
                animate={dragActive ? {
                  backgroundColor: "hsl(var(--accent) / 0.1)",
                  borderColor: "hsl(var(--accent))"
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={dragActive ? {
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </motion.div>
              </motion.div>
              <motion.div
                animate={dragActive ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <p className="text-base font-medium mb-2">Drop image here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
