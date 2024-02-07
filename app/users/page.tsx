import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UserProfile from "./userprofile";

export default async function UsersPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/users");
  }

  // Fetch user profile information
  const { data: profiles, error } = await supabase.from("profiles").select("*").order("id", { ascending: false });

  let content;
  if (error) {
    content = <p>There was an error fetching profiles</p>;
  } else {
    content = profiles.map((profile) => <UserProfile key={profile.id} profile={profile} />);
  }

  return (
    <div className="mb-5 flex flex-wrap items-center justify-center gap-4">
      <TypographyH2>Users</TypographyH2>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        <Suspense fallback={<TypographyH2>Loading...</TypographyH2>}>{content}</Suspense>
      </div>
    </div>
  );
}
