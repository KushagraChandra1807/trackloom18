import {User} from "../models/user.model.js";//User
import UserActivation from "../models/userActivation.model.js";//UserActivation
export const authCallback = async (req, res, next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
  
      console.log("Received from Clerk:", { id, firstName, lastName, imageUrl });
  
      if (!id || !firstName || !lastName || !imageUrl) {
        console.log("❌ Missing required user fields");
        return res.status(400).json({ success: false, message: "Missing fields" });
      }
  
      const user = await UserActivation.findOne({ clerkId: id });
      if (!user) {
        const newUser = await User.create({
          clerkId: id,
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl
        });
        console.log("✅ New user created:", newUser);
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("🔥 Error in auth callback:", error);
      next(error);
    }
  };
  