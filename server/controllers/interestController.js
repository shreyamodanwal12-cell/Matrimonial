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

// ======================================================
// SEND MARRIAGE FINALIZATION REQUEST
// ======================================================

export const sendMarriageFinalizationRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // 1. Check accepted interest
    const { data: interest, error: interestError } = await supabase
      .from("interests")
      .select("*")
      .eq("id", id)
      .eq("status", "accepted")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .maybeSingle();

    if (interestError) {
      return res.status(500).json({
        success: false,
        message: interestError.message,
      });
    }

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Accepted connection not found",
      });
    }

    // 2. Find both users
    const user1Id = interest.sender_id;
    const user2Id = interest.receiver_id;

    // 3. Check if marriage request already exists
    const { data: existingRequest, error: existingError } = await supabase
      .from("marriage_finalization_requests")
      .select("id, status")
      .or(
        `and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`
      )
      .maybeSingle();

    if (existingError) {
      return res.status(500).json({
        success: false,
        message: existingError.message,
      });
    }

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: `Marriage request already exists with status: ${existingRequest.status}`,
      });
    }

    // 4. Create marriage finalization request
    const { data: request, error: insertError } = await supabase
      .from("marriage_finalization_requests")
      .insert([
        {
          user1_id: user1Id,
          user2_id: user2Id,
          requested_by: userId,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({
        success: false,
        message: insertError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Marriage finalization request sent to admin",
      request,
    });
  } catch (error) {
    console.error(
      "Send Marriage Finalization Request Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// ======================================================
// GET MARRIAGE FINALIZATION REQUESTS - ADMIN
// ======================================================

export const getMarriageFinalizationRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("marriage_finalization_requests")
      .select(`
        id,
        user1_id,
        user2_id,
        requested_by,
        status,
        admin_note,
        requested_at,
        reviewed_at,
        reviewed_by,

        user1:users!marriage_finalization_requests_user1_id_fkey (
          id,
          full_name,
          email,
          mobile,
          profile_photo,
          profile_status,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        ),

        user2:users!marriage_finalization_requests_user2_id_fkey (
          id,
          full_name,
          email,
          mobile,
          profile_photo,
          profile_status,
          matrimonial_profiles (
            gender,
            birth_date,
            state,
            address,
            education,
            profession
          )
        ),

        requester:users!marriage_finalization_requests_requested_by_fkey (
          id,
          full_name
        )
      `)
      .order("requested_at", { ascending: false });

    if (error) {
      console.error(
        "Get marriage finalization requests error:",
        error
      );

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
    console.error(
      "Get marriage finalization requests server error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch marriage finalization requests",
    });
  }
};

// ======================================================
// ADMIN APPROVE MARRIAGE FINALIZATION REQUEST
// ======================================================
export const approveMarriageFinalizationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    // 1. Get pending marriage request
    const { data: request, error: requestError } = await supabase
      .from("marriage_finalization_requests")
      .select("*")
      .eq("id", id)
      .eq("status", "Pending")
      .maybeSingle();

    if (requestError) {
      return res.status(500).json({
        success: false,
        message: requestError.message,
      });
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending marriage request not found",
      });
    }

    // 2. Create successful marriage record
    const { data: successfulMatch, error: matchError } = await supabase
      .from("successful_matches")
      .insert([
        {
          user1_id: request.user1_id,
          user2_id: request.user2_id,
          status: "Marriage Finalized",
          finalized_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (matchError) {
      return res.status(500).json({
        success: false,
        message: matchError.message,
      });
    }

    // 3. Update current marriage request
    const { error: updateError } = await supabase
      .from("marriage_finalization_requests")
      .update({
        status: "Approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: adminId,
        admin_note: "Marriage finalized by admin",
      })
      .eq("id", id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: updateError.message,
      });
    }

    // 4. Hide both users' profiles
    const { error: userError } = await supabase
      .from("users")
      .update({
        is_active: false,
      })
      .in("id", [request.user1_id, request.user2_id]);

    if (userError) {
      return res.status(500).json({
        success: false,
        message: userError.message,
      });
    }

    // 5. Cancel other pending marriage requests
    //    involving either of these two users
    const { error: cancelError } = await supabase
      .from("marriage_finalization_requests")
      .update({
        status: "Cancelled",
        reviewed_at: new Date().toISOString(),
        reviewed_by: adminId,
        admin_note:
          "Cancelled because one of the users' marriage was finalized with another member",
      })
      .eq("status", "Pending")
      .or(
        `user1_id.eq.${request.user1_id},user2_id.eq.${request.user1_id},user1_id.eq.${request.user2_id},user2_id.eq.${request.user2_id}`
      );

    if (cancelError) {
      console.error(
        "Cancel other marriage requests error:",
        cancelError
      );

      return res.status(500).json({
        success: false,
        message: cancelError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Marriage finalized successfully",
      successfulMatch,
    });
  } catch (error) {
    console.error("Approve marriage request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve marriage request",
    });
  }
};
export const rejectMarriageFinalizationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    // 1. Find pending marriage request
    const { data: request, error: requestError } = await supabase
      .from("marriage_finalization_requests")
      .select("*")
      .eq("id", id)
      .eq("status", "Pending")
      .maybeSingle();

    if (requestError) {
      return res.status(500).json({
        success: false,
        message: requestError.message,
      });
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending marriage request not found",
      });
    }

    // 2. Reject the request
    const { data: rejectedRequest, error: updateError } = await supabase
      .from("marriage_finalization_requests")
      .update({
        status: "Rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: adminId,
        admin_note: "Marriage request rejected by admin",
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: updateError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Marriage request rejected successfully",
      request: rejectedRequest,
    });
  } catch (error) {
    console.error("Reject marriage request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject marriage request",
    });
  }
};
// ======================================================
// FINALIZE MATCH / MARRIAGE
// ======================================================

export const finalizeMatch = async (req, res) => {
  try {
   
    const { id } = req.params;

    // 1. Check accepted match
    const { data: interest, error: findError } = await supabase
      .from("interests")
      .select("*")
      .eq("id", id)
      .eq("status", "accepted")
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
        message: "Accepted match not found",
      });
    }

    

    // 3. Check whether already finalized
    const { data: existingMatch, error: existingError } = await supabase
      .from("successful_matches")
      .select("id")
      .or(
        `and(user1_id.eq.${interest.sender_id},user2_id.eq.${interest.receiver_id}),and(user1_id.eq.${interest.receiver_id},user2_id.eq.${interest.sender_id})`
      )
      .maybeSingle();

    if (existingError) {
      return res.status(500).json({
        success: false,
        message: existingError.message,
      });
    }

    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: "This match is already finalized",
      });
    }

    // 4. Save successful match
    const { data: successfulMatch, error: insertError } = await supabase
      .from("successful_matches")
      .insert([
        {
          user1_id: interest.sender_id,
          user2_id: interest.receiver_id,
          status: "Marriage Finalized",
          finalized_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({
        success: false,
        message: insertError.message,
      });
    }

    // 5. Hide both profiles
    const { error: userUpdateError } = await supabase
      .from("users")
      .update({
        is_active: false,
      })
      .in("id", [
        interest.sender_id,
        interest.receiver_id,
      ]);

    if (userUpdateError) {
      console.error(
        "Profile hide error:",
        userUpdateError
      );
    }

    return res.status(200).json({
      success: true,
      message: "Marriage finalized successfully",
      match: successfulMatch,
    });
  } catch (error) {
    console.error("Finalize Match Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};