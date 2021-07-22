import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { hideModal } from '../actions/modal';
import {
  addTaskFailed,
  addTaskSuccess,
  deleteTaskFailed,
  deleteTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  updateTaskFailed,
  updateTaskSuccess,
} from '../actions/task';
import { hideLoading, showLoading } from './../actions/ui';
import { addTask, getList, deleteTask, updateTask } from './../apis/task';
import { STATUSES, STATUS_CODE } from './../constants';
import * as taskTypes from './../constants/task';

// B1: thuc thi action fetch tasks
// B2: goi api
// B3: kiem tra status code
// neu thanh cong
// neu that bai
// B4: Tat loading
// B5: thuc thi cac cong viec tiep theo
function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK); // fetchlist task dc dispatch thì sẽ chạy bên dưới
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      yield put(fetchListTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(
    fetchListTask({
      q: keyword,
    }),
  );
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.task.taskEditing);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id,
  );
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}

export default rootSaga;
