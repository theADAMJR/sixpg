import Commands from '../../../src/data/commands';
import { expect } from 'chai';

describe('data/commands', () => {
    it('getCommandUsage returns valid command usage with no args', () => {
        const result = new Commands().getCommandUsage({
            name: 'ping',
            execute: (ctx: any) => {}
        } as any);        
        
        expect(result).to.equal('ping');
    });

    it('getCommandUsage returns valid command with args', () => {
        const result = new Commands().getCommandUsage({
            name: 'a',
            execute: (ctx: any, b: any) => {}
        } as any);        
        
        expect(result).to.equal('a b');
    });
});