const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken")
const { User, Course } = require("../db");
require('dotenv').config();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const createUser = await User.create({
        username,
        password
    })

    if(createUser){
        res.json({
            msg: "User created successfully"
        })
    }
    else{
        res.json({
            msg: "Invalid, can't create user"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const isValidUser = await User.findOne({
        username,
        password
    })
    if(isValidUser){
        const token = jwt.sign({username}, process.env.JWT_SECRET)
        res.json({
            msg: `Bearer ${token}`
        })
    }
    else{
        res.json({
            msg: "Invalid username or password"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});

    if(allCourses){
        res.json({
            allCourses
        })
    }
    else{
        res.json({
            msg: "Failed to load courses"
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;

    const updateUserPurchasedCourses = await User.updateOne({
        username: username
    },{
        "$push": {
            purchasedCourses: courseId
        }
    })
    if(updateUserPurchasedCourses){
        res.json({
            msg: "Course purchased"
        })
    }
    else{
        res.json({
            msg: "Unable to purchase the course"
        })
    }
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    
    const getAllPurchasedCourses = await User.findOne({
        username
    })
    if(getAllPurchasedCourses){
        res.json({
            courses: getAllPurchasedCourses.purchasedCourses
        })
    }
    else{
        res.json({
            msg: "No purchased courses"
        })
    }
    

});

module.exports = router