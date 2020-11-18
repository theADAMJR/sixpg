import { use, should, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ResumeCommand from '../../../src/commands/resume';
import { mock } from 'ts-mockito';
import { Player } from '../../../src/modules/music/node_modules/erela.js.js';

use(chaiAsPromised);
should();

describe.skip('commands/pause', () => {
    it('no player, error thrown', () =>
    {
        const music = { client: { players: null }};

        const result = () => new ResumeCommand(music as any);

        expect(result).to.throw();
    });

    it('player paused, error thrown', () =>
    {
        const music = { client: { players: { spawn: (...args: any) => 
        {
            const player = mock<Player>();
            player.playing = false;
            return player;
        }}}};

        const result = () => new ResumeCommand(music as any);

        expect(result).to.throw();
    });

    it('player not paused, paused', () =>
    {
        const music = { client: { players: { spawn: (...args: any) => 
        {
            const player = mock<Player>();
            player.playing = true;
            return player;
        }}}};

        const result = () => new ResumeCommand(music as any);

        expect(result).to.throw();
    });
});