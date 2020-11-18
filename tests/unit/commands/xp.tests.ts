import XPCommand from '../../../src/commands/xp';
import { expect } from 'chai';

describe.skip('commands/xp', () => {
    let command: XPCommand;

    beforeEach(() => command = new XPCommand());
    
    it('mentioned user not found, error thrown', () => {
        const result = () => command.execute({} as any, '<@!>');

        expect(result).to.throw();
    });

    it('xp bot user, error thrown', () => {
        const ctx = { member: { user: { bot: true }}} as any;

        const result = () => command.execute(ctx, '');

        expect(result).to.throw();
    });
});