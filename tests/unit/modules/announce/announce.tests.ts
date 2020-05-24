import { use, should } from 'chai';
import { SavedGuild, EventType } from '../../../../data/models/guild';
import { mock } from 'ts-mockito';
import { TextChannel, GuildMember } from 'discord.js';
import chaiAsPromised from 'chai-as-promised';
import MemberJoinHandler from '../../../../services/handlers/member-join.handler'
import Guilds from '../../../../data/guilds';

use(chaiAsPromised);
should();

describe('modules/announce', () => {
    let guilds: Guilds;

    beforeEach(() => {
        guilds = mock<Guilds>();
        guilds.get = (): any => new SavedGuild();
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
                const guild = new SavedGuild();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: 'test',
                    channel: '321'
                });
            }

            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.not.throw();
        });
        
        it('member join, event active, message is sent', () => {
            guilds.get = (): any => {
                const guild = new SavedGuild();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: 'test',
                    channel: '123'
                });
            }
            
            const result = () => new MemberJoinHandler(guilds).invoke(member);
    
            result().should.eventually.throw('test');
        });
        
        it('member join, event active, message is sent with applied guild variables', () => {
            guilds.get = (): any => {
                const guild = new SavedGuild();
                guild.announce.events.push({
                    event: EventType.MemberJoin,
                    message: '[USER] joined!',
                    channel: '123'
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