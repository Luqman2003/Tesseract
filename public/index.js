'use strict';
(function() {
  window.addEventListener('load', init);

  /**
   *
   */
  function init() {
    let button = id('OCR');
    button.addEventListener('click', makeRequest);
    let uploadButton = id('upload');
    uploadButton.addEventListener('click', () => {
      // If there's no file, do nothing
      if (!file.value.length) return;

      // Create a new FileReader() object
      let reader = new FileReader();

      // Setup the callback event to run when the file is read
      reader.onload = logFile;

      // Read the file
      reader.readAsDataURL(file.files[0]);
    });
  }

  /**
   * Log the uploaded file to the console
   * @param {event} Event The file loaded event
   */
  function logFile (event) {
    let app = qs('#app');
    let str = event.target.result;
    let img = document.createElement('img');
    img.src = str;
    app.append(img);
    console.log(str);
  }

  function makeRequest() {
    fetch('/paragraph')
    .then(statusCheck)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  /**
   *
   * @param {*} response
   * @returns
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }


  /**
   *
   * @param {*} query
   * @returns
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   *
   * @param {*} query
   * @returns
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   *
   * @param {*} id
   * @returns
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   *
   * @param {*} element
   * @returns
   */
  function create(element) {
    return document.createElement(element);
  }

})();