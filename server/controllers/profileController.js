import supabase from "../config/supabase.js";

export const getAllProfiles = async (req, res) => {
  try {
    const { data: profiles, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        mobile,
        role,
        is_active,
        created_at
      `)
      .eq("role", "user")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get profiles error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch profiles",
      });
    }

    return res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};