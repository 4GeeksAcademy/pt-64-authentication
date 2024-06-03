import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export default function Private() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUser();
  }, []);
  return (
    <div>
      {store.user ? (
        <h1>HELLO {store.user.email}</h1>
      ) : (
        <h1>YOU HAVE TO LOGIN</h1>
      )}
    </div>
  );
}
