
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
    var draft = req.query.draft;
    
    res.render('studentBlog', {studentName: studentName, courseName: courseName, draft: draft});
})

router.get('/:name/:course/newBlog/:week', async (req, res) => {
    var studentName = req.params.name;
    var courseName = req.params.course;
    var week = req.params.week;
    var draft = req.query.draft;
    res.render('blogWriter', {studentName: studentName, courseName: courseName, week: week, draft: draft});
})


module.exports = router; // export the router
