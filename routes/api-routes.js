const router = require("express").Router();
const Workout = require("../models/workout");

//post request
router.post("/api/workouts", (req, res) => {
    console.log(req.body);
    Workout.create({})
    .then(dbWorkouts => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

// put request
router.put("/api/workouts/:id", ({ body, params } , res) => {
    console.log(body);
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

//get request
router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

// get request (7 day range)
router.get("/api/workouts/range", (req, res) => {
    Workout.find().limit(7)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.json(err);
    });
});


module.exports = router;
