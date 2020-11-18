import { use, should } from 'chai';
import { SavedBot, EventType } from '../../../../src/data/models/bot';
import { mock } from 'ts-mockito';
import { TextChannel, GuildMember } from 'discord.js';
import chaiAsPromised from 'chai-as-promised';
import MemberJoinHandler from '../../../../src/services/handlers/member-join.handler'
import Bots from '../../../../src/data/bots';

use(chaiAsPromised);
should();

describe('modules/announce', () => {
    let guilds: Bots;

    beforeEach(() => {
        guilds = mock<Bots>();
        guilds.get = (): any => new SavedBot();
    });

    describe('member join handler', () =>
    {
        let member: GuildMember;

        beforeEach(() => {
            member = {
                id: '123',
                guild: {
                    name: 'Guild',
                    channels: { cache: {
                        get: (id: string) => {
                            const channel = mock<TextChannel>();
                            channel.send = (message: any): any => {
                                throw new TypeError(message);
                            }
                            return (id === '123') ? channel : null;
                        }
                    }},
                    memberCount: 2
                }
            } as any;
        });

        it('member join, member undefined, returns', () => {
            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.not.throw();
        });
        
        it('member join, event not active, returns', () => {
            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.not.throw();
        });
        
        it('member join, channel not found, returns', () => {
            guilds.get = (): any => {
                const client = new SavedBot();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: 'test',
                    channelName: '321'
                });
            }

            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.not.throw();
        });
        
        it('member join, event active, message is sent', () => {
            guilds.get = (): any => {
                const client = new SavedBot();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: 'test',
                    channelName: '123'
                });
            }
            
            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.throw('test');
        });
        
        it('member join, event active, message is sent with applied guild variables', () => {
            guilds.get = (): any => {
                const client = new SavedBot();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: '[USER] joined!',
                    channelName: '123'
                });
            }

            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.throws(new TypeError('<@!123> joined!'));
        });
    });

    describe('message deleted handler', () => {
        it('')
    });
});