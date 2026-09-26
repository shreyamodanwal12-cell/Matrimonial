import supabase from "../config/supabase.js";

export const getMyMembership = async (req, res) => {

  try {

    const userId = req.user.id;


    const {
      data,
      error,
    } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });


    if (error) {

      console.error(
        "Get Membership Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Unable to fetch memberships",
        error: error.message,
      });
    }


    // ==========================================
    // CHECK EXPIRY
    // ==========================================

    const now = new Date();


    for (const membership of data || []) {

      const expiryDate =
        new Date(membership.end_date);
// ==========================================
// MEMBERSHIP EXPIRING SOON NOTIFICATION
// ==========================================

if (membership.status === "ACTIVE") {

  const timeDifference =
    expiryDate.getTime() - now.getTime();

  const daysRemaining =
    timeDifference / (1000 * 60 * 60 * 24);

  if (daysRemaining > 0 && daysRemaining <= 3) {

    const { data: existingNotification, error: notificationCheckError } =
      await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", userId)
        .eq("type", "membership_expiring")
        .eq(
          "message",
          `Your ${membership.plan_name} membership will expire soon.`
        )
        .maybeSingle();

    if (notificationCheckError) {

      console.error(
        "Membership Expiring Notification Check Error:",
        notificationCheckError
      );

    } else if (!existingNotification) {

      const { error: notificationError } =
        await supabase
          .from("notifications")
          .insert({
            user_id: userId,
            type: "membership_expiring",
            title: "Membership Expiring Soon",
            message: `Your ${membership.plan_name} membership will expire soon.`,
            related_user_id: userId,
            is_read: false,
          });

      if (notificationError) {

        console.error(
          "Membership Expiring Notification Error:",
          notificationError
        );

      }
    }
  }
}

      if (
        membership.status === "ACTIVE" &&
        expiryDate < now
      ) {

        const {
          data: updatedMembership,
          error: updateError,
        } = await supabase
          .from("memberships")
          .update({
            status: "EXPIRED",
          })
          .eq("id", membership.id)
          .select()
          .single();


        if (updateError) {

  console.error(
    "Membership Expiry Update Error:",
    updateError
  );

} else {

  membership.status =
    updatedMembership.status;

  // ==========================================
  // MEMBERSHIP EXPIRY NOTIFICATION
  // ==========================================

  const { data: existingNotification, error: notificationCheckError } =
    await supabase
      .from("notifications")
      .select("id")
      .eq("user_id", userId)
      .eq("type", "membership_expired")
      .eq("message", `Your ${membership.plan_name} membership has expired.`)
      .maybeSingle();

  if (notificationCheckError) {

    console.error(
      "Membership Notification Check Error:",
      notificationCheckError
    );

  } else if (!existingNotification) {

    const { error: notificationError } =
      await supabase
        .from("notifications")
        .insert({
          user_id: userId,
          type: "membership_expired",
          title: "Membership Expired",
          message: `Your ${membership.plan_name} membership has expired.`,
          related_user_id: userId,
          is_read: false,
        });

    if (notificationError) {

      console.error(
        "Membership Expiry Notification Error:",
        notificationError
      );

    }
  }
}
      }
    }


    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({

      success: true,

      message:
        "Memberships fetched successfully",

      memberships: data || [],

    });

  } catch (error) {

    console.error(
      "Membership Controller Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};