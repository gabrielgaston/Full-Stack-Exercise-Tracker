import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function EditExercisePage({ exerciseToEdit }) 
{
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const handleUpdate = async () => 
    {
        const updatedExercise = 
        {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date,
        };

        const response = await fetch(`/exercises/${exerciseToEdit._id}`, 
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedExercise),
        });

        if (response.status === 200) 
        {
            alert("Exercise updated successfully.");
        } 
        else 
        {
            alert("Failed to update exercise.");
        }

        navigate("/");
    };

    return (
        <main>
            <h2>Edit Exercise</h2>
            <form>
                <label>Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Reps:
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />
                </label>
                <label>Weight:
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
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
                    />
                </label>
                <button type="button" onClick={handleUpdate}>
                    Save
                </button>
            </form>
        </main>
    );
}

export default EditExercisePage;