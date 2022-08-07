'use strict';
(function() {
  window.addEventListener('load', init);

  /**
   * Initializes the webpage
   */
  function init() {
    // button.addEventListener('click', makeRequest);
    let uploadButton = id('upload');
    uploadButton.addEventListener('click', () => {
      // If there's no file, do nothing
      if (!file.value.length) return;

      // Create a new FileReader() instance
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
    console.log(str);
    removeAllChildNodes(app);
    app.append(img);
    let params = new FormData();
    params.append('imgSrc', str);
    fetch('/doOCR', {method: 'POST', body: params})
      .then(statusCheck)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

   /**
   * Removes all HTMLElements within the give parent
   * @param {HTMLElement} parent - The parent HTML tag
   */
     function removeAllChildNodes(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

  /**
   * Creates a new HTML tag
   * @param {String} tag - The HTML tag to create
   * @returns {HTMLElement} a new HTML element
   */
   function create(tag) {
    return document.createElement(tag);
  }

  /**
   * Removes all HTMLElements within the give parent
   * @param {HTMLElement} parent - The parent HTML tag
   */
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  /**
   * Determines the specific status of the request; provides insight on
   * what can be fixed if there was an error
   * @param {Response} response - The current response object that (JSON)
   * that the client is pulling data from
   * @returns {Response} - The current response object that has a positive
   * status check
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * Returns the HTML element that corresponds with the query that was passed
   * @param {String} query - A string value that represents the specific
   * DOM element that needs to be reached
   * @returns {HTMLElement} The specific DOM element that matches the query
   * passed
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an HTMLElement from the given query
   * @param {String} query - The HTML tag name that the user want's to retrive
   * @returns {HTMLElement} - The HTML element from the tag/css selector they provided
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns an HTMLElement from the given id
   * @param {String} id - The id from the HTMLElement
   * @returns {HTMLElement} - The HTML element that fits the given id
   */
  function id(id) {
    return document.getElementById(id);
  }
})();