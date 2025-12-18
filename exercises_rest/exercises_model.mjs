/**
 * 
 * Author: Gabriel Gaston
 * 
 */
import mongoose from 'mongoose';
import 'dotenv/config';
import { parse, isValid, format } from 'date-fns';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = new mongoose.Schema
({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: { type: String, enum: ['lbs', 'kgs'], required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

function isValidDate(dateStr) {
    const parsed = parse(dateStr, 'MM-dd-yy', new Date());
    return isValid(parsed) && dateStr === format(parsed, 'MM-dd-yy');
}

function validateExercise(data) 
{
    const keys = ['name', 'reps', 'weight', 'unit', 'date'];
    const dataKeys = Object.keys(data);

    if (dataKeys.length !== 5 || !keys.every(k => dataKeys.includes(k)))
    {
        return false;
    }
    if (typeof data.name !== 'string' || data.name.trim() === '') 
    {
        return false;
    }
    if (!Number.isInteger(data.reps) || data.reps <= 0) 
    {
        return false;
    }
    if (!Number.isInteger(data.weight) || data.weight <= 0) 
    {
        return false;
    }
    if (!['lbs', 'kgs'].includes(data.unit)) 
    {
        return false;
    }
    if (!isValidDate(data.date)) 
    {
        return false;
    }

    return true;
}

async function createExercise(data)
{
    if(!validateExercise(data))
    {
        throw new Error("Invalid request");
    }
    const doc = new Exercise(data);
    return await doc.save();
}


export { connect, Exercise, createExercise, validateExercise };