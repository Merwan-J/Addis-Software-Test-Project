import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createSong, deleteSong } from "../features/songs/songSlice";
import FormGroup from "./FormGroup";
import ErrorMessage from "./ErrorMessage";
import { AiFillCloseCircle } from "react-icons/ai";
import CloseButton from "./CloseButton";
import { Button } from "rebass";
import { useSelector } from "react-redux";

const ConfirmModal = ({ dispatch, setIsOpen, modalIsOpen, song }) => {
    const state = useSelector((state) => state.song);

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setIsOpen(false);
                }}
                ariaHideApp={false}
                overlayClassName="overlay"
                style={{
                    content: {
                        color: "#e6f1ff",
                        backgroundColor: "#233554",
                        width: "40%",
                        height: "30%",
                        margin: "auto",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "start",
                        alignItems: "start",
                        padding: "50px",
                        fontFamily: "sans-serif",
                    },
                }}>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                    }}>
                    <AiFillCloseCircle size={30} />
                </CloseButton>
                <h2>Delete the song titled: {song.title} ?</h2>

                <div style={{ display: "flex", gap: "20px" }}>
                    <Button
                        style={{
                            color: "white",
                            padding: "5px 10px",
                            backgroundColor: "red",
                            borderRadius: "2px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            dispatch(deleteSong(song.id));
                            setIsOpen(false);
                        }}>
                        Yes
                    </Button>
                    <Button
                        style={{
                            background: "none",
                            backgroundColor: "none",
                            cursor: "pointer",
                        }}
                        onClick={() => setIsOpen(false)}>
                        No
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmModal;
