import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddCandidate = ({ save }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [age, setAge] = useState(null);
    const isFormFilled = () => name && image && age >= 18;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                onClick={handleShow}
                variant="dark"
                className="rounded-pill px-3 ms-2"
            >
                Add new candidate
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Candidate</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputName"
                            label="Candidate name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Enter name of the candidate"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputUrl"
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputAge"
                            label="Age"
                            className="mb-3"
                        >
                            <Form.Control
                                type="number"
                                placeholder="Age"
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }}
                            />
                        </FloatingLabel>


                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
                        disabled={!isFormFilled()}
                        onClick={() => {
                            save({
                                name,
                                image,
                                age
                            });
                            handleClose();
                        }}
                    >
                        Save Candidate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

AddCandidate.propTypes = {
    save: PropTypes.func.isRequired,
};

export default AddCandidate;