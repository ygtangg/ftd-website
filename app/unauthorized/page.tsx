import Link from "next/link";
import { createClient } from '@/lib/supabase/server'

export default async function Unauthorized() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser();
  const authenticated = error || !data?.user;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="mb-6">
          You don&apos;t have permission to access this page. This might be because:
        </p>
        <ul className="list-disc text-left mb-6 mx-auto max-w-xs">
          <li>You&apos;re not logged in</li>
          <li>You need to be a FTD member</li>
          <li>You&apos;re using the wrong account</li>
        </ul>
        <div className="flex flex-col space-y-2">
          <Link 
            href="/"
            className="bg-jujube text-white py-2 px-4 rounded hover:bg-jujube/80"
          >
            {authenticated ? "Go to Dashboard" : "Go Home"}
          </Link>
          <Link 
            href="/contact" 
            className="text-jujube hover:underline"
          >
            Contact a Board Member
          </Link>
        </div>
      </div>
    </div>
  );
}
