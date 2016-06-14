/*jshint nomen: true*/
/*global document, XMLHttpRequest, console*/
var testData = [
  {
    username: 'Josh',
    active: 0
  },
  {
    username: 'bob',
    active: 1
  }
];

var Cadence = {
  view: '',
  data: '',
  currentUser: '',
  layout: null,
  httpRequest: null,

  setData: function (url) {
    'use strict';
    this.utils.makeRequest(url);
  },

  getData: function () {
    'use strict';
    return this.data;
  },

  findUser: function (username) {
    'use strict';
    var arrLen = testData.length,
      i,
      self = this;

    testData.forEach(function (user) {
      if (user.username === username) {
        self.currentUser = user;
        return;
      }
    });

    return this;
  },

  //@TODO: make this dynamic with template data
  createView: function (view) {
    'use strict';
    if (this.currentUser) {
      this.view = "<h2>User: " + this.currentUser.username + "</h2>" + "<p>Active: " + this.currentUser.active + "</p>";
    }

    return this;
  },

  show: function () {
    'use strict';
    if (!this.currentUser) {
      return;
    }

    if (!this.layout) {
      this.defaultLayout().innerHTML += this.view;
    } else {
      this.layout.innerHTML += this.view;
    }
  },

  defaultLayout: function () {
    'use strict';
    this.layout = document.body.appendChild(document.createElement('div'));
    return this.layout;
  },

  utils: {
    makeRequest: function (url) {
      'use strict';
      var httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        console.error('Cannot create http request instance');
        return false;
      }

      httpRequest.onreadystatechange = this.handleRequest;
      httpRequest.open('GET', url);
      httpRequest.send();

      return this;
    },

    handleRequest: function (res) {
      'use strict';
      if (res.target.readyState === 4) {
        if (res.target.status === 200) {
          this.data = res.target.responseText;
        } else {
          console.error('There was a problem with the request');
        }
      }

      console.log(this);
      //      this.data = this.httpRequest.data;

      return this;
    }
  }
};

var app = Cadence.setData('http://uinames.com/api/');
app.getData();
