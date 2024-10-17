"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, KeyRound, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import ProfilePicture from '../../components/profile/ProfilePicture';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <DefaultLayout>
        <SidebarLayout>
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-semibold text-muted-foreground">Please log in to view your profile.</p>
          </div>
        </SidebarLayout>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <SidebarLayout>
        <div className="container mx-auto p-6">
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex flex-col items-center">
              <ProfilePicture />
              <CardTitle className="text-2xl font-bold">{session.user.name}</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center p-3 bg-secondary rounded-lg">
                  <User className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-lg">{session.user.name}</span>
                </div>
                <div className="flex items-center p-3 bg-secondary rounded-lg">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-lg">{session.user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="text-lg flex items-center space-x-2">
                    <KeyRound className="h-5 w-5" />
                    <span>Reset Password</span>
                  </Button>
                  <Button onClick={() => signOut()} variant="destructive" className="text-lg flex items-center space-x-2">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default ProfilePage;