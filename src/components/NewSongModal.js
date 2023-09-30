import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createSong } from "../features/songs/songSlice";
import FormGroup from "./FormGroup";
import ErrorMessage from "./ErrorMessage";
import { AiFillCloseCircle } from "react-icons/ai";
import CloseButton from "./CloseButton";
import { Button } from "rebass";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const NewSongModal = ({ dispatch, setIsOpen, modalIsOpen }) => {
    const state = useSelector((state) => state.song);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        dispatch(createSong(data));
        reset();
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    reset();
                    setIsOpen(false);
                }}
                ariaHideApp={false}
                overlayClassName="overlay"
                style={{
                    content: {
                        color: "#e6f1ff",
                        backgroundColor: "#233554",
                        width: "40%",
                        height: "50%",
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
                        reset();
                        setIsOpen(false);
                    }}>
                    <AiFillCloseCircle size={30} />
                </CloseButton>
                <h2>Add a song</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <label htmlFor="artist">Artist Name:</label>
                        <input
                            {...register("artist", {
                                required: true,
                                maxLength: 20,
                            })}
                        />
                    </FormGroup>
                    <ErrorMessage>
                        {errors.artist?.type === "required" && (
                            <p role="alert">Artist is required</p>
                        )}
                    </ErrorMessage>
                    <FormGroup>
                        <label htmlFor="title">Song Title:</label>
                        <input
                            {...register("title", {
                                required: true,
                                maxLength: 40,
                            })}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                    </FormGroup>
                    <ErrorMessage>
                        {errors.title?.type === "required" && (
                            <p role="alert">Title is required</p>
                        )}
                    </ErrorMessage>

                    <FormGroup>
                        <label htmlFor="artwork">Image Url</label>
                        <input
                            {...register("artwork", {
                                required: true,
                            })}
                        />
                    </FormGroup>
                    <ErrorMessage>
                        {errors.artwork?.type === "required" && (
                            <p role="alert">Image url is required</p>
                        )}
                    </ErrorMessage>

                    <Button
                        style={{
                            color: "white",
                            padding: "5px 10px",
                            backgroundColor: "#8892b0",
                            borderRadius: "2px",
                            cursor: "pointer",
                        }}>
                        Submit
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default NewSongModal;
