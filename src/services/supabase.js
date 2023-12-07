import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ipiffschofrbwziydegz.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwaWZmc2Nob2ZyYnd6aXlkZWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3NzMyMDIsImV4cCI6MjAxMzM0OTIwMn0.u93AlmiqUsJJjIaXWwuMIvwOVGduYSxe_2sfW7RZlOw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
