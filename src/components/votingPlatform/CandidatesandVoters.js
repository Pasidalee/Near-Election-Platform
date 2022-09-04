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
        setLoading(true);
        try {
          
            setCandidates(await getCandidateList());
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addCandidate = async (data) => {
        setLoading(true);
        try {
            console.log(data);
            await createCandidate(data).then((resp) => {
                toast(<NotificationSuccess text="Candidate added successfully." />);
                getCandidates();
            });
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to create a candidate." />);
        } finally {
            setLoading(false);
        }
    };

    const addVoter = async (data) => {
        setLoading(true);
        try {
            console.log(data);
           
            await registerVoter(data).then((resp) => {
                toast(<NotificationSuccess text="Voter registered successfully." />);
            
            });
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text={JSON.parse(error.message).kind.ExecutionError.split('Smart contract panicked:')[1].split(',')[0]} />);
        } finally {
            setLoading(false);
        }
    };

    const vote = async (id) => {
        setLoading(true);
        try {
            console.log(id);
            await voteCandidate({
                id
            }).then((resp) => getCandidates());
            toast(<NotificationSuccess text="voted the candidate successfully" />);
        } catch (error) {
            toast(<NotificationError text={JSON.parse(error.message).kind.ExecutionError.split('Smart contract panicked:')[1].split(',')[0]} />);
            console.log(JSON.parse(error.message).kind.ExecutionError.split('Smart contract panicked:')[1].split(',')[0]);
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



