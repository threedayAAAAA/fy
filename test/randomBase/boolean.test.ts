import { describe, it, expect } from 'vitest';
import { boolean } from '../../src/randomBase/boolean';

describe('boolean', () => {
    it('should generate a random boolean', () => {
        const result = boolean();
        expect(typeof result).toBe('boolean');
    });
})
