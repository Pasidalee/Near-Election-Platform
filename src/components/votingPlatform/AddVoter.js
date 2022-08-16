import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddVoter = ({ save }) => {
    const [accountId, setAccountId] = useState("");
    const [age, setAge] = useState(null);
    const [voted, setVoted] = useState(false);
    const isFormFilled = () => accountId && age;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                onClick={handleShow}
                variant="dark"
                className="rounded-pill px-2"
            >
                Register voter
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Candidate</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputAccountId"
                            label="Account Id"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setAccountId(e.target.value);
                                }}
                                placeholder="Enter AccountId"
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
                                accountId,
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

AddVoter.propTypes = {
    save: PropTypes.func.isRequired,
};

export default AddVoter;