const Tesseract = require("tesseract.js");
const express = require('express');
const app = express();
const multer = require('multer');

app.use(express.urlencoded(
  {
  extended: true
  }
  ));
app.use(express.json());
app.use(multer().none());

/**
 *
 */
app.post('/paragraph', async (req, res) => {
  let imgSrc = req.body.imgSrc;
  try {
    Tesseract.recognize(imgSrc, 'eng')
      .then(
        (response) => {
          // response.data.text;
          res.send({
            'text': response.data.text
          });
          console.log(response.data.text);
        });
  } catch (error) {
    console.log(error);
  }
});

const DEFAULT = 8000;
app.use(express.static('public'));
const PORT = process.env.PORT || DEFAULT;
app.listen(PORT);