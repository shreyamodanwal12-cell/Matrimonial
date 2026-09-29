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


//     // ==========================================
//     // CHECK EXPIRY
//     // ==========================================

//     const now = new Date();


//     for (const membership of data || []) {

//       const expiryDate =
//         new Date(membership.end_date);
// // ==========================================
// // MEMBERSHIP EXPIRING SOON NOTIFICATION
// // ==========================================

// if (membership.status === "ACTIVE") {

//   const timeDifference =
//     expiryDate.getTime() - now.getTime();

//   const daysRemaining =
//     timeDifference / (1000 * 60 * 60 * 24);

//   if (daysRemaining > 0 && daysRemaining <= 3) {

//     const { data: existingNotification, error: notificationCheckError } =
//       await supabase
//         .from("notifications")
//         .select("id")
//         .eq("user_id", userId)
//         .eq("type", "membership_expiring")
//         .eq(
//           "message",
//           `Your ${membership.plan_name} membership will expire soon.`
//         )
//         .maybeSingle();

//     if (notificationCheckError) {

//       console.error(
//         "Membership Expiring Notification Check Error:",
//         notificationCheckError
//       );

//     } else if (!existingNotification) {

//       const { error: notificationError } =
//         await supabase
//           .from("notifications")
//           .insert({
//             user_id: userId,
//             type: "membership_expiring",
//             title: "Membership Expiring Soon",
//             message: `Your ${membership.plan_name} membership will expire soon.`,
//             related_user_id: userId,
//             is_read: false,
//           });

//       if (notificationError) {

//         console.error(
//           "Membership Expiring Notification Error:",
//           notificationError
//         );

//       }
//     }
//   }
// }

//      if (
//   membership.status === "ACTIVE" &&
//   membership.plan_name !== "Free" &&
//   membership.end_date &&
//   expiryDate < now
// ) {

//         const {
//           data: updatedMembership,
//           error: updateError,
//         } = await supabase
//           .from("memberships")
//           .update({
//             status: "EXPIRED",
//           })
//           .eq("id", membership.id)
//           .select()
//           .single();


//         if (updateError) {

//   console.error(
//     "Membership Expiry Update Error:",
//     updateError
//   );

// } else {

//   membership.status =
//     updatedMembership.status;

//   // ==========================================
//   // MEMBERSHIP EXPIRY NOTIFICATION
//   // ==========================================

//   const { data: existingNotification, error: notificationCheckError } =
//     await supabase
//       .from("notifications")
//       .select("id")
//       .eq("user_id", userId)
//       .eq("type", "membership_expired")
//       .eq("message", `Your ${membership.plan_name} membership has expired.`)
//       .maybeSingle();

//   if (notificationCheckError) {

//     console.error(
//       "Membership Notification Check Error:",
//       notificationCheckError
//     );

//   } else if (!existingNotification) {

//     const { error: notificationError } =
//       await supabase
//         .from("notifications")
//         .insert({
//           user_id: userId,
//           type: "membership_expired",
//           title: "Membership Expired",
//           message: `Your ${membership.plan_name} membership has expired.`,
//           related_user_id: userId,
//           is_read: false,
//         });

//     if (notificationError) {

//       console.error(
//         "Membership Expiry Notification Error:",
//         notificationError
//       );

//     }
//   }
// }
//       }
//     }


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

export const activateFreeMembership = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user already has an active membership
    const { data: existingMembership, error: checkError } =
      await supabase
        .from("memberships")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "ACTIVE")
        .maybeSingle();

    if (checkError) {
      console.error("Membership Check Error:", checkError);

      return res.status(500).json({
        success: false,
        message: "Unable to check membership",
      });
    }

    // Already has an active membership
    if (existingMembership) {
      return res.status(400).json({
        success: false,
        message: "You already have an active membership",
      });
    }

    // Create lifetime Free membership
    const { data: membership, error: membershipError } =
      await supabase
        .from("memberships")
        .insert([
          {
            user_id: userId,
            plan_name: "Free",
            duration: "Lifetime",
            amount: 0,
            payment_id: null,
            start_date: new Date().toISOString(),
            end_date: null,
            status: "ACTIVE",
          },
        ])
        .select()
        .single();

    if (membershipError) {
      console.error(
        "Free Membership Insert Error:",
        membershipError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to activate Free membership",
        error: membershipError.message,
      });
    }

    console.log(
      "✅ Free Membership Activated:",
      membership
    );

    return res.status(200).json({
      success: true,
      message: "Free membership activated successfully",
      membership,
    });

  } catch (error) {
    console.error(
      "Free Membership Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to activate Free membership",
      error: error.message,
    });
  }
};