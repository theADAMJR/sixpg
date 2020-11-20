import fetch from 'node-fetch';
import Log from './utils/log';

Log.info('Keeping self alive every 5 minutes', 'ping');

setInterval(async() => {
  await fetch(process.env.DASHBOARD_URL);  
  Log.info('Kept app alive.');
}, 5 * 60 * 1000)