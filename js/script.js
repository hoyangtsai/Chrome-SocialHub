var App = {
  webview: null,
  layoutTitle: '',
  navLinks: null,
  appHeader: null,
  appContent: null,
  appLayout: null,

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

    window.addEventListener('keydown', this._keydownHandler);

    this.navLinks = document.getElementsByClassName('mdl-navigation__link');
    for (var i = 0; i < this.navLinks.length; i++) {
      this.navLinks[i].addEventListener('click', this._handleGoto);
    }

    this.layoutTitle = document.getElementById('app-title');
    this.webview.addEventListener('loadstop', this._handleTitleChange);

    this.appHeader = document.getElementById('app-header');
    this.appContent = document.getElementById('app-content');
    this.appLayout = document.getElementById('app-layout');

    window.addEventListener('wheel', this._handleScrolling);
  },

  _removeClass: function(el, className) {
    if (el.classList)
      return el.classList.remove(className);
    else
      return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },

  _addClass: function(el, className) {
    if (el.classList)
      return el.classList.add(className);
    else
      return el.className += ' ' + className;
  },

  _keydownHandler: function(event) {
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

  _handleGoto: function(event) {
    event.preventDefault();
    var anchor = event.target;
    for (var i = 0; i < App.navLinks.length; i++) {
      App._removeClass(App.navLinks[i], 'active');
    }
    App.webview.src = anchor.href;
    App._addClass(anchor, 'active');
  },

  _handleTitleChange: function(event) {
    var activeAnchor = document.getElementsByClassName('active');
    App.layoutTitle.innerHTML = activeAnchor[0].innerHTML;
  },

  _handleScrolling: function(event) {
    if (event.wheelDelta < -1) {
      App.appLayout.classList.add('layout-scrolldown');
      App.appHeader.classList.add('scrolldown');
      App.appContent.classList.add('scrolldown');
    } else {
      App.appLayout.classList.remove('layout-scrolldown');
      App.appHeader.classList.remove('scrolldown');
      App.appContent.classList.remove('scrolldown');
    }
  }
};

window.addEventListener('load', App.init.bind(App));