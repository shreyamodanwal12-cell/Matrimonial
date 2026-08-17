
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";

const createAdmin = async () => {
  try {
    const full_name = "Admin";
    const email = "admin@shivaparvati.com";
    const password = "Admin@123";
    const mobile = null;

    // Check whether admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking admin:", checkError);
      return;
    }

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const { data: admin, error } = await supabase
      .from("users")
      .insert([
        {
          full_name,
          email,
          mobile,
          password: hashedPassword,
          role: "admin",
          is_active: true,
        },
      ])
      .select("id, full_name, email, mobile, role, is_active, created_at")
      .single();

    if (error) {
      console.error("Error creating admin:", error);
      return;
    }

    console.log("Admin created successfully!");
    console.log(admin);
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

createAdmin();