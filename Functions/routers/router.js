var express = require('express');
var router = express.Router()
var accountService = require('./accountService')


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(accountService)


module.exports = router