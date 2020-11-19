import fetch from 'node-fetch';
import config from '../config.json';
import Log from './utils/log';

Log.info('Keeping self alive every 5 minutes', 'ping');

setInterval(async() => {
  await fetch(config.dashboardURL);  
  Log.info('Kept app alive.');
}, 5 * 60 * 1000)