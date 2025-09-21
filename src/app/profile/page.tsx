"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import useUser from "@/hooks/useUser";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const [name, setName] = useState(user?.name || "");

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (!user) {
    return <p className="p-8 text-red-500">You must be logged in to view this page.</p>;
  }

  const handleSave = async () => {
    // TODO: Replace with API call to update user profile
    console.log("Saving profile:", { name });
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      {/* Profile Info */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>👤 Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span className="text-gray-600 text-sm">{user.id}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>⚙️ Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          {/* Edit Profile Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {/* Later you can add Email, Avatar, etc. */}
              </div>
              <DialogFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
