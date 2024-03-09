import { describe, expect, jest, test } from '@jest/globals';
import { submitWhatImprove } from './submitWhatImprove';

describe('submitWhatImprove', () => {
    test('returns correct result when both fields are filled', () => {
        const text1 = 'Text for field 1';
        const text2 = 'Text for field 2';
        const result = submitWhatImprove(text1, text2);
        expect(result).toEqual([text1, text2]);
    });

    test('displays alert when text1 is empty', () => {
        const text1 = '';
        const text2 = 'Text for field 2';
        global.alert = jest.fn(); // Mocking the alert function
        submitWhatImprove(text1, text2);
        expect(global.alert).toHaveBeenCalledWith('Du måste fylla i båda fälten');
    });

    test('displays alert when text2 is empty', () => {
        const text1 = 'Text for field 1';
        const text2 = '';
        global.alert = jest.fn(); 
        submitWhatImprove(text1, text2);
        expect(global.alert).toHaveBeenCalledWith('Du måste fylla i båda fälten');
    });

    test('displays alert when both fields are empty', () => {
        const text1 = '';
        const text2 = '';
        global.alert = jest.fn(); 
        submitWhatImprove(text1, text2);
        expect(global.alert).toHaveBeenCalledWith('Du måste fylla i båda fälten');
    });
});
