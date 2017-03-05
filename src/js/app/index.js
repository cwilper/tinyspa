const $ = require('jquery');

module.exports = () => {
  const $app = $(document.createElement('div'));

  function init() {
    $app.attr('id', 'app-container');
    document.body.appendChild($app[0]);
  }

  function launch() {
    $app.html('TinySPA had been launched.');
  }

  init();

  return {
    launch,
  };
};
