var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
const tableName = 'user';
const cryptoJs = require('crypto-js');
// const { supabaseInstance } = require("./supabase-db/index");
const secret = "secret";

router.get('/createUser', async (res, req) => {
  res.status(200).json({
    success: true,
    message: " admin created successfully",
  });
  // try {
  //   const postBody = req.body
  //   console.log(req.body)
  //   const { data, error } = await supabaseInstance
  //     .from(tableName)
  //     .insert([postBody]);
  //   if (error) {
  //     return res.status(500).json({ success: false, message: error })
  //   }
  //   return res.status(200).json({ success: true, message: data }) 
  // } catch (error) {
  //   return res.status(500).json({ success: false, message: error })
  // }
}
)



module.exports = router;
