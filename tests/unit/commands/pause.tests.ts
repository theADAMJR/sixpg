import { use, should, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import PauseCommand from '../../../src/commands/pause';
import { mock } from 'ts-mockito';
import { Player } from '../../../src/modules/music/node_modules/erela.js.js';

use(chaiAsPromised);
should();

describe.skip('commands/resume', () => {
    it('no player, error thrown', () =>
    {
        const music = { client: { players: null }};

        const result = () => new PauseCommand(music as any);

        expect(result).to.throw();
    });

    it('player resumed, error thrown', () =>
    {
        const music = { client: { players: { spawn: (...args: any) => 
        {
            const player = mock<Player>();
            player.playing = false;
            return player;
        }}}};

        const result = () => new PauseCommand(music as any);

        expect(result).to.throw();
    });

    it('player paused, resumed', () =>
    {
        const music = { client: { players: { spawn: (...args: any) => 
        {
            const player = mock<Player>();
            player.playing = true;
            return player;
        }}}};

        const result = () => new PauseCommand(music as any);

        expect(result).to.throw();
    });
});