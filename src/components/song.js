import React from "react";
import { deleteSong, updateSong } from "../features/songs/songSlice";
import { useSelector } from "react-redux";

import Modal from "react-modal";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
    MdOutlineDeleteOutline,
    MdOutlineModeEditOutline,
} from "react-icons/md";
import UpdateSongModal from "./UpdateSongModal";
import ConfirmModal from "./ConfirmModal";

function Song({ song, dispatch }) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = React.useState(false);

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: flex-start;
        padding: 10px;
        background-color: #233554;
        max-width: 200px;
        height: 300px;
        margin-bottom: 10px;
        border-radius: 7px;
        color: #e6f1ff;
        gap: 7px;
        font-family: "Roboto", sans-serif;
        :hover {
            transform: scale(1.04);
            color: #64ffda;
            background-color: #162c54;
            transition: all 0.2s ease-in-out;
        }
    `;

    const Text = styled.div`
        font-size: 20px;
    `;

    return (
        <Container key={song.id}>
            <img
                src={song.artwork}
                alt={song.title}
                width={200}
                height={200}
                style={{ display: "block" }}
            />

            <Text>{song.title}</Text>
            <Text>{song.artist}</Text>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "60px",
                    alignSelf: "end",
                }}>
                <MdOutlineModeEditOutline
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsOpen(true)}
                />
                <MdOutlineDeleteOutline
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => setConfirmModalIsOpen(true)}
                />
            </div>
            <ConfirmModal
                modalIsOpen={confirmModalIsOpen}
                song={song}
                setIsOpen={setConfirmModalIsOpen}
                dispatch={dispatch}
            />
            <UpdateSongModal
                modalIsOpen={modalIsOpen}
                song={song}
                setIsOpen={setIsOpen}
                dispatch={dispatch}
            />
        </Container>
    );
}

export default Song;
