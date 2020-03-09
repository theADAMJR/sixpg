import { expect } from 'chai';
import { Leveling } from "../../modules/leveling";

describe('Leveling', () => {
    describe('validateXPMsg', () => {
        it('null message member throws exception', () => {
            let msg: any = { member: null };

            const result = () => Leveling.validateXPMsg(msg);  

            expect(result).to.throw;
        });

        it('member with ignored role throws exception', () => {
            let msg: any = { member: { roles: { cache: [ '123' ] }}};

            const result = () => Leveling.validateXPMsg(msg);

            expect(result).to.throw;
        });

        it('member with ignored role throws exception', () => {
            let msg: any = { member: { roles: { cache: [ '123' ] }}};

            const result = () => Leveling.validateXPMsg(msg);

            expect(result).to.throw;
        });
    });

    describe('getLevel', () => {
        it('0 returns level 1', () => {
            const result = Leveling.getXPInfo(0, 0).level;
    
            expect(result).to.deep.equal(1);
        });

        it('floored level returned, min level messages', () => {
            const result = Leveling.getXPInfo(6, 50).level;
    
            expect(result).to.equal(2);
        });

        it('floored level returned, greater than min level messages', () => {
            const result = Leveling.getXPInfo(8, 50).level;
    
            expect(result).to.equal(2);
        });
    });

    describe('xpForNextLevel', () => {
        it('0 xp returns max xp for next level', () => {
            const result = Leveling.getXPInfo(1, 0).xpForNextLevel;

            expect(result).to.equal(300);
        });
        
        it('minimum level xp returns max xp for next level', () => {
            const result = Leveling.getXPInfo(2, 30.xpForNextLevel0);

            expect(result).to.equal(450);
        });
        
        
        it('returns xp for next level', () => {
            const result = Leveling.getXPInfo(1, 25.xpForNextLevel0);

            expect(result).to.equal(50);
        });
    });
});