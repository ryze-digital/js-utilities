import { DeepMerge } from '../../src/DeepMerge.js';

describe('DeepMerge.merge', () => {
    it('performs a deep merge when deep flag is not provided (default deep)', () => {
        const target = { a: 1, nested: { x: 1 }, arr: [1, 2] };
        const source = { b: 2, nested: { y: 2 }, arr: [3] };

        const result = DeepMerge.merge({}, target, source);

        // deep by default
        expect(result).toEqual({ a: 1, b: 2, nested: { x: 1, y: 2 }, arr: [3, 2] });

        // deep: nested references should not be the same as inputs
        expect(result.nested).not.toBe(target.nested);
        expect(result.nested).not.toBe(source.nested);
        expect(result.arr).not.toBe(target.arr);
        expect(result.arr).not.toBe(source.arr);
    });

    it('performs a shallow merge when deep flag is explicitly set to false', () => {
        const target = { a: 1, nested: { x: 1 }, arr: [1, 2] };
        const source = { b: 2, nested: { y: 2 }, arr: [3] };

        const result = DeepMerge.merge(false, {}, target, source);

        // shallow: nested references should be assigned, not deep-merged nor cloned
        expect(result).toEqual({ a: 1, b: 2, nested: { y: 2 }, arr: [3] });
        expect(result.nested).toBe(source.nested);
        expect(result.arr).toBe(source.arr);
    });

    it('deeply merges plain objects when deep flag is true', () => {
        const target = { a: 1, nested: { x: 1, z: 0 } };
        const source = { b: 2, nested: { y: 2 } };

        const result = DeepMerge.merge(true, {}, target, source);

        expect(result).toEqual({ a: 1, b: 2, nested: { x: 1, z: 0, y: 2 } });
        // ensure new object is created (no mutation of inputs)
        expect(result).not.toBe(target);
        expect(result.nested).not.toBe(target.nested);
    });

    it('deeply merges arrays by index, replacing existing indices and pushing overflow', () => {
        const target = [1, { a: 1 }, [1, 2]];
        const source = [2, { b: 2 }, [3], 4];

        const result = DeepMerge.merge([], target, source);

        // index 0 replaced with primitive 2
        // index 1 merged as object {a:1, b:2}
        // index 2 deep-merged by position: [1,2] merged with [3] => [3, 2]
        // index 3 pushed because it exceeds target length
        expect(result).toEqual([2, { a: 1, b: 2 }, [3, 2], 4]);
    });

    it('skips null/undefined sources', () => {
        const result = DeepMerge.merge(true, { a: 1 }, null, undefined, { b: 2 });

        expect(result).toEqual({ a: 1, b: 2 });
    });

    it('ignores unsafe keys to prevent prototype pollution', () => {
        const polluted = {};
        const source = JSON.parse('{"__proto__": {"evil": true}}');

        // Deep or shallow should both ignore unsafe keys
        const resultShallow = DeepMerge.merge(false, {}, polluted, source);
        const resultDeep = DeepMerge.merge({}, polluted, source);

        expect(Object.prototype.evil).toBeUndefined();
        expect(resultShallow.evil).toBeUndefined();
        expect(resultDeep.evil).toBeUndefined();
    });

    it('treats invalid target as plain object by default', () => {
        const result = DeepMerge.merge(null, { a: 1 });

        expect(result).toEqual({ a: 1 });
    });

    it('converts target to array when merging arrays into a non-array target (default deep)', () => {
        const result = DeepMerge.merge({}, [1, 2]);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual([1, 2]);
    });

    it('converts target to object when merging object into an array target (default deep)', () => {
        const result = DeepMerge.merge([], { a: 1 });

        expect(Array.isArray(result)).toBe(false);
        expect(result).toEqual({ a: 1 });
    });
});
