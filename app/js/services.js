'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
// TODO : please note https://github.com/angular/angular.js/issues/1388 for readfile / savefile
angular.module('myApp.services', [])


  .factory('gameServer', function($resource){
      return $resource('http://gametainerstest.com:8003/gameservers/:id/:action:extra', {}, {
        info: {method: 'GET', params: {action:""}, isArray: true },
        configlist: {method: 'GET', params: {action:"configlist"}},	
        on: {method: 'GET', params: {action:"on"}},
        off: {method: 'GET', params: {action:"off"}},
        command: {method: 'POST', params: {action:"console"}},
        addonsinstalled: {method: 'GET', params: {action:"addonsinstalled"}},
        readfile: {method: 'GET', params: {action:"file"}},
        savefile: {method: 'PUT', params: {action:"file"}},
        update: { method: 'POST', params: {dest:"modifyProduct"}},
      });
    })

 .factory('bukget', function($resource){
      return $resource('http://api.bukget.org/3/:action:extra', {}, {
        categories: {method: 'GET', params: {action:"categories"}, isArray: true },
        plugins: {method: 'GET', params: {action:"plugins", size:16, fields:"description,plugin_name,server,website,versions.game_versions,versions.version,authors"}, isArray: true },	
      });
    })
 
  .factory('socket', function ($rootScope) {
    var socket = io.connect("http://0.0.0.0:8031");
    return {
      on: function (eventName, callback) {
	socket.on(eventName, function () {
	  var args = arguments;
	  $rootScope.$apply(function () {
	    callback.apply(socket, args);
	  });
	});
      },
      emit: function (eventName, data, callback) {
	socket.emit(eventName, data, function () {
	  var args = arguments;
	  $rootScope.$apply(function () {
	    if (callback) {
	      callback.apply(socket, args);
	    }
	  });
	})
      }
    };
  })

  .value('version', '0.1');
