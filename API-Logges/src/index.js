const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const diff = require('diff');

app.get('/', (req, res) => res.send('Hello World!'));


// Read a file from local using fs reader through API
function sendFileData(res) {
  const d = fs.readFileSync('file.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.write(`data: ${data}\n\n`); // Send data to the client
    console.log("new 00000 data---------------")
  });
  return d
}

app.get("/readfile", (req, res) => {
  console.log(sendFileData(res))
});

// Use watch method to read a file whenever it gets updated; only updated result should be shown to the user in the API
app.get("/watchfile", (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });



  // Send initial file content to the client
  const lastFileContent = sendFileData(res);
  console.log(sendFileData(res))

  fs.watch('./file.txt', (event, filename) => {
    if (filename) {
      // Send updated file content to the client
      // console.log("file updated ====> ", sendFileData(res))
      const currentFileContent = sendFileData(res);
      const difference = diff.diffLines(lastFileContent, currentFileContent);

      const changes = difference
        .filter(part => part.added || part.removed)
        .map(part => part.value);

      if (currentFileContent.length >= lastFileContent.length) {
        // console.log(typeof changes," ===> ", changes);
        console.log(currentFileContent.replace(lastFileContent))
      } else {
        console.log(lastFileContent.replace(currentFileContent))
      }

    }
  });

  // Handle client disconnect
  // req.on('close', () => {
  //   console.log('Client disconnected');
  // });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
