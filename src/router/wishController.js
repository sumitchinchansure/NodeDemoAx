const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const wishService = require('../services/wishService')

router.use(bodyParser());

// Post Wish route
router.post('/', async (req, res) => {
  try {
    if (req.body == undefined || req.body.username == undefined || req.body.wish == undefined) {
      res.send().statusCode(400);
      return;
    }
    const userName = req.body.username
    const wishText = req.body.wish

    // const isValid = wishUtil.isValidUser(userName)
    await wishService.validateChild(userName, wishText);

    // wishService.submitWish(wishText);
    res.send(`Free text is:${userName} ${wishText}.`);

  } catch (error) {
    res.send('Failed to submit wish. Reason：', error).statusCode(500);
  }
});

module.exports = router;