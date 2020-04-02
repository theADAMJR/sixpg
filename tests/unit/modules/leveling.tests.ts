import { should, use, expect } from 'chai';
import { mock } from 'ts-mockito';
import Leveling from "../../../modules/xp/leveling";
import { GuildDocument } from '../../../models/guild';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);
should();

describe('modules/leveling', () => {
    let leveling: Leveling;

    beforeEach(() => {
        leveling = new Leveling();
    });

    describe('validateXPMsg', () => {
        it('null message member throws exception', () => {
            const guild = mock<GuildDocument>();
            let msg: any = { member: null };

            const result = () => leveling.validateXPMsg(msg, guild);  

            result().should.eventually.throw();
        });

        it('member with ignored role throws exception', () => {
            const guild = mock<GuildDocument>();
            let msg: any = { member: { roles: { cache: [{ id: '123' }] }}};
            guild.xp.ignoredRoles = ['123'];

            const result = () => leveling.validateXPMsg(msg, guild);

            result().should.eventually.throw();
        });
    });

    describe('getLevel', () => {
        it('0 returns level 1', () => {
            const result = new Leveling().getLevel(0, 0);
    
            expect(result).to.deep.equal(1);
        });

        it('floored level returned, min level messages', () => {
            const result = new Leveling().getLevel(6, 50);
    
            expect(result).to.equal(2);
        });

        it('floored level returned, greater than min level messages', () => {
            const result = new Leveling().getLevel(8, 50);
    
            expect(result).to.equal(2);
        });
    });
});
