import React from "react";
import { useAuth } from "../../hooks/useAuth";

export const Wishlist: React.FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <div>Wishlist</div>
      <button onClick={logout}>Log out</button>
    </>
  );
};
