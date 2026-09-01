import supabase from "../config/supabase.js";

export const getAdminReports = async (req, res) => {
  try {
    // =====================================================
    // 0. PERIOD FILTER
    // =====================================================

    const period = req.query.period || "year";

    const now = new Date();

    let startDate;

    if (period === "week") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === "month") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
    } else {
      // This Year
      startDate = new Date(
        now.getFullYear(),
        0,
        1
      );
    }

    const startDateISO = startDate.toISOString();


    // =====================================================
    // 1. TOTAL MEMBERS
    // =====================================================

    const {
      count: totalMembers,
      error: totalMembersError,
    } = await supabase
      .from("users")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("role", "user");

    if (totalMembersError) {
      throw totalMembersError;
    }


    // =====================================================
    // 2. ACTIVE PROFILES
    // =====================================================

    const {
      count: activeProfiles,
      error: activeProfilesError,
    } = await supabase
      .from("users")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("role", "user")
      .eq("is_active", true)
      .eq("profile_status", "Approved");

    if (activeProfilesError) {
      throw activeProfilesError;
    }


    // =====================================================
    // 3. ALL INTERESTS
    // =====================================================

    const {
      data: interests,
      error: interestsError,
    } = await supabase
      .from("interests")
      .select(
        "id, sender_id, receiver_id, status, created_at"
      )
      .order("created_at", {
        ascending: false,
      });

    if (interestsError) {
      throw interestsError;
    }

    const allInterests = interests || [];


    // =====================================================
    // 4. PERIOD INTERESTS
    // =====================================================

    const periodInterests = allInterests.filter(
      (interest) => {
        if (!interest.created_at) return false;

        return (
          new Date(interest.created_at) >=
          startDate
        );
      }
    );


    // =====================================================
    // 5. INTEREST COUNTS
    // =====================================================

    const totalInterests =
      periodInterests.length;

    const acceptedInterests =
      periodInterests.filter(
        (item) =>
          item.status?.toLowerCase() ===
          "accepted"
      ).length;

    const pendingInterests =
      periodInterests.filter(
        (item) =>
          item.status?.toLowerCase() ===
          "pending"
      ).length;

    const rejectedInterests =
      periodInterests.filter(
        (item) =>
          item.status?.toLowerCase() ===
          "rejected"
      ).length;


    // =====================================================
    // 6. GENDER DISTRIBUTION
    // =====================================================

    const {
      data: profiles,
      error: profilesError,
    } = await supabase
      .from("matrimonial_profiles")
      .select("user_id, gender");

    if (profilesError) {
      throw profilesError;
    }

    const allProfiles = profiles || [];

    const maleCount = allProfiles.filter(
      (profile) =>
        profile.gender?.toLowerCase() ===
        "male"
    ).length;

    const femaleCount = allProfiles.filter(
      (profile) =>
        profile.gender?.toLowerCase() ===
        "female"
    ).length;

    const totalGenderProfiles =
      maleCount + femaleCount;

    const malePercentage =
      totalGenderProfiles > 0
        ? Math.round(
            (maleCount /
              totalGenderProfiles) *
              100
          )
        : 0;

    const femalePercentage =
      totalGenderProfiles > 0
        ? Math.round(
            (femaleCount /
              totalGenderProfiles) *
              100
          )
        : 0;


    // =====================================================
    // 7. USERS
    // =====================================================

    const {
      data: users,
      error: usersError,
    } = await supabase
      .from("users")
      .select(
        "id, full_name, created_at, role"
      )
      .eq("role", "user");

    if (usersError) {
      throw usersError;
    }

    const allUsers = users || [];


    // =====================================================
    // 8. MONTHLY DATA
    // =====================================================

    const currentYear =
      now.getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData =
      monthNames.map((month) => ({
        month,
        registrations: 0,
        matches: 0,
      }));


    // =====================================================
    // 9. REGISTRATIONS
    // =====================================================

    allUsers.forEach((user) => {
      if (!user.created_at) return;

      const date =
        new Date(user.created_at);

      // Only selected period
      if (date < startDate) return;

      // Chart is monthly, so only current year
      if (
        date.getFullYear() !==
        currentYear
      ) {
        return;
      }

      const monthIndex =
        date.getMonth();

      monthlyData[
        monthIndex
      ].registrations += 1;
    });


    // =====================================================
    // 10. ACCEPTED MATCHES
    // =====================================================

    periodInterests.forEach(
      (interest) => {
        if (
          interest.status?.toLowerCase() !==
          "accepted"
        ) {
          return;
        }

        const date =
          new Date(interest.created_at);

        if (
          date.getFullYear() !==
          currentYear
        ) {
          return;
        }

        const monthIndex =
          date.getMonth();

        monthlyData[
          monthIndex
        ].matches += 1;
      }
    );


    // =====================================================
    // 11. RECENT ACTIVITY
    // =====================================================

    const recentRegistrations =
      allUsers
        .filter((user) => {
          if (!user.created_at)
            return false;

          return (
            new Date(
              user.created_at
            ) >= startDate
          );
        })
        .sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        )
        .slice(0, 5);


    const recentAccepted =
      periodInterests
        .filter(
          (interest) =>
            interest.status?.toLowerCase() ===
            "accepted"
        )
        .slice(0, 5);


    const recentActivity = [];


    recentRegistrations.forEach(
      (user) => {
        recentActivity.push({
          icon: "👤",
          title:
            "New member registration",
          description: `${
            user.full_name ||
            "A member"
          } joined the platform`,
          time: user.created_at,
          type: "registration",
        });
      }
    );


    recentAccepted.forEach(
      (interest) => {
        recentActivity.push({
          icon: "♥",
          title: "Interest accepted",
          description:
            "A connection request was accepted",
          time: interest.created_at,
          type: "interest",
        });
      }
    );


    recentActivity.sort(
      (a, b) =>
        new Date(b.time) -
        new Date(a.time)
    );


    const formattedRecentActivity =
      recentActivity
        .slice(0, 5)
        .map((activity) => ({
          ...activity,
          time: formatTimeAgo(
            activity.time
          ),
        }));


    // =====================================================
    // 12. INTEREST ANALYTICS
    // =====================================================

    const interestTotal =
      acceptedInterests +
      pendingInterests +
      rejectedInterests;

    const acceptedPercentage =
      interestTotal > 0
        ? Math.round(
            (acceptedInterests /
              interestTotal) *
              100
          )
        : 0;

    const pendingPercentage =
      interestTotal > 0
        ? Math.round(
            (pendingInterests /
              interestTotal) *
              100
          )
        : 0;

    const rejectedPercentage =
      interestTotal > 0
        ? Math.round(
            (rejectedInterests /
              interestTotal) *
              100
          )
        : 0;


    // =====================================================
    // 13. RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      reports: {
        totalMembers:
          totalMembers || 0,

        activeProfiles:
          activeProfiles || 0,

        totalInterests,

        acceptedInterests,

        pendingInterests,

        rejectedInterests,

        maleCount,

        femaleCount,

        malePercentage,

        femalePercentage,

        acceptedPercentage,

        pendingPercentage,

        rejectedPercentage,

        monthlyData,

        recentActivity:
          formattedRecentActivity,
      },
    });

  } catch (error) {
    console.error(
      "Get Admin Reports Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch reports",
    });
  }
};


// =====================================================
// TIME FORMATTER
// =====================================================

const formatTimeAgo = (
  dateString
) => {
  const date =
    new Date(dateString);

  const now = new Date();

  const difference =
    Math.floor(
      (now - date) / 1000
    );

  if (difference < 60) {
    return "Just now";
  }

  const minutes =
    Math.floor(
      difference / 60
    );

  if (minutes < 60) {
    return `${minutes} minute${
      minutes > 1 ? "s" : ""
    } ago`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } ago`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 30) {
    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


