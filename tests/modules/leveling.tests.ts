import { expect } from 'chai';
import { mock } from 'ts-mockito';
import Leveling from "../../modules/leveling";
import { GuildDocument } from '../../models/guild';

describe('Leveling', () => {
    describe('validateXPMsg', () => {
        it('null message member throws exception', () => {
            const guild = mock<GuildDocument>();
            let msg: any = { member: null };

            const result = () => Leveling.validateXPMsg(msg, guild);  

            expect(result).to.throw();
        });

        it('member with ignored role throws exception', () => {
            const guild = mock<GuildDocument>();
            let msg: any = { member: { roles: { cache: [{ id: '123' }] }}};
            guild.xp.ignoredRoles = ['123'];

            const result = () => Leveling.validateXPMsg(msg, guild);

            expect(result).to.throw();
        });
    });

    describe('getLevel', () => {
        it('0 returns level 1', () => {
            const result = Leveling.xpInfo(0, 0).level;
    
            expect(result).to.deep.equal(1);
        });

        it('floored level returned, min level messages', () => {
            const result = Leveling.xpInfo(6, 50).level;
    
            expect(result).to.equal(2);
        });

        it('floored level returned, greater than min level messages', () => {
            const result = Leveling.xpInfo(8, 50).level;
    
            expect(result).to.equal(2);
        });
    });

    describe('xpForNextLevel', () => {
        it('0 xp returns max xp for next level', () => {
            const result = Leveling.xpInfo(1, 0).xpForNextLevel;

            expect(result).to.equal(300);
        });
        
        it('minimum level xp returns max xp for next level', () => {
            const result = Leveling.xpInfo(2, 300).xpForNextLevel;

            expect(result).to.equal(450);
        });
        
        
        it('returns xp for next level', () => {
            const result = Leveling.xpInfo(1, 250).xpForNextLevel;

            expect(result).to.equal(50);
        });
    });
});