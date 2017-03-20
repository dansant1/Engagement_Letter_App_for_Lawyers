module.exports = {
  servers: {
    one: {
      host: '52.205.78.126',
      username: 'ubuntu',
      pem: '~/desktop/daniel/legalapp/private/legalapp.pem',
      // password: 'password',
      // or leave blank to authenticate using ssh-agent
      opts: {
          port: 22,
      },
    }
  },

  meteor: {
    name: 'Legalapp',
    path: '~/desktop/daniel/legalapp',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true, // skip building mobile apps, but still build the web.cordova architecture
      debug: true,
      cleanAfterBuild: true, // default
    },
    env: {
      // PORT: 8000, // useful when deploying multiple instances (optional)
      ROOT_URL: 'http://legalapp.grupoddv.com', // If you are using ssl, this needs to start with https
      MONGO_URL: 'mongodb://development:Jera$10390@ds137090.mlab.com:37090/legalapp'
    },
    deployCheckWaitTime: 60, // default 10
    deployCheckPort: 3000,
    enableUploadProgressBar: true
  }
};
