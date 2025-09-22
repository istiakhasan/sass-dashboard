"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  joined: string;
  role: "Admin" | "User";
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData>(
    localStorage.getItem('role') === "Admin"
      ? {
          fullName: "Alice Admin",
          username: "admin_alice",
          email: "alice.admin@example.com",
          avatar: "https://i.pravatar.cc/150?img=32",
          joined: "January 2023",
          role: "Admin",
        }
      : {
          fullName: "John Doe",
          username: "john_doe",
          email: "john.doe@example.com",
          avatar: "https://i.pravatar.cc/150?img=12",
          joined: "March 2024",
          role: "User",
        }
  );


  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<ProfileData>({
    defaultValues: profile,
  });

  const handleOpen = () => {
    reset(profile);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onSubmit = (data: ProfileData) => {
    setProfile(data);
    setOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="relative bg-gradient-to-r from-[#619998] via-[#27912c] to-[#cceeed] rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col items-center">
          <Avatar
            src={profile.avatar}
            sx={{ width: 120, height: 120 }}
            className="border-4 border-white shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{profile.fullName}</h1>
          <p className="text-sm opacity-80">@{profile.username}</p>
          <p className="mt-2">{profile.email}</p>
          <p className="text-sm mt-1 opacity-70">Joined: {profile.joined}</p>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "white",
              color: "#4f46e5",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
            onClick={handleOpen}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className=" flex flex-col gap-4 ">
            <Controller
             
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} label="Full Name"  fullWidth />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} label="Username" fullWidth />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} label="Email" fullWidth />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
