"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { client } from "../../lib/hc";

const ProfilePicture = () => {
  const { data: session, update } = useSession() as {
    data: Session;
    update: (data?: any) => Promise<Session | null>;
  };
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (base64Data: string) => {
    setIsLoading(true);
    try {
      const response = await client.api.imagekit.uploadProfile.$post({
        json: {
          file: base64Data,
          userId: session?.user.id,
        }
      });
      const data = await response.json();

      if (data) { 
        await update({
          user: {
            ...session.user,
            avatarUrl: (data as { avatarUrl?: string })?.avatarUrl,
          },
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle upload error here (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        uploadImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-32 w-32">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center bg-secondary">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <AvatarImage src={session?.user.avatarUrl} alt={session?.user.name} className="object-cover object-center" />
            <AvatarFallback className="bg-secondary text-primary text-2xl font-bold">
              {session?.user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
        {isLoading ? (
          <Loader2 className="h-6 w-6 text-white animate-spin" />
        ) : (
          <label htmlFor="profile-picture-upload" className="cursor-pointer p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors duration-200">
            <Upload className="h-6 w-6 text-white" />
          </label>
        )}
      </div>
      <input
        id="profile-picture-upload"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
        disabled={isLoading}
      />
    </div>
  );
};

export default ProfilePicture;
