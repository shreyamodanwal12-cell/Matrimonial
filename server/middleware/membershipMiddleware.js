import supabase from "../config/supabase.js";

const membershipMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userId = req.user.id;

    const { data: membership, error } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Membership Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to verify membership",
      });
    }

    // No membership
    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "Active membership required to view profiles",
        requiresMembership: true,
      });
    }

    // Check status
    if (membership.status?.toUpperCase() !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Active membership required to view profiles",
        requiresMembership: true,
      });
    }

    // Check expiry
    const now = new Date();
    const expiryDate = new Date(membership.end_date);

    if (!membership.end_date || expiryDate < now) {
      await supabase
        .from("memberships")
        .update({
          status: "EXPIRED",
        })
        .eq("id", membership.id);

      return res.status(403).json({
        success: false,
        message: "Your membership has expired",
        requiresMembership: true,
      });
    }

    // Membership valid
    req.membership = membership;

    next();

  } catch (error) {
    console.error("Membership Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while checking membership",
    });
  }
};

export default membershipMiddleware;