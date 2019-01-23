import { store } from '@/renderer';
import { call, put, takeEvery } from 'redux-saga/effects';

import container from '@/infrastructure/container/InversifyContainer';
import TYPES from '@/infrastructure/container/Types';
import {
  SET_GITHUB_ACCESS_TOKEN, SetGithubAccessTokenFailureAction,
  SetGithubAccessTokenSuccessAction,
} from '@/infrastructure/redux/Settings/actions/SetGithubAccessTokenAction';
import { GithubService } from '@/infrastructure/services/github/GithubService';

export function* setGithubAccessTokenSaga() {
  yield takeEvery(SET_GITHUB_ACCESS_TOKEN, setGithubAccessToken);
}

async function validateAccessToken(accessToken: string) {
  const githubService = container.get<GithubService>(TYPES.GithubService);
  githubService.accessToken = accessToken;
  return await githubService.validateAccessToken(accessToken);
}

function* setGithubAccessToken(action) {
  try {
    const isValid = yield call(validateAccessToken, action.payload);
    if (isValid) {
      yield put(SetGithubAccessTokenSuccessAction(action.payload));
    } else {
      yield fail();
    }
  } catch (error) {
    yield fail();
  }
}

function* fail() {
  yield put(SetGithubAccessTokenFailureAction('Invalid Access Token'));
}
