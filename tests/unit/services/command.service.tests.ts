import { should, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import CommandService from '../../../services/command.service';

use(chaiAsPromised);
should();

describe('services/command-service', () => {
    let service: CommandService;
    beforeEach(() => {
        service = new CommandService();
    });

    describe('handle', () => {
        it('empty message gets ignored', async() => {
            const msg: any = { content: '', channel: { reply: () => { throw Error() }}};

            const result = () => service.handle(msg);

            result().should.eventually.throw();
        });

        it('no found command message gets ignored', async() => {
            const msg: any = { content: '/pong', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            result().should.eventually.not.throw();
        });

        it('found command gets executed', async() => {
            const msg: any = { content: '/ping', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            result().should.eventually.throw();
        });

        it('found command, with extra args, gets executed', async() => {
            const msg: any = { content: '/ping pong', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            result().should.eventually.throw();
        });

        it('found command, with unmet precondition, gets ignored', async() => {
            const msg: any = { content: '/warnings', reply: () => { throw Error(); }};

            const result = () => service.handle(msg);

            result().should.eventually.not.throw();         
        });
    });
})