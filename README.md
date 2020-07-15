# 6PG - Easily Build a Discord Bot With No Code
Customize many different modules including:
Announce, Auto-mod, General, Leveling, Music, and more!

**Dashboard**: https://github.com/theADAMJR/6PG-Dashboard

⭐ Please star this if you find it useful. This will support the project, and help improve 2PG.

## Installation
1) Fork/download this respository
2) `npm i` to install packages

### Config
`config.json` example:
```
{
    "bot": {
        "secret": "oauthSecret",
        "activity": "6PG.xyz",
        "id": "discordBotId"
    },
    "api": {
        "port": "3000",
        "url": "https://2pg.xyz/api"
    },
    "dashboard": {
        "url": "https://2pg.xyz",
        "distPath": "/dist/dashboard"
    },
    "lavalink": {
        "password": "youshallnotpass"
    },
    "encryptionKey": "minecraft is good",
    "mongoURL": "mongodb://localhost/2PG",
    "modules": ["announce", "autoMod", "commands", "general", "music", "xp", "settings"]
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
