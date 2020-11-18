import EventVariables from "../../../../src/modules/announce/event-variables";
import { expect } from "chai";

describe('modules/announce/event-variables', () => {
    it('USER', () => {
        const variables = new EventVariables('[USER] = trash');

        const user = { id: '123' } as any;
        const result = variables.user(user).toString();

        expect(result).to.equal('<@!123> = trash');
    });

    it('REASON', () => {
        const variables = new EventVariables('User was banned for `[REASON]`');

        const reason = { user: null, reason: 'hacking' } as any;
        const result = variables.reason(reason).toString();

        expect(result).to.equal('User was banned for `hacking`');
    });

    it('GUILD', () => {
        const variables = new EventVariables('[GUILD] is good server');

        const user = { name: 'test' } as any;
        const result = variables.guild(user).toString();

        expect(result).to.equal('test is good server');
    });

    it('MEMBER_COUNT', () => {
        const variables = new EventVariables('[MEMBER_COUNT] member(s)');

        const client = { memberCount: 1 } as any;
        const result = variables.memberCount(guild).toString();

        expect(result).to.equal('1 member(s)');
    });

    it('MESSAGE', () => {
        const variables = new EventVariables('Message: `[MESSAGE]`');

        const message = { content: 'hi' } as any;
        const result = variables.message(message).toString();

        expect(result).to.equal('Message: `hi`');
    });

    it('OLD_LEVEL', () => {
        const variables = new EventVariables('Old: `[OLD_LEVEL]`');

        const level = 1;
        const result = variables.oldLevel(level).toString();

        expect(result).to.equal('Old: `1`');
    });

    it('NEW_LEVEL', () => {
        const variables = new EventVariables('New: `[NEW_LEVEL]`');

        const level = 2;
        const result = variables.newLevel(level).toString();

        expect(result).to.equal('New: `2`');
    });
});