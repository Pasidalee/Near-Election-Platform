import { v4 as uuid4 } from "uuid";
const GAS = 100000000000000;

export function createCandidate(candidate) {
	candidate.id = uuid4();
	candidate.age = Number(candidate.age);
	return window.contract.setCandidate({ candidate });
}

export function getCandidates() {
	return window.contract.getCandidates();
}

export async function voteCandidate(id) {
	await window.contract.voteCandidate({voterId: id}, GAS);
}
export async function approveVoter(id) {
	await window.contract.approveVoter({voterId: id}, GAS);
}

export async function registerVoter(newVoter) {
	newVoter.age = Number(newVoter.age);
	return window.contract.setVoter({ newVoter });
}

export function getVoters() {
    return window.contract.getVoters();
}

export function getVoter(id) {
	return window.contract.getVoter({ voterId: id });
}

export function getAdmin() {
	return window.contract.findAdmin();
}
