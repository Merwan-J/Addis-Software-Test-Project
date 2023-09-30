import { takeEvery, call, put, all } from "redux-saga/effects";
import {
    songFailure,
    getSongSuccess,
    deleteSongSuccess,
    updateSongSuccess,
    createSongSuccess,
} from "../features/songs/songSlice";

async function fetchApiData(url, headers) {
    const response = await fetch(url, headers);
    const data = await response.json();

    return data;
}

function* getSongsSaga() {
    try {
        const data = yield call(fetchApiData, "http://localhost:5000/songs");
        yield put(getSongSuccess(data));
    } catch (error) {
        yield put(songFailure(error));
    }
}

function* watchGetSongsSaga() {
    yield takeEvery("songs/getSongs", getSongsSaga);
}

function* createSongSaga(action) {
    try {
        const data = yield call(fetchApiData, "http://localhost:5000/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(action.payload),
        });
        console.log(data);
        yield put(createSongSuccess(data));
    } catch (error) {
        yield put(songFailure(error));
    }
}
function* watchCreateSongSaga() {
    yield takeEvery("songs/createSong", createSongSaga);
}

function* deleteSongSaga(action) {
    try {
        console.log("in the saga");
        yield call(
            fetchApiData,
            `http://localhost:5000/songs/${action.payload}`,
            {
                method: "DELETE",
            }
        );
        yield put(deleteSongSuccess(action.payload));
    } catch (error) {
        yield put(songFailure(error));
    }
}
function* watchDeleteSongSaga() {
    yield takeEvery("songs/deleteSong", deleteSongSaga);
}

function* updateSongSaga(action) {
    try {
        const data = yield call(
            fetchApiData,
            `http://localhost:5000/songs/${action.payload.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action.payload),
            }
        );
        yield put(updateSongSuccess(data));
    } catch (error) {
        yield put(songFailure(error));
    }
}
function* watchUpdateSongSaga() {
    yield takeEvery("songs/updateSong", updateSongSaga);
}

export default function* rootSaga() {
    yield all([
        watchGetSongsSaga(),
        watchCreateSongSaga(),
        watchDeleteSongSaga(),
        watchUpdateSongSaga(),
    ]);
}
