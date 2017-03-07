export default () => {
  const appEl = document.createElement('div');

  function init() {
    appEl.id = 'app-container';
    document.body.appendChild(appEl);
  }

  function launch() {
    appEl.innerHTML = 'TinySPA has been launched.';
  }

  init();

  return {
    launch,
  };
};
