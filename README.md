# 2PG - Simple, powerful Discord bot
Simple multi-purpose Discord bot made with TypeScript-> https://2pg.xyz

**Dashboard**: https://github.com/theADAMJR/2PG-Dashboard

⭐ Please star this if you find it useful. This will support the project, and help improve 2PG.

![2PG Avatar](https://2pg.xyz/assets/img/2PGAvatarTransparent.png)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d6c9610e0eb4ae5a4045ab3b92f80bc)](https://www.codacy.com/manual/ADAMJR/2PG?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=theADAMJR/2PG&amp;utm_campaign=Badge_Grade)

## Installation
1) Fork/download this respository
2) `npm i` to install packages

### Config
`config.json` example:
```
{
    "bot": {
        "secret": "oauthSecret",
        "activity": "2PG.xyz",
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
    "mongoURL": "mongodb://localhost/2PG",
    "modules": ["announce", "autoMod", "commands", "general", "music", "xp", "settings"]
}
```

## Hosting
1) `npm start` to start the bot, and Lavalink

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
