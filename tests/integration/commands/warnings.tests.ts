import { use, should, expect } from 'chai';
import { mock } from 'ts-mockito';
import WarningsCommand from '../../../commands/warnings';
import chaiAsPromised from 'chai-as-promised';
import { CommandContext } from '../../../commands/command';

use(chaiAsPromised);
should();

describe('commands/warnings', () => {
    it('', () =>
    {
        const ctx = mock<CommandContext>();
        ctx.args[0]
        new WarningsCommand().execute(ctx);
    });
});