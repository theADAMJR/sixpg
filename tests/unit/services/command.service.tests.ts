import { expect, should, use, assert } from 'chai';
import CommandService from '../../../services/command.service';
import Guilds from '../../../data/guilds';
import AutoMod from '../../../modules/auto-mod/auto-mod';
import Leveling from '../../../modules/xp/leveling';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import Deps from '../../../utils/deps';

use(chaiAsPromised);

describe('services/command-service', () => {
    let service: CommandService;
    beforeEach(() => {
        Deps.testing = true;

        service = new CommandService(
            mock<Guilds>(),
            mock<AutoMod>(),
            mock<Leveling>());
    });

    describe('handle', () => {
        it('empty message gets ignored', () => {
            const msg: any = { content: '', channel: { reply: () => { throw Error() }}};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('no found command message gets ignored', () => {
            const msg: any = { content: '/pong', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command gets executed', () => {
            const msg: any = { content: '/ping', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command, with extra args, gets executed', async () => {
            const msg: any = { content: '/ping pong', reply: () => { throw Error(); }};
            
            const result = () => service.handle(msg);

            expect(result()).to.eventually.throw();
        });

        it('found command, with unmet precondition, gets ignored', async () => {
            const msg: any = { content: '/warnings', reply: () => { throw Error(); }};

            await service.handle(msg);
        });
    });
});
