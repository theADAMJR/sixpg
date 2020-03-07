import { assert } from 'chai';
import CommandHandler from '../../handlers/command-handler';

describe('CommandHandler', () => {
    beforeEach(() => {
        CommandHandler.initialize();
    });

    describe('handle', () => {
        it('empty message gets ignored', async() => {
            const msg: any = { content: '', channel: { reply: () => { throw Error() }}};

            const result = async() => await CommandHandler.handle(msg);

            assert.doesNotThrow(result);
        });

        it('no found command message gets ignored', async() => {
            const msg: any = { content: '/pong', reply: () => { throw Error(); }};

            const result = async() => await CommandHandler.handle(msg);

            assert.doesNotThrow(result);
        });

        it('found command gets executed', async() => {
            const msg: any = { content: '/ping', reply: () => { throw Error(); }};

            const result = async() => await CommandHandler.handle(msg);

            assert.throws(result);
        });
    });
})