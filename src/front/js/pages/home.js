import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <Link to={"/signup"} className="btn btn-success ml-5">
        Signup
      </Link>
      <Link to={"/login"} className="btn btn-primary mr-5">
        Login
      </Link>
      <Link to={"/private"} className="btn btn-primary mr-5">
        Profile
      </Link>
    </div>
  );
};
