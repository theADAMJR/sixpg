# 2PG
Simple multi-purpose Discord bot made with TypeScript

## Installation
1) Fork/download this respository
2) `npm i` to install packages

### Config
`config.json` example:
```
{
    "bot": {
        "token": "yourBotToken", // used for bot user login
        "secret": "oauthSecret", // used for webapp login integration
        "id": "discordBotId" // used for webapp login integration
    },
    "api": {
        "url": "https://2pg.xyz/api", // used for xp cards etc.
        "managerPermission": "MANAGE_GUILD" // required permission for managing dashboard 
    },
    "webapp": {
        "url": "https://2pg.xyz", // the URL of the dashboard
        "distPath": "/Documents/Projects/twopg-dashboard/dist/twopg-dashboard" // the compiled webapp; contains index.html (created with 'ng build --prod' in webapp)
    },
    "lavalink": { // used for music server
        "password": "youshallnotpass"
    },
    "tests": { // optional -> used for tests
        "guild": {
            "id": "yourTestGuildId" // used for integration tests
        }
    },
    "mongoURL": "mongodb://localhost/2PG", // database URL (port 27017)
    "modules": ["announce", "auto-mod", "general", "music", "xp"] // enabled modules used for validation in API
}
```
- Remove Comments


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
