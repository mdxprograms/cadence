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

var db, dataKey, Cadence = {
  view: '',
  currentUser: '',
  layout: null,

  start: function () {
    this.db = [];
    this.dataKey = '';
    return this;
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

  defaultLayout: function () {
    'use strict';
    this.layout = document.body.appendChild(document.createElement('div'));
    return this.layout;
  },

  makeRequest: function (url, key) {
    'use strict';
    var self = this;
    fetch(url, {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      self.setData(key, data);
    });

    return self;
  },

  setData: function (key, data) {
    var item = JSON.stringify(data),
      items = [data] || [];

    if (items.length > 1) {
      items.push(item);
    } else {
      items = item;
    }
    this.db = items;
    this.key = key;
    localStorage.setItem(key, this.db);
    return this;
  },

  getData: function (key) {
    if (localStorage.getItem(key)) {
      this.dataKey = key;
      this.db = JSON.parse(localStorage.getItem(dataKey));
      return this;
    }
  },

  //@TODO: make this dynamic with template data
  createView: function () {
    'use strict';
    this.view = "<h2>User: " + 'db.name' + "</h2>" + "<p>Active: </p>";

    return this;
  },

  show: function () {
    'use strict';
    if (!this.layout) {
      this.defaultLayout().innerHTML += this.view;
    } else {
      this.layout.innerHTML += this.view;
    }
  }
};

Cadence
  .makeRequest('http://uinames.com/api/', 'people')
  .createView()
  .show();
