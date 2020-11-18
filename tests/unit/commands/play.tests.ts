import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import PlayCommand from '../../../src/commands/play';
import { CommandContext } from '../../../src/commands/Command';

should();
use(chaiAsPromised);

describe.skip('commands/play', () => {
    it('null query, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        ctx.member = { voice: { channel: null }} as any;
        
        const result = () => new PlayCommand().execute(ctx);

        result().should.eventually.throw();
    });
    
    it('null channel, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        ctx.member = { voice: { channel: null }} as any;
        
        const result = () => new PlayCommand().execute(ctx, 'a');

        result().should.eventually.throw();
    });
});