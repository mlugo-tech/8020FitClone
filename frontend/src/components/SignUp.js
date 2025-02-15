import React, { useState } from "react";
import { signUp, confirmSignUp } from "@aws-amplify/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
          },
        },
      });
      setShowConfirmation(true);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode,
      });
      console.log("User confirmed successfully!");
    } catch (error) {
      console.error("Confirmation error:", error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {showConfirmation ? (
        <div>
          <input
            type="text"
            placeholder="Enter confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
