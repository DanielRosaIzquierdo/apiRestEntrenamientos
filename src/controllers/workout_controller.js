const { id } = require('apicache');
const workoutService = require('../services/workout_service')

const getAllWorkouts = (req, res) => {

    const { modo } = req.query;
    const { limit } = req.query;

    console.log({modo})
    console.log({limit})

    const allWorkouts = workoutService.getAllWorkouts({ modo, limit});
    if (allWorkouts) {
        res.status(200).send({ status: 'OK', data: allWorkouts });
    } else {
        res.status(500).send({
            status: 'FAILED',
            data: {
                error: 'Server error'
            }
        })
    }
}

const getOneWorkout = (req, res) => {
    let workout;
    try {
        workout = workoutService.getOneWorkout(req.params.workoutId);
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

    if (workout) {
        res.status(201).send({ status: 'OK', data: workout });
    } else {
        res.status(404).send({
            status: 'FAILED',
            data: {
                error: 'Workout not found. Check the id'
            }
        })
    }

}

const createNewWorkout = (req, res) => {
    const { body } = req;

    if (
        !body.nombre ||
        !body.modo ||
        !body.equipamiento ||
        !body.ejercicios ||
        !body.consejosDelEntrenador
    ) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error: 'One of the following keys is missing or is empty in request body: "name", "mode", "equipment", "exercises", "trainer tips"'
            }
        })

        return;
    }

    const newWorkout = {
        nombre: body.nombre,
        modo: body.modo,
        equipamiento: body.equipamiento,
        ejercicios: body.ejercicios,
        consejosDelEntrenador: body.consejosDelEntrenador,
    }
    try {
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: 'OK', data: createdWorkout })
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } })
    }


}

const updateOneWorkout = (req, res) => {
    const { body } = req;


    const workoutToUpdate = workoutService.getOneWorkout(req.params.workoutId);

    if (!workoutToUpdate) {
        res.status(404).send({
            status: 'FAILED',
            data: {
                error: 'Workout to update not found. Check de URL id'
            }
        })
        return;
    }



    const workoutToUpdatePatched = {
        nombre: (body.nombre === undefined) ? workoutToUpdate.nombre : body.nombre,
        modo: (body.modo === undefined) ? workoutToUpdate.modo : body.modo,
        equipamiento: (body.equipamiento === undefined) ? workoutToUpdate.equipamiento : body.equipamiento,
        ejercicios: (body.ejercicios === undefined) ? workoutToUpdate.ejercicios : body.ejercicios,
        consejosDelEntrenador: (body.consejosDelEntrenador === undefined) ? workoutToUpdate.consejosDelEntrenador : body.consejosDelEntrenador,
        id: workoutToUpdate.id,
        fechaCreacion: workoutToUpdate.fechaCreacion,
    }


    const updatedWorkout = workoutService.updateOneWorkout(req.params.workoutId, workoutToUpdatePatched);
    res.status(200).send({ status: 'OK', data: updatedWorkout });
}

const deleteOneWorkout = (req, res) => {

    if (workoutService.deleteOneWorkout(req.params.workoutId)) {
        res.status(200).send({ status: 'OK' });
    } else {
        res.status(404).send({
            status: 'FAILED', data: {
                error: 'Workout to delete not found. Check de URL id'
            }
        });
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}