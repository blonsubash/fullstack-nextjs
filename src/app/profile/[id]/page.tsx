import React from "react";

function UserProfile({ params }: any) {
  return (
    <div>
      UserProfile with id
      <p>here id {params.id}</p>
    </div>
  );
}

export default UserProfile;
