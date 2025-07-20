const ensureAuthneticated =  require("../Middlewares/Auth")
const router = require('express').Router();

router.get('/', ensureAuthneticated,(req, res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"laptop",
            price:100000
        },
        {
            name:"tv",
            price:20000
        }
    ])
})

module.exports = router;