import supabase from "../config/supabase.js";

export const getApprovedTestimonials = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select(`
        id,
        name,
        location,
        message,
        rating,
        created_at
      `)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get Testimonials Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch testimonials",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      testimonials: data || [],
    });
  } catch (error) {
    console.error("Testimonials Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      location,
      message,
      rating,
    } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required",
      });
    }

    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          name,
          location,
          message,
         rating: Number(rating) || 5,
          is_approved: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create Testimonial Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create testimonial",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial: data,
    });
  } catch (error) {
    console.error("Create Testimonial Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Testimonial ID is required",
      });
    }

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Testimonial Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to delete testimonial",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete Testimonial Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};