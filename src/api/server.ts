import express from 'express';
import config from '../../config.json';
import cors from 'cors';
import OAuthClient from '@2pg/oauth';
import bodyParser from 'body-parser';
import { resolve } from 'path';

import { router as apiRoutes } from './routes/api-routes';
import Log from '../utils/log';

export const app = express();
export const AuthClient = new OAuthClient({
    id: config.bot.id,
    secret: config.bot.secret,
    redirectURI: `${config.api.url}/auth`,
    scopes: ['identify', 'guilds']
});

export default class API {
    constructor() {
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/api', apiRoutes);
        
        const dashboardPath = resolve('./dist/dashboard')
        app.use(express.static(dashboardPath));
        
        app.all('*', (req, res) => res
            .status(200)
            .sendFile(`${dashboardPath}/index.html`));
    }
}

const port = config.api.port || 3000;
app.listen(port, () => Log.info(`API is live on port ${port}`));
