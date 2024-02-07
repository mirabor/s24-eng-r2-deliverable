"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/

import type { Database } from "@/lib/schema";
import React from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface UserProfileProps {
  profile: Profile;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }: { profile: Profile }) => {
  const profileItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const profileLabelStyle: React.CSSProperties = {
    fontWeight: "bold",
    marginRight: "5px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
        <div style={profileItemStyle}>
          <span style={profileLabelStyle}>Name:</span>
          <span>{profile.display_name}</span>
        </div>
        <div style={profileItemStyle}>
          <span style={profileLabelStyle}>Email:</span>
          <span>{profile.email}</span>
        </div>
        <div style={profileItemStyle}>
          <span style={profileLabelStyle}>Biography:</span>
          <span>{profile.biography}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
