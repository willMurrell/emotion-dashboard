
const { Router } = require('express');
const express = require('express');

/* create a router (to export) */
const router = express.Router();



//console.log("Papers router!!");



router.get('/', async (req, res) => {

    res.render('tempStudentHome');
})


router.get('/:name/', async (req, res) => {
    var studentName = req.params.name;
    res.render('studentHome', {studentName: studentName});
})

router.get('/:name/:course', async (req, res) => {
    var studentName = req.params.name;
    var courseName = req.params.course;
    res.render('studentBlog', {studentName: studentName, courseName: courseName});
})

router.get('/:name/:course/newBlog/:week', async (req, res) => {
    var studentName = req.params.name;
    var courseName = req.params.course;
    var week = req.params.week;
    res.render('blogWriter', {studentName: studentName, courseName: courseName, week: week});
})

    // router.get('/:course/:group', async (req, res) => {
    //     var course = req.params.course;
    //     var group = req.params.group;
    //     console.log(group);
    //     res.render('team', {course: course, group: group} );
    // })

    // router.get('/:course/:group/:student', async (req, res) => {
    //     var course = req.params.course;
    //     var group = req.params.group;
    //     var student = req.params.student;
    //     console.log("AHHHHHHH"+student);
    //     res.render('student', {course: course, group: group, student: student} );
    // })

module.exports = router; // export the router
