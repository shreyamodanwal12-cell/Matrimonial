import supabase from "../config/supabase.js";
export const getMemberForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    const { data, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        mobile,
        role,
        is_active,
        profile_status,
        profile_photo,
        created_at,
        matrimonial_profiles (*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Get Admin Member Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch member",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      profile: data,
    });
  } catch (error) {
    console.error("Get Admin Member Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      email,
      mobile,
      profile_status,
      is_active,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name,
        email,
        mobile,
        profile_status,
        is_active,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update Member Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update member",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member: data,
    });

  } catch (error) {
    console.error("Admin Update Member Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};