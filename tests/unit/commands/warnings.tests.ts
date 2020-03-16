import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import WarningsCommand from '../../../commands/warnings';
import chaiAsPromised from 'chai-as-promised';
import { CommandContext } from '../../../commands/command';

use(chaiAsPromised);
should();

describe('commands/warnings', () => {
    it('null channel, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        
        const result = () => new WarningsCommand().execute(ctx, 1);

        result().should.eventually.throw();
    });
});