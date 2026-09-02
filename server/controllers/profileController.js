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
        ),
        memberships (
  plan_name,
  status,
  start_date,
  end_date
),
payments (
  plan_name,
  amount,
  payment_status,
  payment_method,
  transaction_id,
  paid_at,
  expires_at
),
          profile_documents (
  aadhar_card,
  photo_1,
  photo_2,
  photo_3
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




export const getFeaturedProfiles = async (req, res) => {
  try {
    // ==========================================
    // 1. LOGGED-IN USER
    // ==========================================

    const userId = req.user.id;

    // ==========================================
    // 2. GET ACTIVE MEMBERSHIP
    // ==========================================

    const { data: membership, error: membershipError } =
      await supabase
        .from("memberships")
        .select("plan_name, end_date, status")
        .eq("user_id", userId)
        .eq("status", "ACTIVE")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (membershipError) {
      console.error(
        "Membership Fetch Error:",
        membershipError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to check membership",
      });
    }

    // ==========================================
    // 3. CHECK MEMBERSHIP EXISTS
    // ==========================================

    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "Active membership required",
      });
    }

    // ==========================================
    // 4. CHECK MEMBERSHIP EXPIRY
    // ==========================================

    const now = new Date();
    const expiryDate = new Date(membership.end_date);

    if (expiryDate < now) {
      return res.status(403).json({
        success: false,
        message: "Your membership has expired",
      });
    }

    // ==========================================
    // 5. PLAN KE ACCORDING PROFILE LIMIT
    // ==========================================

    let profileLimit = 0;

    if (membership.plan_name === "Basic") {
      profileLimit = 10;
    } else if (membership.plan_name === "Premium") {
      profileLimit = 50;
    } else if (membership.plan_name === "Royal") {
      profileLimit = null; // Unlimited
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid membership plan",
      });
    }

    // ==========================================
    // 6. GET APPROVED PROFILES
    // ==========================================

    let query = supabase
      .from("users")
      .select(`
        id,
        full_name,
        profile_photo,
        profile_status,
        is_active,
        matrimonial_profiles (
          gender,
          birth_date,
          education,
          profession,
          state,
          native_place
        ),
        education_details (
          highest_qualification,
          profession,
          job_title,
          work_location
        )
      `)
      .eq("role", "user")
      .eq("profile_status", "Approved")
      .eq("is_active", true)
      .neq("id", userId)
      .order("created_at", {
        ascending: false,
      });

    // ==========================================
    // 7. BASIC / PREMIUM LIMIT
    // ==========================================

    if (profileLimit !== null) {
      query = query.limit(profileLimit);
    }

    // ==========================================
    // 8. EXECUTE QUERY
    // ==========================================

    const { data: profiles, error: profilesError } =
      await query;

    if (profilesError) {
      console.error(
        "Featured profiles error:",
        profilesError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to fetch profiles",
      });
    }

    // ==========================================
    // 9. RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      plan: membership.plan_name,
      profileLimit:
        profileLimit === null
          ? "Unlimited"
          : profileLimit,
      profiles: profiles || [],
    });

  } catch (error) {
    console.error(
      "Featured Profiles Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch featured profiles",
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
// UPLOAD AADHAAR CARD
// ======================================================

export const uploadAadharCard = async (req, res) => {
  try {
    console.log("========== AADHAAR UPLOAD ==========");
    console.log("REQ.USER:", req.user);
    console.log("REQ.FILE:", req.file);
    const userId = req.user.id;

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar card is required",
      });
    }

    // Allow only image/PDF files
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPG, PNG or PDF files are allowed",
      });
    }

    // File extension
    const fileExt = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("aadhar-cards")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error(
        "Aadhaar upload error:",
        uploadError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to upload Aadhaar card",
      });
    }

    // Create signed URL because bucket is private
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("aadhar-cards")
        .createSignedUrl(filePath, 60 * 60);

    if (signedUrlError) {
      console.error(
        "Aadhaar signed URL error:",
        signedUrlError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to create Aadhaar URL",
      });
    }

    const aadharUrl = signedUrlData.signedUrl;

    // Check whether document record already exists
    const { data: existingDocument, error: findError } =
      await supabase
        .from("profile_documents")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (findError) {
      console.error(
        "Find profile document error:",
        findError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to find profile document",
      });
    }

    let document;
    let databaseError;

    if (existingDocument) {
      // Update existing record
      const result = await supabase
        .from("profile_documents")
        .update({
          aadhar_card: aadharUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      document = result.data;
      databaseError = result.error;
    } else {
      // Create new record
      const result = await supabase
        .from("profile_documents")
        .insert([
          {
            user_id: userId,
            aadhar_card: aadharUrl,
          },
        ])
        .select()
        .single();

      document = result.data;
      databaseError = result.error;
    }

    if (databaseError) {
      console.error(
        "Aadhaar database error:",
        databaseError
      );

      return res.status(500).json({
        success: false,
        message: "Aadhaar uploaded but database update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Aadhaar card uploaded successfully",
      document,
    });

  } catch (error) {
    console.error(
      "Upload Aadhaar error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// UPLOAD PROFILE DOCUMENT PHOTO
// ======================================================

export const uploadDocumentPhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const { photoNumber } = req.params;

    // Only photo_1, photo_2, photo_3 are allowed
    const allowedPhotos = ["photo_1", "photo_2", "photo_3"];

    if (!allowedPhotos.includes(photoNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo number",
      });
    }

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    // Allow only images
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPG, PNG or WEBP images are allowed",
      });
    }

    // File extension
    const fileExt = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    const fileName = `${userId}-${photoNumber}-${Date.now()}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error(
        "Document photo upload error:",
        uploadError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to upload photo",
      });
    }

    // Create public URL
    const { data: publicUrlData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    const photoUrl = publicUrlData.publicUrl;

    // Check profile_documents record
    const { data: existingDocument, error: findError } =
      await supabase
        .from("profile_documents")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (findError) {
      console.error(
        "Find profile document error:",
        findError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to find profile document",
      });
    }

    let document;
    let databaseError;

    if (existingDocument) {
      // Update selected photo
      const result = await supabase
        .from("profile_documents")
        .update({
          [photoNumber]: photoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      document = result.data;
      databaseError = result.error;
    } else {
      // Create profile_documents record
      const result = await supabase
        .from("profile_documents")
        .insert([
          {
            user_id: userId,
            [photoNumber]: photoUrl,
          },
        ])
        .select()
        .single();

      document = result.data;
      databaseError = result.error;
    }

    if (databaseError) {
      console.error(
        "Document photo database error:",
        databaseError
      );

      return res.status(500).json({
        success: false,
        message: "Photo uploaded but database update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${photoNumber} uploaded successfully`,
      document,
    });

  } catch (error) {
    console.error(
      "Upload document photo error:",
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

// ======================================================
// CHECK AADHAAR VERIFICATION
// ======================================================

export const checkAadharVerification = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("profile_documents")
      .select("aadhar_card")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Aadhaar Check Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to check Aadhaar verification",
      });
    }

    const isVerified =
      !!data?.aadhar_card;

    return res.status(200).json({
      success: true,
      isVerified,
    });

  } catch (error) {
    console.error(
      "Aadhaar Verification Check Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const hideProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { hiddenUserId } = req.params;

    if (!hiddenUserId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    if (userId === hiddenUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot hide your own profile",
      });
    }

    const { data, error } = await supabase
      .from("hidden_profiles")
      .insert([
        {
          user_id: userId,
          hidden_user_id: hiddenUserId,
        },
      ])
      .select()
      .single();

    if (error) {
      // Already hidden
      if (error.code === "23505") {
        return res.status(200).json({
          success: true,
          message: "Profile is already hidden",
        });
      }

      console.error("Hide profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to hide profile",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile hidden successfully",
      data,
    });
  } catch (error) {
    console.error("Hide profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const unhideProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { hiddenUserId } = req.params;

    if (!hiddenUserId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    const { error } = await supabase
      .from("hidden_profiles")
      .delete()
      .eq("user_id", userId)
      .eq("hidden_user_id", hiddenUserId);

    if (error) {
      console.error(
        "Unhide profile error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Unable to unhide profile",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile unhidden successfully",
    });
  } catch (error) {
    console.error(
      "Unhide profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getHiddenProfiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: hiddenProfiles, error } = await supabase
      .from("hidden_profiles")
      .select("hidden_user_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Get hidden profiles error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch hidden profiles",
      });
    }

    const hiddenUserIds = (hiddenProfiles || []).map(
      (profile) => profile.hidden_user_id
    );

    if (hiddenUserIds.length === 0) {
      return res.status(200).json({
        success: true,
        profiles: [],
      });
    }

    const { data: profiles, error: profilesError } = await supabase
      .from("users")
      .select("id, full_name, profile_photo")
      .in("id", hiddenUserIds);

    if (profilesError) {
      console.error("Get hidden users error:", profilesError);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch hidden profiles",
      });
    }

    return res.status(200).json({
      success: true,
      profiles: profiles || [],
    });
  } catch (error) {
    console.error("Get hidden profiles error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const reportProfile = async (req, res) => {
  try {
    const reporterId = req.user.id;
    const { reportedUserId } = req.params;
    const { reason, explanation } = req.body;

    if (!reportedUserId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    if (reporterId === reportedUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot report your own profile",
      });
    }

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Report reason is required",
      });
    }

    const { data, error } = await supabase
      .from("profile_reports")
      .insert([
        {
          reporter_id: reporterId,
          reported_user_id: reportedUserId,
          reason,
          explanation: explanation || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Report profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to submit report",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Profile reported successfully",
      report: data,
    });
  } catch (error) {
    console.error("Report profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: reports, error } = await supabase
      .from("profile_reports")
      .select(`
        id,
        reported_user_id,
        reason,
        explanation,
        status,
        admin_note,
        created_at
      `)
      .eq("reporter_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get my reports error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch reports",
      });
    }

    const reportedUserIds = [
      ...new Set(
        (reports || []).map((report) => report.reported_user_id)
      ),
    ];

    let users = [];

    if (reportedUserIds.length > 0) {
      const { data: userData, error: usersError } = await supabase
        .from("users")
        .select("id, full_name, profile_photo")
        .in("id", reportedUserIds);

      if (usersError) {
        console.error("Get reported users error:", usersError);

        return res.status(500).json({
          success: false,
          message: "Unable to fetch reported profiles",
        });
      }

      users = userData || [];
    }

    const formattedReports = (reports || []).map((report) => ({
      ...report,
      reportedUser:
        users.find(
          (user) => user.id === report.reported_user_id
        ) || null,
    }));

    return res.status(200).json({
      success: true,
      reports: formattedReports,
    });
  } catch (error) {
    console.error("Get my reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllProfileReports = async (req, res) => {
  try {
    const { data: reports, error } = await supabase
      .from("profile_reports")
      .select(`
        id,
        reporter_id,
        reported_user_id,
        reason,
        explanation,
        status,
        admin_note,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get all profile reports error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch profile reports",
      });
    }

    const allReports = reports || [];

    // ---------------------------------------------
    // Get all reporter + reported profile IDs
    // ---------------------------------------------

    const userIds = [
      ...new Set(
        allReports.flatMap((report) => [
          report.reporter_id,
          report.reported_user_id,
        ])
      ),
    ];

    let users = [];

    if (userIds.length > 0) {
      const { data: userData, error: usersError } =
        await supabase
          .from("users")
          .select("id, full_name, profile_photo")
          .in("id", userIds);

      if (usersError) {
        console.error(
          "Get report users error:",
          usersError
        );

        return res.status(500).json({
          success: false,
          message: "Unable to fetch report users",
        });
      }

      users = userData || [];
    }

    // ---------------------------------------------
    // Group reports by reported profile
    // ---------------------------------------------

    const groupedReports = {};

    allReports.forEach((report) => {
      const reportedUserId = report.reported_user_id;

      if (!groupedReports[reportedUserId]) {
        const reportedUser = users.find(
          (user) => user.id === reportedUserId
        );

        groupedReports[reportedUserId] = {
          reportedUserId,
          reportedUser: reportedUser || null,
          totalReports: 0,
          reports: [],
          latestReport: report.created_at,
        };
      }

      const reporter = users.find(
        (user) => user.id === report.reporter_id
      );

      groupedReports[reportedUserId].totalReports += 1;

      groupedReports[reportedUserId].reports.push({
        id: report.id,

        reporter: reporter || null,

        reason: report.reason,

        explanation: report.explanation,

        status: report.status,

        admin_note: report.admin_note,

        created_at: report.created_at,
      });
    });

    // ---------------------------------------------
    // Convert object into array
    // ---------------------------------------------

    const groupedReportList = Object.values(
      groupedReports
    );

    return res.status(200).json({
      success: true,
      reports: groupedReportList,
    });
  } catch (error) {
    console.error(
      "Get all profile reports error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
