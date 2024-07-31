const express = require("express");
const router = express.Router();
const Interest = require("../model/interest");
const interest = new Interest();

router.get("/search/:word", async (req, res) => {
  const word = req.params.word;
  console.log(word);
  const regex = new RegExp("/^[a-z0-9]+$/i");
  //   if (!regex.test(word)) {
  //     res.status(200).json({
  //       error:
  //         "Word is not valid to search only numbers and letters can be used.",
  //     });
  //     return;
  //   }

  //filter here for word to not have SQL injection
  const searchedInterests = await interest.searchInterest(word);
  console.log(searchedInterests);
  res.status(200).json({ interests: JSON.stringify(searchedInterests) });
});

module.exports = router;
