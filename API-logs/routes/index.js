var express = require('express');
var router = express.Router();
const fs = require('fs');
const diff = require("diff")

const filePath = './file.txt';

var watcher = fs.watch(filePath);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/log-stream', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const lastFileContent = sendFileData();

  const currentFileContent = watcher.on('change', function name(event, filename) {
    console.log(event);
    console.log(filename);
    console.log(sendFileData)
    sendFileData()
  })


  function sendFileData() {
    console.log("DDDDDDDD");
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      console.log('File contents:', data);
      res.write("data: " + data + "\n")
      return
      // You can process the file contents here
    } catch (err) {
      console.error(`Error reading file synchronously: ${err.message}`);
    }
  }
});


module.exports = router;
