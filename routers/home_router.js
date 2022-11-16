
const { Router } = require('express');
const express = require('express');

/* create a router (to export) */
const router = express.Router();


//console.log("This is where i am");

router.get('/', async (req, res) => {

    res.render('home');
})


module.exports = router; // export the router

