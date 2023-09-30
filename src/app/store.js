import { configureStore } from "@reduxjs/toolkit";
import songReducer from "../features/songs/songSlice.js";
import rootSaga from "./sagas.js";
import createSagaMiddleware from "@redux-saga/core";

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        song: songReducer,
    },
    middleware: [saga],
});

saga.run(rootSaga);
