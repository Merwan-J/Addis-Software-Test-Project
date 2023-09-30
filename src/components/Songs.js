import React from "react";
import Song from "./song";

const Songs = ({ songs, dispatch }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 15,
                width: "70%",
                margin: "10px auto",
            }}>
            {songs.length !== 0 &&
                songs.map((song) => {
                    return (
                        <Song song={song} dispatch={dispatch} key={song.id} />
                    );
                })}
        </div>
    );
};

export default Songs;
