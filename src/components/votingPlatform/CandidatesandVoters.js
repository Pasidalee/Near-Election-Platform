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
	registerVoter,
	getVoter,
	getAdmin,
} from "../../utils/votingPlatform";
import Candidate from "./Candidate";
import AddVoter from "./AddVoter";

const CandidatesandVoters = ({ accountId }) => {
	const [candidates, setCandidates] = useState([]);
	const [loading, setLoading] = useState(false);
	const [voterProfile, setVoterProfile] = useState();
	const [admin, setAdmin] = useState("");

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

	const getVoterProfile = useCallback(async () => {
		try {
			setLoading(true);
			setVoterProfile(await getVoter(accountId));
			console.log(voterProfile);
		} catch (error) {
			console.log({ error });
		} finally {
			setLoading(false);
		}
	});

	const findAdmin = useCallback(async () => {
		try {
			setLoading(true);
			const admin = await getAdmin();
			console.log(admin);
			setAdmin(admin);
		} catch (error) {
			console.log({ error });
		} finally {
			setLoading(false);
		}
	});

	const addCandidate = async (data) => {
		try {
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
			setLoading(true);
			registerVoter(data).then((resp) => {});
			toast(
				<NotificationSuccess text="Voter registered successfully." />
			);
		} catch (error) {
			console.log({ error });
			toast(<NotificationError text="Failed to register the voter." />);
		} finally {
			setLoading(false);
		}
	};

	const vote = async (id) => {
		try {
			if (!voterProfile.voted) {
				await voteCandidate({
					id,
				}).then((resp) => getCandidates());
				toast(
					<NotificationSuccess text="voted the candidate successfully" />
				);
			} else {
				toast(<NotificationError text="You have already voted" />);
			}
		} catch (error) {
			toast(<NotificationError text="Failed to vote the candidate." />);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCandidates();
		getVoterProfile();
		findAdmin();
	}, []);

	return (
		<>
			{!loading ? (
				<>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1 className="fs-4 fw-bold mb-0">
							Election Candidates
						</h1>

						{admin === accountId ? (
							<div>
								<AddVoter save={addVoter} />
								<AddCandidate save={addCandidate} />
							</div>
						) : (
							""
						)}
					</div>
					<Row
						xs={1}
						sm={2}
						lg={3}
						className="g-3  mb-5 g-xl-4 g-xxl-5"
					>
						{candidates.map((_candidate) => (
							<Candidate
								key={_candidate.id}
								candidate={{
									..._candidate,
								}}
								vote={vote}
								voterProfile={voterProfile}
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
