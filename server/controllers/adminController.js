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
// ==========================================
// CASTE MANAGEMENT
// ==========================================

// Get all castes
export const getCastes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("castes")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Get Castes Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch castes",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      castes: data,
    });
  } catch (error) {
    console.error("Get Castes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Add new caste
export const addCaste = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Caste name is required",
      });
    }

    const { data, error } = await supabase
      .from("castes")
      .insert([
        {
          name: name.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Add Caste Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to add caste",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Caste added successfully",
      caste: data,
    });
  } catch (error) {
    console.error("Add Caste Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Get all sub-castes
export const getSubCastes = async (req, res) => {
  try {
    const { caste_id } = req.query;

    let query = supabase
      .from("sub_castes")
      .select(`
        id,
        name,
        caste_id,
        castes (
          id,
          name
        )
      `)
      .order("name", { ascending: true });

    if (caste_id) {
      query = query.eq("caste_id", caste_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Get Sub-Castes Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch sub-castes",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      subCastes: data,
    });
  } catch (error) {
    console.error("Get Sub-Castes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Add new sub-caste
export const addSubCaste = async (req, res) => {
  try {
    const { caste_id, name } = req.body;

    if (!caste_id) {
      return res.status(400).json({
        success: false,
        message: "Caste is required",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Sub-caste name is required",
      });
    }

    const { data, error } = await supabase
      .from("sub_castes")
      .insert([
        {
          caste_id,
          name: name.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Add Sub-Caste Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to add sub-caste",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Sub-caste added successfully",
      subCaste: data,
    });
  } catch (error) {
    console.error("Add Sub-Caste Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};