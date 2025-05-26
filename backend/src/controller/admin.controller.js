import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded first

import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { v2 as cloudinary } from "cloudinary";
import { clerkClient } from "@clerk/clerk-sdk-node"; // ✅ Added for admin email check

console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  try {
    console.log("📤 Uploading file to Cloudinary:", file?.name || file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    console.log("✅ Uploaded:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Error in uploadToCloudinary", error);
    throw new Error("Error uploading to Cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    console.log("🎵 Received request to create a song");
    console.log("📁 Files received:", req.files);
    console.log("📝 Body received:", req.body);

    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }

    const { title, artist, albumId, duration } = req.body;

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    console.log("🔊 Uploading audio...");
    const audioUrl = await uploadToCloudinary(audioFile);

    console.log("🖼️ Uploading image...");
    const imageUrl = await uploadToCloudinary(imageFile);

    console.log("🛠️ Creating song document...");
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    console.log("✅ Song created:", song);
    res.status(201).json(song);
  } catch (error) {
    console.error("❌ Error in createSong:", error.message);
    console.error(error.stack); // Full traceback
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("❌ Error in deleteSong:", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("❌ Error in createAlbum:", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("❌ Error in deleteAlbum:", error);
    next(error);
  }
};

// ✅ NEW VERSION — Checks actual email from Clerk
export const checkAdmin = async (req, res, next) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = user.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

    return res.status(200).json({ admin: isAdmin });
  } catch (error) {
    console.error("❌ Error in checkAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
// 🔙 OLD checkAdmin — now commented for reference
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
*/
