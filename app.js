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
app.post('/doOCR', async (req, res) => {
  let imgSrc = req.body.imgSrc;
  if (imgSrc) {
    try {
      Tesseract.recognize(imgSrc, 'eng')
        .then(
          (response) => {
            res.send({
              'text': response.data.text,
              'confidence': response.data.confidence
            });
            console.log(response);
          });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(500);
  }
});

const DEFAULT = 8000;
app.use(express.static('public'));
const PORT = process.env.PORT || DEFAULT;
app.listen(PORT);