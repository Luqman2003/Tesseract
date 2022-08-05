'use strict';
(function() {
  window.addEventListener('load', init);

  /**
   *
   */
  function init() {
    let button = id('OCR');
    button.addEventListener('click', makeRequest);
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