
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

module.exports = router; // export the router

