# 6PG - Easily Build a Discord Bot With No Code
Customize many different modules including:
Announce, Auto-mod, General, Leveling, Music, and more!

**Dashboard**: https://github.com/theADAMJR/6PG-Dashboard

## Installation
1) Fork/download this repository
2) `npm i` to install packages

### Config
`config.json` example:
```
{
  "bot": {
    "secret": "<your_bot_secret>",
    "id": "731513625335824425"
  },
  "api": {
    "port": "3000",
    "url": "http://localhost:3000/api"
  },
  "dashboardURL": "http://localhost:3000",
  "encryptionKey": "something very secure",
  "mongoURI": "mongodb://localhost/6PG"
}
```

## Hosting
a) `npm start` to start the bot, and Lavalink
b) `npm run start:dev` to start the bot, in development mode, and Lavalink

### Database
- Remember to have a local MongoDB database running `mongod`

### Music
- Have Lavalink.jar running - `java -jar Lavalink.jar` (done with npm start)

[Lavalink Setup](https://github.com/Frederikam/Lavalink#server-configuration)

## Troubleshooting
- Open an issue, if you find any bugs or have any suggestions etc.

### Common Errors
`UnhandledPromiseRejectionWarning: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Possible Cause**: No MongoDB server instance running, start with `mongod`
