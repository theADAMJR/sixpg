import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import { CommandContext } from '../../../commands/command';
import PlayCommand from '../../../commands/play';

use(chaiAsPromised);
should();

describe('commands/play', () => {
    it('null query, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        ctx.member = { voice: { channel: null }} as any;
        ctx.args = [];
        
        const result = () => new PlayCommand().execute(ctx);

        result().should.eventually.throw();
    });
    
    it('null channel, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        ctx.member = { voice: { channel: null }} as any;
        ctx.args = ['a'];
        
        const result = () => new PlayCommand().execute(ctx);

        result().should.eventually.throw();
    });
});