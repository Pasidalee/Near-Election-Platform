import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddCandidate from "./AddCandidate";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
    getCandidates as getCandidateList,
    voteCandidate,
    createCandidate,
    registerVoter
} from "../../utils/votingPlatform";
import Candidate from "./Candidate";
import AddVoter from "./AddVoter";

const CandidatesandVoters = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCandidates = useCallback(async () => {
        try {
            setLoading(true);
            setCandidates(await getCandidateList());
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addCandidate = async (data) => {
        try {
            console.log(data);
            setLoading(true);
            createCandidate(data).then((resp) => {
                getCandidates();
            });
            toast(<NotificationSuccess text="Candidate added successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to create a candidate." />);
        } finally {
            setLoading(false);
        }
    };

    const addVoter = async (data) => {
        try {
            console.log(data);
            setLoading(true);
            registerVoter(data).then((resp) => {

            });
            toast(<NotificationSuccess text="Voter registered successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to register the voter." />);
        } finally {
            setLoading(false);
        }
    };

    const vote = async (id) => {
        try {
            console.log(id);
            await voteCandidate({
                id
            }).then((resp) => getCandidates());
            toast(<NotificationSuccess text="voted the candidate successfully" />);
        } catch (error) {
            toast(<NotificationError text="Failed to vote the candidate." />);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCandidates();

    }, []);

    console.log(candidates);

    return (
        <>
            {!loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fs-4 fw-bold mb-0">Election Candidates</h1>
                        <div>
                            <AddVoter save={addVoter} />
                            <AddCandidate save={addCandidate} />
                        </div>
                    </div>
                    <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                        {candidates.map((_candidate) => (
                            <Candidate
                                candidate={{
                                    ..._candidate,
                                }}
                                vote={vote}
                            />
                        ))}
                    </Row>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default CandidatesandVoters;



