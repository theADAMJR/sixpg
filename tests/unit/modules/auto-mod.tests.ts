import { use, should, expect } from 'chai';
import { BotDocument, MessageFilter } from '../../../src/data/models/bot';
import { mock } from 'ts-mockito';
import AutoMod from '../../../src/modules/auto-mod/auto-mod';
import { Message } from 'discord.js';
import chaiAsPromised from 'chai-as-promised';
import {  SavedMember } from '../../../src/data/models/member';
import Members from '../../../src/data/members';

describe('modules/auto-mod', () => {
    let autoMod: AutoMod;

    beforeEach(() => {
        const members = mock<Members>();
        members.get = (): any => new SavedMember();
        
        autoMod = new AutoMod(members);
    });
    
    describe('validateMsg', () => {

        it('contains ban word, has filter, error thrown', async() => {            
            const client = mock<BotDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [MessageFilter.Words];
            guild.autoMod.banWords = ['a'];
            msg.content = 'a';
            
            const result = () => autoMod.validateMsg(msg, guild);

            result().should.eventually.throw();
        });
        
        it('contains ban word, has filter, auto deleted, error thrown', async() => {            
            const client = mock<BotDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [MessageFilter.Words];
            guild.autoMod.banWords = ['a'];
            msg.content = 'a';
            msg.delete = () => { throw new TypeError('deleted'); }

            const result = () => autoMod.validateMsg(msg, guild);

            result().should.eventually.throw('deleted');
        });

        it('contains ban word, no filter, ignored', async() => {
            const client = mock<BotDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banWords = [];
            msg.content = 'a';

            const result = () => autoMod.validateMsg(msg, guild);

            result().should.not.eventually.throw();
        });
        
        it('contains ban link, has filter, error thrown', async() => {            
            const client = mock<BotDocument>();
            const msg = mock<Message>();
            
            guild.autoMod.filters = [MessageFilter.Links];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => autoMod.validateMsg(msg, guild);

            result().should.eventually.throw();
        });
        
        it('contains ban link, no filter, ignored', async() => {            
            const client = mock<BotDocument>();
            const msg = mock<Message>();

            guild.autoMod.filters = [];
            guild.autoMod.banLinks = ['a'];
            msg.content = 'a';

            const result = () => autoMod.validateMsg(msg, guild);

            result().should.not.eventually.throw();
        });
    });

    describe('warnMember', () => {
        it('warn member, message sent to user', async() => {
            const member: any = { id: '123', send: () => { throw new TypeError() }, user: { bot: false }};
            const instigator: any = { id: '321' };

            const result = () => autoMod.warn(member, instigator);

            result().should.eventually.throw();
        });

        it('warn self member, error thrown', async() => {
            const member: any = { id: '123', user: { bot: false } };
            const instigator: any = { id: '123' };

            const result = () => autoMod.warn(member, instigator);

            result().should.eventually.throw();
        });

        it('warn bot member, error thrown', async() => {
            const member: any = { id: '123', user: { bot: true }};
            const instigator: any = { id: '321' };

            const result = () => autoMod.warn(member, instigator);

            result().should.eventually.throw();
        });
    });
});