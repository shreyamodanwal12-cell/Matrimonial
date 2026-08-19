import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const registerUser = async (req, res) => {
  try {
    const {
      step1,
      step2,
      step3,
      step4,
    } = req.body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (
      !step1 ||
      !step2 ||
      !step3 ||
      !step4
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete registration data is required",
      });
    }

    const {
      fullName,
      contactNumber,
    } = step1;

    const {
      email,
      password,
      confirmPassword,
    } = step4;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // -----------------------------
    // Check existing email
    // -----------------------------

    const {
      data: existingUser,
      error: existingUserError,
    } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUserError) {
      console.error(existingUserError);

      return res.status(500).json({
        success: false,
        message: "Unable to check existing user",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // -----------------------------
    // Create user
    // -----------------------------

    const {
      data: user,
      error: userError,
    } = await supabase
      .from("users")
      .insert([
        {
          full_name: fullName,
          email,
          mobile: contactNumber || null,
          password: hashedPassword,
          role: "user",
          is_active: true,
        },
      ])
      .select(
        "id, full_name, email, mobile, role, is_active, created_at"
      )
      .single();

    if (userError) {
      console.error("User creation error:", userError);

      return res.status(500).json({
        success: false,
        message: "Unable to create user",
      });
    }

    // -----------------------------
    // Create matrimonial profile
    // -----------------------------

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("matrimonial_profiles")
      .insert([
        {
          user_id: user.id,

          profile_for: step1.profileFor || null,
          gender: step1.gender || null,
          birth_date: step1.birthDate || null,
          birth_time: step1.birthTime || null,
          birth_place: step1.birthPlace || null,
          marital_status: step1.maritalStatus || null,

          address: step1.address || null,
          religion: step1.religion || null,
          caste: step1.caste || null,
          sub_caste: step1.subCaste || null,
          mother_tongue: step1.motherTongue || null,
          state: step1.state || null,
          native_place: step1.nativePlace || null,

          education: step1.education || null,
          profession: step1.profession || null,
          annual_income: step1.annualIncome || null,
          employment_type: step1.employmentType || null,
          job_details: step1.jobDetails || null,
        },
      ])
      .select()
      .single();

    if (profileError) {
      console.error(
        "Matrimonial profile error:",
        profileError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to save matrimonial profile",
      });
    }

    // -----------------------------
    // Create family details
    // -----------------------------

    const {
      error: familyError,
    } = await supabase
      .from("family_details")
      .insert([
        {
          user_id: user.id,

          father_name: step2.fatherName || null,
          father_occupation:
            step2.fatherOccupation || null,

          mother_name: step2.motherName || null,
          mother_occupation:
            step2.motherOccupation || null,

          brothers:
            step2.brothers
              ? Number(step2.brothers)
              : null,

          sisters:
            step2.sisters
              ? Number(step2.sisters)
              : null,

          family_type: step2.familyType || null,
          family_status: step2.familyStatus || null,
          family_values: step2.familyValues || null,
        },
      ]);

    if (familyError) {
      console.error(
        "Family details error:",
        familyError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to save family details",
      });
    }

    // -----------------------------
    // Create education details
    // -----------------------------

    const {
      error: educationError,
    } = await supabase
      .from("education_details")
      .insert([
        {
          user_id: user.id,

          highest_qualification:
            step3.highestQualification || null,

          specialization:
            step3.specialization || null,

          college_name:
            step3.collegeName || null,

          university_name:
            step3.universityName || null,

          profession:
            step3.profession || null,

          company_name:
            step3.companyName || null,

          job_title:
            step3.jobTitle || null,

          employment_type:
            step3.employmentType || null,

          work_location:
            step3.workLocation || null,

          annual_income:
            step3.annualIncome || null,
        },
      ]);

    if (educationError) {
      console.error(
        "Education details error:",
        educationError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to save education details",
      });
    }

    // -----------------------------
    // Create lifestyle preferences
    // -----------------------------

    const {
      error: lifestyleError,
    } = await supabase
      .from("lifestyle_preferences")
      .insert([
        {
          user_id: user.id,

          diet: step4.diet || null,
          smoking: step4.smoking || null,
          drinking: step4.drinking || null,

          hobbies: step4.hobbies || null,
          interests: step4.interests || null,

          partner_age_from:
            step4.partnerAgeFrom
              ? Number(step4.partnerAgeFrom)
              : null,

          partner_age_to:
            step4.partnerAgeTo
              ? Number(step4.partnerAgeTo)
              : null,

          partner_education:
            step4.partnerEducation || null,

          partner_profession:
            step4.partnerProfession || null,

          partner_religion:
            step4.partnerReligion || null,

          partner_location:
            step4.partnerLocation || null,
        },
      ]);

    if (lifestyleError) {
      console.error(
        "Lifestyle preferences error:",
        lifestyleError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to save lifestyle preferences",
      });
    }

    // -----------------------------
    // Success
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Registration completed successfully",
      user,
      profile,
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to find user",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, full_name, email, mobile, role, is_active, created_at")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};