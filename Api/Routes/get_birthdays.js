const express =require('express');

const router = express.Router();


router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'get_birthdays GET works!'
    });
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message:'get_birthdays POST works!'
    });
});

module.exports = router;