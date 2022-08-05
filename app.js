const Tesseract = require("tesseract.js");
const express = require('express');
const app = express();
const multer = require('multer');

let text = "";
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

app.get('/paragraph', async (req, res) => {
  try {
    Tesseract.recognize('./paragraph.png', 'eng')
      .then(
        (response) => {
          text = response.data.text;
          console.log(text);
        });
    res.send({
      'text': text
    })
  } catch (error) {
    console.log(error);
  }
  // Tesseract.recognize('./paragraph.png', 'eng')
  // .then(
  //   (out) => {
  //     let text = out.data.text;
  //     console.log(text);
  //   });
});

const DEFAULT = 8000;
app.use(express.static('public'));
const PORT = process.env.PORT || DEFAULT;
app.listen(PORT);

// Tesseract.recognize('./paragraph.png', 'eng')
//   .then(
//     (out) => {
//       let text = out.data.text;
//       console.log(text);
//     });