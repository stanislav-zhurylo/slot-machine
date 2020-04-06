import {expect} from 'chai'
import {describe, it} from 'mocha'
import {BAR, BARx2, CHERRY, ICON7} from '../../src/constants/Icons'
import {validateCombinationHasSymbols, validateCombinationX3} from '../../src/validator/validateCombinations'

describe('validateCombinations.ts', () => {
    it('should apply some win amount when X3 combination', () => {
        const validationResult = validateCombinationX3([ICON7.code, ICON7.code, ICON7.code], ICON7.code);
        expect(validationResult).to.be.equal(true);
    });

    it('should not apply some win amount when X3 combination', () => {
        const validationResult = validateCombinationX3([ICON7.code, BAR.code, ICON7.code], ICON7.code);
        expect(validationResult).to.be.equal(false);
    });

    it('should apply some win amount when has all symbols specified', () => {
        const validationResult = validateCombinationHasSymbols(
            [ICON7.code, BAR.code, BARx2.code],
            [ICON7.code, BAR.code]
        );
        expect(validationResult).to.be.equal(true);
    });

    it('should not apply some win amount when has not all symbols specified', () => {
        const validationResult = validateCombinationHasSymbols(
            [ICON7.code, BAR.code, BARx2.code],
            [ICON7.code, CHERRY.code]
        );
        expect(validationResult).to.be.equal(false);
    });
});