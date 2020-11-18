import AuditLogger from "../../../../src/api/modules/audit-logger";
import { expect } from "chai";

describe('api/modules/audit-logger', () => {
    it('no changes, empty array returned', () => {
        const values = {
            old: { a: 'a', b: 'b' },
            new: { a: 'a', b: 'b' }
        };

        const expected = { old: {}, new: {} };
        const result = AuditLogger.getChanges(values, 'a', '123').changes;

        expect(result).to.deep.equal(expected);
    });
    
    it('1 change, 1 change returned', () => {
        const values = {
            old: { a: 'a', b: 'b' },
            new: { a: 'b', b: 'b' }
        };

        const expected = {
            old: { a: 'a' },
            new: { a: 'b' }
        };
        const result = AuditLogger.getChanges(values, 'a', '123').changes;

        expect(result).to.deep.equal(expected);
    });
    
    it('3 changes, 3 changes returned', () => {
        const values = {
            old: {
                a: 'a',
                b: 'b',
                c: 'c'
            },
            new: {
                a: '1',
                b: '2',
                c: '3'               
            }
        };

        const expected = values;
        const result = AuditLogger.getChanges(values, 'a', '123').changes;

        expect(result).to.deep.equal(expected);
    });
});