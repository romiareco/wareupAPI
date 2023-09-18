const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "db4free.net",
      user: "wareupadmindev",
      password: "Pass123*",
      database: "wareup_dev",
      recreate: false, //indicates if the tables are recreated in database
      alter: true, //indicates if the tables should be updated in database
      logging: false
    },
    listPerPage: 10,
    mode: "dev", //dev - prod 
    sendgrid:{
      apikey: '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',
      from:'wareuplogistica@gmail.com',
      contactTo:'wareuplogistica@gmail.com',
    },
    frontendUrl:"https://wareup-front-dev.onrender.com"
  };

  module.exports = config;