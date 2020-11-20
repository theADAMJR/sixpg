# 6PG - Easily Build a Discord Bot With No Code
Customize many different modules including:
Announce, Auto-mod, General, Leveling, Music, and more!

**Dashboard**: https://github.com/theADAMJR/6PG-Dashboard

## Installation
1) Fork/download this repository
2) `npm i` to install packages
3) Setup config.json

### Config
`config.json` example:
```
{
  "app": {
    "id": "731513625335824425",
    "secret": "<your_bot_secret>"
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