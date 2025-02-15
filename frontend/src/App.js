import React from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports"; // Points to the newly moved file

Amplify.configure(awsExports);

function App() {
  return <h1>Hello from React in the frontend folder!</h1>;
}

export default App;

