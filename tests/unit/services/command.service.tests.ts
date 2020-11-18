import { expect, should, use, assert } from 'chai';
import CommandService from '../../../src/services/command.service';
import Bots from '../../../src/data/bots';
import AutoMod from '../../../src/modules/auto-mod/auto-mod';
import Leveling from '../../../src/modules/xp/leveling';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import Deps from '../../../src/utils/deps';
import Logs from '../../../src/data/logs';
import Commands from '../../../src/data/commands';
import { SavedBot } from '../../../src/data/models/bot'
import Cooldowns from '../../../src/services/cooldowns';

use(chaiAsPromised);

describe('services/command-service', () => {
    let service: CommandService;
    beforeEach(() => {
        Deps.testing = true;

        service = new CommandService(
            mock<Bots>(),
            mock<AutoMod>(),
            mock<Leveling>(),
            mock<Logs>(),
            mock(Commands));
    });

    describe('handle', () => {
        it('empty message gets ignored', () => {
            const msg: any = { content: '', channel: { reply: () => { throw Error() }}};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('no found command message gets ignored', () => {
            const msg: any = { content: '.pong', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command gets executed', () => {
            const msg: any = { content: '.ping', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command, with extra args, gets executed', async () => {
            const msg: any = { content: '.ping pong', reply: () => { throw Error(); }};
            
            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command, with unmet precondition, gets ignored', async () => {
            const msg: any = { content: '.warnings', reply: () => { throw Error(); }};

            await service.handle(msg);
        });

        it('command override disabled command, throws error', () => {
            const clients = {
                get() {
                    const client = new SavedBot();
                    guild.commands.configs.push({ name: 'ping', enabled: false });
                    return guild;
                }
            };
            service = new CommandService(
                guilds as any,
                mock<AutoMod>(),
                mock<Leveling>(),
                mock<Logs>(),
                mock(Cooldowns),
                mock(Commands));
            
            const msg: any = { content: '.ping', reply: () => { throw Error(); }};

            expect(service.handle(msg)).to.eventually.throw();
        });
    });
});
