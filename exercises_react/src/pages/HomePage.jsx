import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";

function ExerciseRow({ exercise, onDelete, onEdit }) 
{
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <FaEdit
                    className="icon"
                    onClick={() => onEdit(exercise)}
                    title="Edit"
                />
                <FaTrash
                    className="icon"
                    onClick={() => onDelete(exercise._id)}
                    title="Delete"
                />
            </td>
        </tr>
    );
}

function HomePage({ setExerciseToEdit }) 
{
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => 
    {
        const fetchExercises = async () => 
        {
            const res = await fetch('/exercises');
            const data = await res.json();
            setExercises(data);
        };
        fetchExercises();
    }, []);

    const handleDelete = async (_id) => 
    {
        const res = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (res.status === 204) 
        {
            setExercises(exercises.filter(e => e._id !== _id));
        } 
        else 
        {
            alert("Delete failed.");
        }
    };

    const handleEdit = (exercise) => 
    {
        setExerciseToEdit(exercise);
        navigate('/edit');
    };

    return (
        <main>
            <h2>Exercise List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => 
                    (
                        <ExerciseRow
                        key={exercise._id}
                        exercise={exercise}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        />
                    ))}
                </tbody>
            </table>
            <p>
                <Link to="/create">Add a new exercise</Link>
            </p>
        </main>
    );
}

export default HomePage;