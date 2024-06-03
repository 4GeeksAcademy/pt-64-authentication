import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

export default function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
	  const { store, actions } = useContext(Context);

    const handleSignup = () => {
        if(email !== "" && password !== "" ) {
            actions.signup(email, password)
        }
    }

  return (
    <div className="w-75 mx-auto">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <label htmlFor="inputPassword5" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>
      <button onClick={() => handleSignup()}>Sign up</button>
    </div>
  );
}
