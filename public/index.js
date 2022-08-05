'use strict';
(function() {
  window.addEventListener('load', init);

  function init() {
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

  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

})();