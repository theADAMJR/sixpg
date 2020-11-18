import { should, use, expect } from 'chai';
import { mock } from 'ts-mockito';
import Leveling from '../../../src/modules/xp/leveling';
import { BotDocument } from '../../../src/data/models/bot';
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
            const client = mock<BotDocument>();
            let msg: any = { member: null };

            const result = () => leveling.validateXPMsg(msg, guild);  

            result().should.eventually.throw();
        });

        it('member with ignored role throws exception', () => {
            const client = mock<BotDocument>();
            let msg: any = { member: { roles: { cache: [{ name: '123' }] }}};
            guild.leveling.ignoredRoleNames = ['123'];

            const result = () => leveling.validateXPMsg(msg, guild);

            result().should.eventually.throw();
        });
    });

    describe('getLevel', () => {
        it('0 returns level 1', () => {
            const result = new Leveling().getLevel(0);
    
            expect(result).to.deep.equal(1);
        });

        it('floored level returned, min level messages', () => {
            const result = new Leveling().getLevel(300);
    
            expect(result).to.equal(2);
        });

        it('floored level returned, greater than min level messages', () => {
            const result = new Leveling().getLevel(400);
    
            expect(result).to.equal(2);
        });
    });
    describe('getLevel', () => {
        it('0 returns level 1', () => {
            const result = Leveling.xpInfo(0).level;
    
            expect(result).to.deep.equal(1);
        });

        it('floored level returned, min level messages', () => {
            const result = Leveling.xpInfo(300).level;
    
            expect(result).to.equal(2);
        });

        it('floored level returned, greater than min level messages', () => {
            const result = Leveling.xpInfo(400).level;
    
            expect(result).to.equal(2);
        });
    });

    describe('xpForNextLevel', () => {
        it('0 xp returns max xp for next level', () => {
            const result = Leveling.xpInfo(0).xpForNextLevel;

            expect(result).to.equal(300);
        });
        
        it('minimum level xp returns max xp for next level', () => {
            const result = Leveling.xpInfo(300).xpForNextLevel;

            expect(result).to.equal(450);
        });        
        
        it('250XP returns 50XP for next level', () => {
            const result = Leveling.xpInfo(250).xpForNextLevel;

            expect(result).to.equal(50);
        });
    });

    describe('levelCompletion', () => {
        it('no level completion, returns 0', () => {
            const result = Leveling.xpInfo(0).levelCompletion;

            expect(result).to.equal(0);
        });

        it('250/300 level completion, returns 0.83333...', () => {
            const result = Leveling.xpInfo(250).levelCompletion;

            expect(result).to.be.approximately(0.833, 0.05);
        });
    });
});
