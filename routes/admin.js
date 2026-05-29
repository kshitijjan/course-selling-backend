const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({
        msg: 'Signup success'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;

    const adminSignin = await Admin.findOne({
        username,
        password
    }) 
    
    if(adminSignin){
        const token = jwt.sign({username}, JWT_SECRET)
        
        res.json({
            msg: `Bearer ${token}` 
        })
    }
    else{
        res.json({
            msg: 'Invalid username or password'
        })
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const createCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    if(createCourse){
        res.json({
            msg: "Course created successfully"
        })
    }
    else{
        res.json({
            msg: "An error occured while create course"
        })
    }
    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({})
    res.json({
        courses: allCourses
    })
    
});

module.exports = router;