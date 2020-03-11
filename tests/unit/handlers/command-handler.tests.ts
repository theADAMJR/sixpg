import { expect } from 'chai';
import CommandHandler from '../../../handlers/command-handler';

describe('CommandHandler', () => {
    beforeEach(() => {
        CommandHandler.initialize();
    });

    describe('handle', () => {
        it('empty message gets ignored', async() => {
            const msg: any = { content: '', channel: { reply: () => { throw Error() }}};

            const result = async() => await CommandHandler.handle(msg);

            expect(result).to.not.throw;
        });

        it('no found command message gets ignored', async() => {
            const msg: any = { content: '/pong', reply: () => { throw Error(); }};

            const result = async() => await CommandHandler.handle(msg);

            expect(result).to.not.throw;
        });

        it('found command gets executed', async() => {
            const msg: any = { content: '/ping', reply: () => { throw Error(); }};

            const result = async() => await CommandHandler.handle(msg);

            expect(result).to.throw;
        });

        it('found command, with extra args, throws error', async() => {
            const msg: any = { content: '/ping pong', reply: () => { throw Error(); }};

            const result = async() => await CommandHandler.handle(msg);

            expect(result).to.throw;
        });
    });
})