import { assert } from 'chai';

import {
  SetCurrentStargazerSuccessAction,
} from '@/infrastructure/redux/Stargazer/actions/SetCurrentStargazerAction';
import { StargazerReducer } from '@/infrastructure/redux/Stargazer/Reducer';

describe('StargazerReducer', () => {
  test('SET_CURRENT_STARGAZER updates reducer', () => {
    const username = 'jasonraimondi';
    const action = SetCurrentStargazerSuccessAction(username);

    const actual = StargazerReducer(null, action);

    assert.strictEqual(actual.currentUserLogin, username);
  });
});
