"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/hc";

const ProfilePicture = () => {
  const { data: session } = useSession() as { data: Session };
  const [imgTemp, setImgTemp] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setImgTemp(`data:${file.type};base64,${base64Data}`);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imgFile) {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", imgFile);
        try {
          const response = await client.api.uploadthing.$post({
            body: formData
          });
          console.log("Upload response:", response);
          // Handle successful upload here (e.g., update user profile with new image URL)
        } catch (error) {
          console.error("Error uploading file:", error);
          // Handle upload error here (e.g., show error message to user)
        }
      };
      uploadImage();
    }
  }, [imgFile]);

  return (
    <div className="relative group">
      <Avatar className="h-32 w-32">
        <AvatarImage src={imgTemp || "/avatars/01.png"} alt={session.user.name} className="object-cover object-center" />
        <AvatarFallback className="bg-secondary text-primary text-2xl font-bold">
          {session.user.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
        <label htmlFor="profile-picture-upload" className="cursor-pointer p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors duration-200">
          <Upload className="h-6 w-6 text-white" />
        </label>
      </div>
      <input
        id="profile-picture-upload"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;
