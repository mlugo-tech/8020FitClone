import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { signIn, signUp, confirmSignUp, fetchAuthSession } from "@aws-amplify/auth";
import Onboarding from "./components/Onboarding";

Amplify.configure(awsExports);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);
  
  // Handle user sign-up
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

  // Handle sign-up confirmation
  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode,
      });
      console.log("User confirmed successfully!");
      setIsSignUp(false); // Switch to Sign In after confirmation
    } catch (error) {
      console.error("Confirmation error:", error);
    }
  };
  const handleOnboardingSubmit = async (userData) => {
    console.log("Submitting user data:", userData); // Debugging log
  
    try {
      const session = await fetchAuthSession();
      
      if (!session.tokens?.idToken) {
        console.error("No authentication token found. User is not signed in.");
        return;
      }
  
      const token = session.tokens.idToken.toString();
      console.log("Auth Token:", token); // Log token
  
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      console.log("Profile saved:", result);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  
  const API_URL = "https://b6ug3cal1b.com/save-profile"; // Replace with your actual API URL

  // Handle user sign-in
  const handleSignIn = async () => {
    try {
      const user = await signIn({ username: email, password });
      console.log("User signed in:", user);
      setUserSignedIn(true); // Mark user as signed in
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div>
      <h1>Onboarding Quiz</h1>

      {!userSignedIn ? (
        <div>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
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

          {isSignUp && showConfirmation ? (
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
            <button onClick={isSignUp ? handleSignUp : handleSignIn}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          )}

          <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer", color: "blue" }}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </p>
        </div>
      ) : (
        <Onboarding onSubmit={handleOnboardingSubmit} />
      )}
    </div>
  );
};

export default App;
