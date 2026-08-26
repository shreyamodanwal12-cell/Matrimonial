import supabase from "../config/supabase.js";


// ======================================================
// GET ALL PROFILES
// ======================================================

export const getAllProfiles = async (req, res) => {
  try {
    const { data: profiles, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        mobile,
        profile_photo,
        profile_status,
        role,
        is_active,
        created_at,
        matrimonial_profiles (
          profile_for,
          gender,
          birth_date,
          birth_place,
          marital_status,
          address,
          religion,
          caste,
          sub_caste,
          mother_tongue,
          state,
          native_place,
          education,
          profession,
          annual_income,
          employment_type,
          job_details
        ),
        education_details (
          highest_qualification,
          specialization,
          college_name,
          university_name,
          profession,
          company_name,
          job_title,
          employment_type,
          work_location,
          annual_income,
          job_experience,
          certificate,
          years_of_experience
        ),
        family_details (
          father_name,
          father_occupation,
          mother_name,
          mother_occupation,
          brothers,
          sisters,
          family_type,
          family_status,
          family_values,
          about_family
        ),
        lifestyle_preferences (
          diet,
          smoking,
          drinking,
          hobbies,
          interests,
          partner_age_from,
          partner_age_to,
          partner_education,
          partner_profession,
          partner_religion,
          partner_location
        )
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
    console.error("Get profiles error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// ======================================================
// UPLOAD PROFILE PHOTO
// ======================================================

export const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    const fileExt = req.file.originalname.split(".").pop();

    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error(
        "Profile photo upload error:",
        uploadError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to upload profile photo",
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    const photoUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("users")
      .update({
        profile_photo: photoUrl,
      })
      .eq("id", userId);

    if (updateError) {
      console.error(
        "Profile photo database error:",
        updateError
      );

      return res.status(500).json({
        success: false,
        message: "Photo uploaded but profile update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully",
      photoUrl,
    });

  } catch (error) {

    console.error(
      "Upload profile photo error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// ======================================================
// UPLOAD CERTIFICATE
// ======================================================

export const uploadCertificate = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Certificate is required",
      });
    }

    const fileExt = req.file.originalname.split(".").pop();

    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error(
        "Certificate upload error:",
        uploadError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to upload certificate",
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(filePath);

    const certificateUrl =
      publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("education_details")
      .update({
        certificate: certificateUrl,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error(
        "Certificate database error:",
        updateError
      );

      return res.status(500).json({
        success: false,
        message:
          "Certificate uploaded but database update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate uploaded successfully",
      certificateUrl,
    });

  } catch (error) {

    console.error(
      "Upload certificate error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// UPDATE PROFILE STATUS (ADMIN)
// ======================================================

export const updateProfileStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { profile_status } = req.body;

    // Only Approved or Rejected are allowed
    if (!["Approved", "Rejected"].includes(profile_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile status",
      });
    }

    const { data: profile, error } = await supabase
      .from("users")
      .update({
        profile_status,
      })
      .eq("id", id)
      .eq("role", "user")
      .select("id, full_name, profile_status")
      .single();

    if (error) {
      console.error("Update profile status error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update profile status",
      });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Profile ${profile_status.toLowerCase()} successfully`,
      profile,
    });
  } catch (error) {
    console.error("Update profile status error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// UPDATE MY MATRIMONIAL PROFILE
// ======================================================

export const updateMyMatrimonialProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      profile_for,
      gender,
      birth_date,
      birth_place,
      marital_status,
      address,
      religion,
      caste,
      sub_caste,
      mother_tongue,
      state,
      native_place,
      education,
      profession,
      annual_income,
      employment_type,
      job_details,
    } = req.body;

    const { data: profile, error } = await supabase
      .from("matrimonial_profiles")
      .update({
        profile_for: profile_for || null,
        gender: gender || null,
        birth_date: birth_date || null,
        birth_place: birth_place || null,
        marital_status: marital_status || null,
        address: address || null,
        religion: religion || null,
        caste: caste || null,
        sub_caste: sub_caste || null,
        mother_tongue: mother_tongue || null,
        state: state || null,
        native_place: native_place || null,
        education: education || null,
        profession: profession || null,
        annual_income: annual_income || null,
        employment_type: employment_type || null,
        job_details: job_details || null,
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Update matrimonial profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update matrimonial profile",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Matrimonial profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update matrimonial profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// UPDATE MY FAMILY DETAILS
// ======================================================

export const updateMyFamilyDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      father_name,
      father_occupation,
      mother_name,
      mother_occupation,
      brothers,
      sisters,
      family_type,
      family_status,
      family_values,
      about_family,
    } = req.body;

    const { data: family, error } = await supabase
      .from("family_details")
      .update({
        father_name: father_name || null,
        father_occupation: father_occupation || null,
        mother_name: mother_name || null,
        mother_occupation: mother_occupation || null,
        brothers:
          brothers !== "" && brothers != null
            ? Number(brothers)
            : null,
        sisters:
          sisters !== "" && sisters != null
            ? Number(sisters)
            : null,
        family_type: family_type || null,
        family_status: family_status || null,
        family_values: family_values || null,
        about_family: about_family || null,
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Update family details error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update family details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Family details updated successfully",
      family,
    });
  } catch (error) {
    console.error("Update family details error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
     if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
// =========================
// CHECK LOGIN
// =========================

const loggedInUserId = req.user.id;

if (!loggedInUserId) {
  return res.status(401).json({
    success: false,
    message: "Please login first",
  });
}

// =========================
// CHECK ACTIVE MEMBERSHIP
// =========================

const { data: membership, error: membershipError } = await supabase
  .from("memberships")
  .select("id, status, end_date")
  .eq("user_id", loggedInUserId)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

if (membershipError) {
  console.error("Membership Check Error:", membershipError);

  return res.status(500).json({
    success: false,
    message: "Unable to verify membership",
  });
}

const hasActiveMembership =
  membership &&
  membership.status === "ACTIVE" &&
  new Date(membership.end_date) >= new Date();

if (!hasActiveMembership) {
  return res.status(403).json({
    success: false,
    message: "Please purchase a membership package to view profiles",
    requiresMembership: true,
  });
}


   

    // =========================
    // USER BASIC DETAILS
    // =========================
    const { data: user, error: userError } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        profile_photo,
        profile_status,
        created_at
      `)
      .eq("id", userId)
      .eq("role", "user")
      .eq("is_active", true)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // =========================
    // MATRIMONIAL DETAILS
    // =========================
    const { data: matrimonial, error: matrimonialError } =
      await supabase
        .from("matrimonial_profiles")
        .select(`
          profile_for,
          gender,
          birth_date,
          birth_time,
          birth_place,
          marital_status,
          address,
          religion,
          caste,
          sub_caste,
          mother_tongue,
          state,
          native_place,
          education,
          profession,
          annual_income,
          employment_type,
          job_details
        `)
        .eq("user_id", userId)
        .maybeSingle();

    if (matrimonialError) {
      console.error("Matrimonial Details Error:", matrimonialError);
    }

    // =========================
    // EDUCATION DETAILS
    // =========================
    const { data: education, error: educationError } =
      await supabase
        .from("education_details")
        .select(`
          highest_qualification,
          specialization,
          college_name,
          university_name,
          profession,
          company_name,
          job_title,
          employment_type,
          work_location,
          annual_income,
          job_experience,
          years_of_experience,
          certificate
        `)
        .eq("user_id", userId)
        .maybeSingle();

    if (educationError) {
      console.error("Education Details Error:", educationError);
    }

    // =========================
    // FAMILY DETAILS
    // =========================
    const { data: family, error: familyError } =
      await supabase
        .from("family_details")
        .select(`
          father_name,
          father_occupation,
          mother_name,
          mother_occupation,
          brothers,
          sisters,
          family_type,
          family_status,
          family_values,
          about_family
        `)
        .eq("user_id", userId)
        .maybeSingle();

    if (familyError) {
      console.error("Family Details Error:", familyError);
    }

    // =========================
    // LIFESTYLE DETAILS
    // =========================
    const { data: lifestyle, error: lifestyleError } =
      await supabase
        .from("lifestyle_preferences")
        .select(`
          diet,
          smoking,
          drinking,
          hobbies,
          interests,
          partner_age_from,
          partner_age_to,
          partner_education,
          partner_profession,
          partner_religion,
          partner_location
        `)
        .eq("user_id", userId)
        .maybeSingle();

    if (lifestyleError) {
      console.error("Lifestyle Details Error:", lifestyleError);
    }

    // =========================
    // FINAL PUBLIC PROFILE
    // =========================
    return res.status(200).json({
      success: true,

      profile: {
        user,
        matrimonial: matrimonial || {},
        education: education || {},
        family: family || {},
        lifestyle: lifestyle || {},
      },
    });

  } catch (error) {
    console.error("Public Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch public profile",
    });
  }
};