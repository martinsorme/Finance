import { describe, expect, beforeEach, test} from '@jest/globals';
import { addToArray } from './ProjectDetails';

describe('addToArray', () => {
  let parametersChanged: string[];

  beforeEach(() => {
    // Reset parametersChanged array before each test
    parametersChanged = [];
  });

  test('should add a new value to the array', () => {
    const valueToAdd = 'title';

    // Call the function
    addToArray(valueToAdd, parametersChanged);

    // Assertion: Check if the value has been added to the array
    expect(parametersChanged).toContain(valueToAdd);
  });

  test('should not add an existing value to the array', () => {
    const existingValue = 'title';
    parametersChanged = [existingValue];

    // Call the function
    addToArray(existingValue, parametersChanged);

    // Assertion: Check if the existing value is not duplicated in the array
    expect(parametersChanged).toEqual([existingValue]);
  });
});




