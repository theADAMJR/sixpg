import express from 'express';
import config from '../config.json';
import cors from 'cors';
import OAuthClient from 'disco-oauth';
import bodyParser from 'body-parser';

import { router as apiRoutes } from './routes/api-routes';
import Log from '../utils/log';

export const app = express(),
             AuthClient = new OAuthClient(config.bot.id, config.bot.secret);

export default class API {
    constructor() {
        AuthClient.setRedirect(`${config.webapp.url}/auth`);
        AuthClient.setScopes('identify', 'guilds');

        app.use(cors());
        app.use(bodyParser.json());
        app.use('/api', apiRoutes);
        
        app.use(express.static(config.webapp.distPath)); // use only for production
        
        app.all('*', (req, res) => res.status(200).sendFile(
            config.webapp.distPath + '/index.html'));
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => Log.info(`API is live on port ${port}`));
