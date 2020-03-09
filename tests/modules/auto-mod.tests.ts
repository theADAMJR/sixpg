import { expect, assert } from 'chai';
import { GuildDocument, MessageFilter } from '../../models/guild';
import { mock } from 'ts-mockito';
import AutoMod from '../../modules/auto-mod/auto-mod';
import { Message, GuildEmoji } from 'discord.js';

describe('AutoMod', () => {
    describe('validateMsg', () => {
        it('contains ban word, has filter, error thrown', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [MessageFilter.Words];
            guild.autoMod.banWords = ['a'];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            expect(result).to.throw();
        });

        it('contains ban word, no filter, ignored', async() =>
        {
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banWords = [];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            expect(result).to.not.throw();
        });
        
        it('contains ban link, has filter, error thrown', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();
            
            guild.autoMod.filters = [MessageFilter.Links];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            expect(result).to.throw();
        });
        
        it('contains ban link, no filter, ignored', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            expect(result).to.not.throw();
        });
    });
});