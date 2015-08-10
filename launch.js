var App = {
  webview: null,
  viewSwitch: null,
  layoutTitle: null,

  init: function() {
    this.webview = document.getElementById('the_webview');
    this.webview.src = 'https://www.facebook.com/';

    this.webview.addEventListener('newwindow', function(e) {
      e.stopImmediatePropagation();
      window.open(e.targetUrl);
    });

    this.webview.addEventListener('permissionrequest', function(e) {
      if (e.permission === 'fullscreen' ||
          e.permission === 'download' ||
          e.permission === 'geolocation') {
        e.request.allow();
      }
    });

    window.addEventListener('keydown', this.keydownHandler);

    this.viewSwitch = document.getElementById('switch');
    this.viewSwitch.addEventListener('click', this.handleSwitchView);

    this.layoutTitle = document.getElementById('layout-title');
    this.layoutTitle.addEventListener('click', this.handleLayoutTitle);
  },

  keydownHandler: function(event) {
    if (event.ctrlKey) {
      switch (event.keyCode) {
        case 81: // Ctrl+q
          window.close();
          break;
        case 82: // Ctrl+r
        case 115: // F5
          App.webview.reload();
          break;
      }
    }
  },

  handleSwitchView: function(event) {
    event.preventDefault();
    if (this.dataset.mode == 'desktop') {
      App.webview.src = 'https://m.facebook.com/';
      this.dataset.mode = 'mobile';
      this.innerHTML = 'Desktop';
    } else if (this.dataset.mode == 'mobile') {
      App.webview.src = 'https://www.facebook.com/';
      this.dataset.mode = 'desktop';
      this.innerHTML = 'Mobile';
    }
  },

  handleLayoutTitle: function(event) {
    if (App.viewSwitch.dataset.mode == 'desktop') {
      App.webview.src = 'https://www.facebook.com/';
    } else if (App.viewSwitch.dataset.mode == 'mobile') {
      App.webview.src = 'https://m.facebook.com/';
    }
  }

};

window.addEventListener('load', App.init.bind(App));
