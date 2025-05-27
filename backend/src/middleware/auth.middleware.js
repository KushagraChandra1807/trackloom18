import { authenticateRequest, clerkClient } from "@clerk/express";

// ✅ Proper usage of Clerk's middleware
const clerkAuthMiddleware = authenticateRequest(); // ⬅️ Correct way

// Middleware to protect routes - verifies Clerk session token and sets req.auth.userId
export const protectRoute = async (req, res, next) => {
  try {
    // ✅ NEW: Properly apply Clerk middleware and wait for it to finish
    await new Promise((resolve, reject) => {
      clerkAuthMiddleware(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }

    next();
  } catch (error) {
    console.error("🔒 protectRoute error:", error);
    return res.status(401).json({ message: "Unauthorized - invalid or missing token" });
  }
};

/*
// ❌ OLD VERSION (commented out for reference)
export const protectRoute = async (req, res, next) => {
  try {
    // This checks the token and populates req.auth if valid
    await authenticateRequest(req, res);

    if (!req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - invalid or missing token" });
  }
};
*/

// Middleware to require admin rights
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    console.log("🔐 Checking admin for:", currentUser.primaryEmailAddress?.emailAddress);
    console.log("🔐 Expected admin email:", process.env.ADMIN_EMAIL);

    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - you must be an admin" });
    }

    next();
  } catch (error) {
    console.error("❌ requireAdmin error:", error);
    next(error);
  }
};
