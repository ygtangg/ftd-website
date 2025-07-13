import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; 

export async function GET() {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('performances')
        .select('id, title, performance_datetime')
        .gt('performance_datetime', new Date().toISOString())
        .order('performance_datetime', { ascending: true })
    
    if (error) {
        console.error('Error fetching events:', error);
        return;
    }
    
    return NextResponse.json({ performances: data });
}

export async function POST(req: Request) {
  const supabase = await createClient(); 

  try {
    const form = await req.json();
    const requiredFields = [
      "title",
      "performance_datetime",
      "performance_location",
      "rehearsal_datetime",
      "rehearsal_location",
      "opt_in_deadline"
    ];
    for (const field of requiredFields) {
      if (!form[field] || String(form[field]).trim() === "") {
        return Response.json(
          { message: `Missing or empty field: ${field}` },
        );
      }
    }
    const { data, error } = await supabase
        .from('performances')
        .insert([form]);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ message: "Database error" }, { status: 500 });
    }

    return Response.json({ message: "Performance opportunity posted!" });
  } catch (e) {
    console.error("Error in POST handler:", e);
    return Response.json({ message: "Error processing request" }, { status: 500 });
  }
}
