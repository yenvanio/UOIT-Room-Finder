var config = {
  development: {
      //url to be used in link generation
      url: 'http://127.0.0.1',
      //mongodb connection settings
      database: {
          host: "localhost",
          user: "root",
          password: "testpass",
          database: "Room Finder"
      },
      //server details
      server: {
          host: '127.0.0.1',
          port: '3422'
      }
  },
  production: {
      //url to be used in link generation
      url: 'http://uoit.yshiv.com/api',
      //mongodb connection settings
      database: {
          host: '127.0.0.1',
          port: '27017',
          db:   'site'
      },
      //server details
      server: {
          host:   '127.0.0.1',
          port:   '3421'
      }
  }
  };
  module.exports = config;