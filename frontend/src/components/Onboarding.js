import React, { useState } from "react";

const Onboarding = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoals: "",
    workoutPreferences: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked!"); // Debugging log
    console.log("Form Data:", formData); // Log the form data
  
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.error("onSubmit function is missing!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Age:</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} required />

      <label>Height (cm):</label>
      <input type="number" name="height" value={formData.height} onChange={handleChange} required />

      <label>Weight (kg):</label>
      <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

      <label>Fitness Goals:</label>
      <input type="text" name="fitnessGoals" value={formData.fitnessGoals} onChange={handleChange} required />

      <label>Workout Preferences:</label>
      <input type="text" name="workoutPreferences" value={formData.workoutPreferences} onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Onboarding;
