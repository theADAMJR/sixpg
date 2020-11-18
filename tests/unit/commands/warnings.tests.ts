import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import WarningsCommand from '../../../src/commands/warnings';
import chaiAsPromised from 'chai-as-promised';
import { CommandContext } from '../../../src/commands/Command';

use(chaiAsPromised);
should();

describe.skip('commands/warnings', () => {
    it('null channel, throws error', () =>
    {
        const ctx = mock<CommandContext>();
        
        const result = () => new WarningsCommand().execute(ctx, '1');

        result().should.eventually.throw();
    });
});