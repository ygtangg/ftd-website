import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("performances")
		.select("id, name, performance_datetime")
		// .gt('performance_datetime', new Date().toISOString())
		.order("performance_datetime", { ascending: true });

	if (error) {
		console.error("Error fetching events:", error);
		return NextResponse.json({ "Error fetching events:": error });
	}

	return NextResponse.json({ performances: data });
}

export async function POST(req: Request) {
	const supabase = await createClient();

	try {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const userId = user.id;

		const form = await req.json();

		const requiredFields = [
			"name",
			"performance_datetime",
			"performance_location",
			"rehearsal_datetime",
			"rehearsal_location",
			"opt_in_deadline",
		];

		const missingFields = requiredFields.filter(
			(field) => !form[field] || String(form[field]).trim() === ""
		);

		if (missingFields.length > 0) {
			return NextResponse.json(
				{ error: `Missing required fields: ${missingFields.join(", ")}.` },
				{ status: 400 }
			);
		}

		form.created_by_id = userId;
		console.log("Saving form:", form);
		const { data, error } = await supabase.from("performances").insert([form]);

		if (error) {
			console.error("Supabase error:", error);
			const statusCode = error.code === "23505" ? 409 : 500;
			return NextResponse.json({ message: "Database error." }, { status: statusCode });
		}

		return NextResponse.json({ message: "Performance opportunity saved." }, { status: 201 });
	} catch (e) {
		console.error("Error in POST handler:", e);
		return NextResponse.json({ message: "Error processing request" }, { status: 500 });
	}
}
