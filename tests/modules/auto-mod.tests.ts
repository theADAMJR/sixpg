import { use, should } from 'chai';
import { GuildDocument, MessageFilter } from '../../models/guild';
import { mock } from 'ts-mockito';
import AutoMod from '../../modules/auto-mod/auto-mod';
import { Message } from 'discord.js';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);
should();

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

            result().should.eventually.throw();
        });
        
        it('contains ban word, has filter, auto deleted, error thrown', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [MessageFilter.Words];
            guild.autoMod.banWords = ['a'];
            msg.content = 'a';
            msg.delete = () => { throw new Error('deleted'); }

            const result = () => AutoMod.validateMsg(msg, guild);

            result().should.eventually.throw('deleted');
        });

        it('contains ban word, no filter, ignored', async() =>
        {
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banWords = [];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            result().should.not.eventually.throw();
        });
        
        it('contains ban link, has filter, error thrown', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();
            
            guild.autoMod.filters = [MessageFilter.Links];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            result().should.eventually.throw();
        });
        
        it('contains ban link, no filter, ignored', async() =>
        {            
            const guild = mock<GuildDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => AutoMod.validateMsg(msg, guild);

            result().should.not.eventually.throw();
        });
    });
});