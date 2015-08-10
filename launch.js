var App = {
  webview: null,

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
  }
};

window.addEventListener('load', App.init.bind(App));
