import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import chaiAsPromised from 'chai-as-promised';
import { CommandContext } from '../../../commands/command';
import PlayCommand from '../../../commands/play';

should();
use(chaiAsPromised);

describe('commands/play', () => {
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