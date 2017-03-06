import $ from 'jquery';

export default () => {
  const $app = $(document.createElement('div'));

  function init() {
    $app.attr('id', 'app-container');
    document.body.appendChild($app[0]);
  }

  function launch() {
    $app.html('TinySPA has been launched.');
  }

  init();

  return {
    launch,
  };
};
