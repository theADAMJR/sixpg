import { use, should, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import StopCommand from '../../../src/commands/skip';

use(chaiAsPromised);
should();

describe.skip('commands/stop', () => {
    it('no player, error thrown', () =>
    {
        const music = { client: { players: null }};

        const result = () => new StopCommand(music as any);

        expect(result).to.throw();
    });

    it('active player, destroyed', () =>
    {
        const music = { client: { players: { destroy: () => { throw new TypeError() }}}};

        const result = () => new StopCommand(music as any);

        expect(result).to.throw();
    });
});