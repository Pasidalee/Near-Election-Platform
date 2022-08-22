import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";

const Candidate = ({ candidate, vote, voterProfile }) => {
	const { id, name, age, votes, image } = candidate;

	const triggerVote = () => {
        vote(id);
	};

	return (
		<Col>
			<Card className=" h-100">
				<Card.Header>
					<Stack direction="horizontal" gap={2}>
						<Badge bg="secondary" className="ms-auto">
							{votes} votes
						</Badge>
					</Stack>
				</Card.Header>
				<div className=" ratio ratio-4x3">
					<img
						src={image}
						alt={name}
						style={{ objectFit: "cover" }}
					/>
				</div>
				<Card.Body className="d-flex  flex-column text-center">
					<Card.Title>{name}</Card.Title>
					<Card.Text className="flex-grow-1 ">{age}</Card.Text>
					<Card.Text className="text-secondary"></Card.Text>
					{voterProfile !== undefined? (
						<Button
							variant="outline-dark"
							onClick={triggerVote}
							className="w-100 py-3"
						>
							Vote
						</Button>
					) : (
						""
					)}
				</Card.Body>
			</Card>
		</Col>
	);
};

Candidate.propTypes = {
	candidate: PropTypes.instanceOf(Object).isRequired,
    voterProfile: PropTypes.instanceOf(Object),
	vote: PropTypes.func.isRequired,
};

export default Candidate;
