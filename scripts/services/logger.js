angular.module('platen.services').factory('logger', function() {

  var MAX_QUEUE_SIZE = 100;
  var offset = 0;
  var log = [];

  return {
    log: function(message, location) {
      var entry = {
        message: message,
        location: location,
        date: new Date()
      };

      if (log.length > MAX_QUEUE_SIZE) {
        console.log("removing log item");
        var item = log[offset];
        if (++offset * 2 >= log.length) {
          log = log.slice(offset);
          offset = 0;
        }
      }

      log.push(entry);

      console.log(message + ', from ' + location + ' at ' + entry.date);
    },

    getLogs: function() {
      return log.reverse();
    }
  };
});