import React from "react";
import { useAuth } from "../../context/AuthContext";

export const Wishlist = () => {
  const { logout } = useAuth();
  return (
    <>
      <div>Wishlist</div>
      <button onClick={logout}>Log out</button>
    </>
  );
};
