
const { Router } = require('express');
const express = require('express');

/* create a router (to export) */
const router = express.Router();


console.log("Papers router!!");

router.get('/', async (req, res) => {

    res.render('papers');
})


module.exports = router; // export the router

