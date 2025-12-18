/**
 *
 *  Author: Gabriel Gaston
 *  
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';


const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => 
{
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => 
{
    try 
    {
        const doc = await exercises.createExercise(req.body);
        res.status(201).json(doc);
    } 
    catch (err) 
    {
        res.status(400).json({ Error: "Invalid request" });
    }
}));

app.get('/exercises', asyncHandler(async (req, res) =>
{
    const allExercises = await exercises.Exercise.find({});
    res.status(200).json(allExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) =>
{
    const { _id } = req.params;
    const exercise = await exercises.Exercise.findById(_id);

    if (!exercise) 
    {
        return res.status(404).json({ Error: "Not found" });
    }

    res.status(200).json(exercise);
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) =>
{
    const { _id } = req.params;

    if (!exercises.validateExercise(req.body)) 
    {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const existingExercise = await exercises.Exercise.findById(_id);

    if (!existingExercise)
    {
        return res.status(404).json({ Error: "Not found" });
    }

    const updatedDoc = await exercises.Exercise.findByIdAndUpdate
    (
        _id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedDoc);
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => 
{
    const { _id } = req.params;
    const exercise = await exercises.Exercise.findById(_id);

    if (!exercise) 
    {
        return res.status(404).json({ Error: "Not found" });
    }

    await exercises.Exercise.findByIdAndDelete(_id);

    res.status(204).end();

}));