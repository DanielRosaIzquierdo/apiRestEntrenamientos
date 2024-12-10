const DB = require('./db.json');
const fs = require('fs');

//     if (filterParams.mode) {
//         let workoutsFilterMode = DB.entrenamientos.filter((workout) =>
//             workout.modo.toLowerCase().includes(filterParams.mode)
//         );

//         if (filterParams.limit && filterParams.limit < DB.entrenamientos.length) {
//             console.log(' modo y limit')
//             return workoutsFilterMode.splice(0, filterParams.limit);
//         }
//         return workoutsFilterMode;
//     }
// if (filterParams.limit && filterParams.limit < DB.entrenamientos.length) {
//     console.log(' solo limit')
//     return workouts.splice(0, filterParams.limit);
// }

// try {
//     let workouts = DB.entrenamientos;

//     if (filterParams.modo && filterParams.limit && filterParams.limit < DB.entrenamientos.length){
//         let copia = DB.entrenamientos.filter((entrenamiento) => entrenamiento.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()))
//         return copia.splice(0, filterParams.limit)
//     }

//     if (filterParams.modo) return DB.entrenamientos.filter((entrenamiento) => entrenamiento.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()))
//         if


//     return workouts;

// } catch (error) {
//     throw { status: 500, message: error?.message || error }
// }
const getAllWorkouts = (filterParams) => {
    try {
        let workout = DB.entrenamientos;

        if (filterParams.modo && filterParams.limit && filterParams.limit < DB.entrenamientos.length) {
            let copia = DB.entrenamientos.filter((entreno) => entreno.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()));
            return copia.slice(0, filterParams.limit)
        }
        if (filterParams.modo) return DB.entrenamientos.filter((entreno) => entreno.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()))
        if (filterParams.limit && filterParams.limit < DB.entrenamientos.length) return DB.entrenamientos.slice(0, filterParams.limit)

        return workout;
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getOneWorkout = (id) => {
    try {
        return DB.entrenamientos.find((entrenamiento) => entrenamiento.id === id);
    } catch (error) {
        throw { status: 500, message: error?.message || error }
    }
    

}

const createNewWorkout = (workoutToInsert) => {
    let isAlreadyAdded = false;
    DB.entrenamientos.forEach((entrenamiento) => {
        if (entrenamiento.nombre === workoutToInsert.nombre)
            isAlreadyAdded = true
    })

    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout whit the name ${workoutToInsert.nombre} already exists`
        }
    }
    try {
        DB.entrenamientos.push(workoutToInsert);

        saveToDatabase(DB);

        return workoutToInsert;
    } catch (error) {
        throw { status: 500, message: error?.message || error }
    }


}

const updateOneWorkout = (id, workoutToUpdate) => {

    try {
        DB.entrenamientos = DB.entrenamientos.filter((entrenamiento) => entrenamiento.id !== id);

        DB.entrenamientos.push(workoutToUpdate);

        saveToDatabase(DB)

        return workoutToUpdate;
    } catch (error) {
        throw { status: 500, message: error?.message || error }
    }

}

const deleteOneWorkout = (id) => {

    if (!DB.entrenamientos.find((entrenamiento) => entrenamiento.id === id)) return false;

    try {
        DB.entrenamientos = DB.entrenamientos.filter((entrenamiento) => entrenamiento.id !== id);
        saveToDatabase(DB);
        return true;
    } catch (error) {
        throw { status: 500, message: error?.message || error }
    }

}

const saveToDatabase = (DB) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
        encoding: "utf8",
    });
};

module.exports = { getAllWorkouts, createNewWorkout, getOneWorkout, deleteOneWorkout, updateOneWorkout };