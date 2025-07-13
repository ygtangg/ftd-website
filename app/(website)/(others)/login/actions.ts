"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session) {
		console.log("Logged in");
		redirect("/dashboard");
	}

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.error("sign-in failed:", error.message);
		console.log("Attempting login with:", data);
		redirect("/unauthorized");
	}

	revalidatePath("/dashboard", "layout");
	redirect("/dashboard");
}
