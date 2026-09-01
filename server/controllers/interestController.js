import supabase from "../config/supabase.js";
// Send Interest
export const sendInterest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiver_id } = req.body;

    if (!receiver_id) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    if (senderId === receiver_id) {
      return res.status(400).json({
        success: false,
        message: "You cannot send interest to yourself",
      });
    }

    const { data: existingInterest, error: existingError } = await supabase
      .from("interests")
      .select("id, status")
      .eq("sender_id", senderId)
      .eq("receiver_id", receiver_id)
      .maybeSingle();

    if (existingError) {
      return res.status(500).json({
        success: false,
        message: existingError.message,
      });
    }

    if (existingInterest) {
      return res.status(400).json({
        success: false,
        message: `Interest already exists with status: ${existingInterest.status}`,
      });
    }

    const { data, error } = await supabase
      .from("interests")
      .insert([
        {
          sender_id: senderId,
          receiver_id,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Interest sent successfully",
      interest: data,
    });
  } catch (error) {
    console.error("Send Interest Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get My Interests
export const getMyInterests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      interests: data,
    });
  } catch (error) {
    console.error("Get Interests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Accept Interest
export const acceptInterest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data: interest, error: findError } = await supabase
      .from("interests")
      .select("*")
      .eq("id", id)
      .eq("receiver_id", userId)
      .eq("status", "pending")
      .maybeSingle();

    if (findError) {
      return res.status(500).json({
        success: false,
        message: findError.message,
      });
    }

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Pending interest not found",
      });
    }

    const { data, error } = await supabase
      .from("interests")
      .update({
        status: "accepted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interest accepted successfully",
      interest: data,
    });
  } catch (error) {
    console.error("Accept Interest Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Reject Interest
export const rejectInterest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data: interest, error: findError } = await supabase
      .from("interests")
      .select("*")
      .eq("id", id)
      .eq("receiver_id", userId)
      .eq("status", "pending")
      .maybeSingle();

    if (findError) {
      return res.status(500).json({
        success: false,
        message: findError.message,
      });
    }

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Pending interest not found",
      });
    }

    const { data, error } = await supabase
      .from("interests")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interest rejected successfully",
      interest: data,
    });
  } catch (error) {
    console.error("Reject Interest Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get Matches
export const getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        sender:users!interests_sender_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        ),
        receiver:users!interests_receiver_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        )
      `)
      .eq("status", "accepted")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get matches error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      matches: data,
    });
  } catch (error) {
    console.error("Get matches server error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get matches",
    });
  }
};

export const getAllMatches = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at,

        sender:users!interests_sender_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        ),

        receiver:users!interests_receiver_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        )
      `)
      .eq("status", "accepted")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get all matches error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      matches: data,
    });
  } catch (error) {
    console.error("Get all matches server error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all matches",
    });
  }
};

export const getReceivedInterests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at,
        sender:users!interests_sender_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            state,
            education,
            profession,
            birth_date
          )
        )
      `)
      .eq("receiver_id", userId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get received interests error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      requests: data || [],
    });
  } catch (error) {
    console.error("Received interests error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interest requests",
    });
  }
};

// ======================================================
// GET SENT INTERESTS
// ======================================================

export const getSentInterests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at,

        receiver:users!interests_receiver_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            state,
            education,
            profession,
            birth_date
          )
        )
      `)
      .eq("sender_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get sent interests error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      interests: data || [],
    });

  } catch (error) {
    console.error("Sent interests error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch sent interests",
    });
  }
};

// ======================================================
// GET ALL INTERESTS - ADMIN
// ======================================================

export const getAllInterests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at,

        sender:users!interests_sender_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        ),

        receiver:users!interests_receiver_id_fkey (
          id,
          full_name,
          profile_photo,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get all interests error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      interests: data || [],
    });
  } catch (error) {
    console.error("Get all interests server error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all interests",
    });
  }
};