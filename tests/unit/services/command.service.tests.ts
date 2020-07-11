import { expect, should, use, assert } from 'chai';
import CommandService from '../../../services/command.service';
import Bots from '../../../data/bots';
import AutoMod from '../../../modules/auto-mod/auto-mod';
import Leveling from '../../../modules/xp/leveling';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import Deps from '../../../utils/deps';
import Logs from '../../../data/logs';
import Commands from '../../../data/commands';
import { SavedBot } from '../../../data/models/bot'
import Cooldowns from '../../../services/cooldowns';

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
            const guilds = {
                get() {
                    const guild = new SavedBot();
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
