import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateExercisePage() 
{
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => 
  {
    const newExercise = 
    {
      name,
      reps: Number(reps),
      weight: Number(weight),
      unit,
      date,
    };

    const response = await fetch("/exercises", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExercise),
    });

    if (response.status === 201) 
    {
      alert("Exercise created successfully.");
    } 
    else 
    {
      alert("Failed to create exercise.");
    }

    navigate("/");
  };

  return (
    <main>
      <h2>Create New Exercise</h2>
      <form>
        <label>Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </label>
        <label>Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <label>Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </label>
        <label>Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="MM-DD-YY"
            required
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </main>
  );
}

export default CreateExercisePage;