const { v4: uuid } = require('uuid');
const workout = require('../database/workout_adapter')

const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = workout.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }

}

const getOneWorkout = (id) => {
    try {
        const oneWorkout = workout.getOneWorkout(id);
        return oneWorkout;
    } catch (error) {
        throw error;
    }

}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout, // crea una copia del objeto
        id: uuid(),
        fechaCreacion: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        fechaActualizacion: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    }

    try {
        const createdWorkout = workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    } catch (error) {
        throw error;
    }

}

const updateOneWorkout = (id, workoutToUpdatePatched) => {
    const workoutToUpdate = {
        ...workoutToUpdatePatched,
        fechaActualizacion: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    }

    try {
        const updatedWorkout = workout.updateOneWorkout(id, workoutToUpdate);
        return updatedWorkout;
    } catch (error) {
        throw error;
    }

}

const deleteOneWorkout = (id) => {
    try {
        return workout.deleteOneWorkout(id);
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}