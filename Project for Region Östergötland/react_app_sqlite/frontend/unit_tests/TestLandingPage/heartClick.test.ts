import { describe, expect, jest, test } from '@jest/globals';
import { submitFeedback } from './handleHeartClick';

describe('submitFeedback', () => {
    test('displays alert for heartClicked equals 0', () => {
        const heartClicked = 0;
        const comment = 'Valid comment';
        global.alert = jest.fn(); 
        submitFeedback(heartClicked, comment);
        expect(global.alert).toHaveBeenCalledWith('Klicka i antal hjärtan');
    });

    test('displays alert for empty comment', () => {
        const heartClicked = 3; // Example heartClicked value (1-5)
        const comment = '';
        global.alert = jest.fn(); 
        submitFeedback(heartClicked, comment);
        expect(global.alert).toHaveBeenCalledWith('Du måste skriva en kommentar');
    });

    test('does not display alert for valid input', () => {
        const heartClicked = 4; // Example heartClicked value (1-5)
        const comment = 'Valid comment';
        global.alert = jest.fn(); 
        submitFeedback(heartClicked, comment);
        expect(global.alert).not.toHaveBeenCalled();
    });
});
