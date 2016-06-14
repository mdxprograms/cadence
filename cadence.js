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
  currentUser: '',
  layout: null,

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
  createView: function () {
    'use strict';
    this.view = "<h2>User: " + this.data.name + "</h2>" + "<p>Active: </p>";

    return this;
  },

  show: function () {
    'use strict';
    console.log(this);

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

  makeRequest: function (url) {
    'use strict';
    var self = this;
    fetch(url, {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      self.data = data;
    });

    return self;
  }
};

var app = Cadence.makeRequest('http://uinames.com/api/').createView().show();