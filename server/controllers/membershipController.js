import supabase from "../config/supabase.js";

export const getMyMembership = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Get Membership Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch membership",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No membership found",
      });
    }

    // =========================
    // CHECK MEMBERSHIP EXPIRY
    // =========================

    const now = new Date();
    const expiryDate = new Date(data.end_date);

    if (
      data.status === "ACTIVE" &&
      expiryDate < now
    ) {
      const { data: updatedMembership, error: updateError } =
        await supabase
          .from("memberships")
          .update({
            status: "EXPIRED",
          })
          .eq("id", data.id)
          .select()
          .single();

      if (updateError) {
        console.error(
          "Membership Expiry Update Error:",
          updateError
        );
      } else {
        data.status = updatedMembership.status;
      }
    }

    res.status(200).json({
      success: true,
      message: "Membership fetched successfully",
      membership: data,
    });
  } catch (error) {
    console.error("Membership Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};