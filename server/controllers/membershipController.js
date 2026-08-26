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