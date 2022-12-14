
const { Router } = require('express');
const express = require('express');

/* create a router (to export) */
const router = express.Router();



//console.log("Papers router!!");



router.get('/', async (req, res) => {

    res.render('papers');
})


router.get('/:param/', async (req, res) => {
    var course = req.params.param;
    res.render('group', {course: course} );
})

router.get('/:course/:group', async (req, res) => {
    var course = req.params.course;
    var group = req.params.group;
    console.log(group);
    res.render('team', {course: course, group: group} );
})

router.get('/:course/:group/:student', async (req, res) => {
    var course = req.params.course;
    var group = req.params.group;
    var student = req.params.student;
    console.log("AHHHHHHH"+student);
    res.render('student', {course: course, group: group, student: student} );
})

module.exports = router; // export the router

