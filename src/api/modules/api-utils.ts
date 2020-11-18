import { User } from 'discord.js';
import { AuthClient } from '../server';

export async function getUser(key: any) {
  if (!key) return null;

  return await AuthClient.getUser(key);
}

export function leaderboardMember(user: User, xpInfo: any) {
  return {
    id: user.id,
    username: user.username,
    tag: '#' + user.discriminator,
    displayAvatarURL: user.displayAvatarURL({ dynamic: true }),
    ...xpInfo
  };
}

export function sendError(res: any, code: number, error: Error) {
  return res.status(code).json({ code, message: error?.message })
}