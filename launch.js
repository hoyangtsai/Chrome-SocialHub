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
      if (e.permission === 'fullscreen' || e.permission === 'download' ||
          e.permission === 'geolocation' || e.permission === 'filesystem') {
        e.request.allow();
      }
    });

    window.addEventListener('keydown', this.keydownHandler);

    var navLinks = document.getElementsByClassName('mdl-navigation__link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', this.handleGoto);
    }
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

  handleGoto: function(event) {
    event.preventDefault();
    var anchor = event.target;
    App.layoutTitle.innerHTML = anchor.innerHTML;
    App.webview.src = anchor.href;
    return false;
  }

};

window.addEventListener('load', App.init.bind(App));