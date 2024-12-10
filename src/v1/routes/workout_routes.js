const express = require('express')
const workoutController = require('../../controllers/workout_controller')
const apicache = require('apicache')
const cache = apicache.middleware("1 minutes");

const router = express.Router();

router.get('/', cache, workoutController.getAllWorkouts);

router.get('/:workoutId', workoutController.getOneWorkout);

router.post('/', workoutController.createNewWorkout);

router.patch('/:workoutId', workoutController.updateOneWorkout);

router.delete('/:workoutId', workoutController.deleteOneWorkout);

module.exports = router;