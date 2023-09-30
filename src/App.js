import { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Songs from "./components/Songs";
import NewSongModal from "./components/NewSongModal";
import { Button } from "rebass";
import { getSongs } from "./features/songs/songSlice";
import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const songs = useSelector((state) => state.song.songs);
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
            }}>
            <ToastContainer autoClose={1300} theme="dark" />
            <Button
                onClick={() => setIsOpen(true)}
                style={{
                    background: "none",
                    backgroundColor: "none",
                    color: "#64ffda",
                    padding: "5px 10px",
                    borderColor: "#64ffda",
                    border: "1px solid",
                    borderRadius: "3px",
                    cursor: "pointer",
                    width: "max-content",
                    alignSelf: "flex-end",
                }}>
                Add a Song
            </Button>
            <NewSongModal
                dispatch={dispatch}
                setIsOpen={setIsOpen}
                modalIsOpen={modalIsOpen}
            />
            <Songs songs={songs} dispatch={dispatch} />
        </div>
    );
}

export default App;
