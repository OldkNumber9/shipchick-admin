// components/ImageModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface ImageModalProps {
  imageUrl: string | null
  altText: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}> 
      <DialogContent className="">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={altText}
            width={1920} // Adjust as needed
            height={1080} // Adjust as needed
            className="w-full h-full  "
            onClick={onClose} // Close modal on image click
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ImageModal