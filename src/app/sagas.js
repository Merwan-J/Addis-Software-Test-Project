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

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://addis-software-test-project-backend.onrender.com"
        : "http://localhost:7000/api";

function* getSongsSaga() {
    try {
        const data = yield call(fetchApiData, BASE_URL + "/songs");
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
        const data = yield call(fetchApiData, BASE_URL + "/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(action.payload),
        });
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
        yield call(fetchApiData, `${BASE_URL}/songs/${action.payload}`, {
            method: "DELETE",
        });
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
            `${BASE_URL}/songs/${action.payload.id}`,
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
