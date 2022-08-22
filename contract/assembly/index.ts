import {Candidate, listedCandidates, Voter, listedVoters, getAdmin, setAdmin} from "./model";
import { context} from "near-sdk-as";

export function init(adminId: string) : void {
    if(context.contractName.toString() != context.sender.toString()) {
        throw new Error("You don't have permission");
    }

    let admin = findAdmin();
    if( admin !== null) {
        throw new Error(`Contract already initialized`);
    }

    setAdmin(adminId);
}
/**
 * @dev allow  the admin to add a new candidate to the platform
 * @notice the values of candidate is checked to be valid
 * @notice a check is also enforced to prevent overwrite of an existing candidate
 * @param candidate object of values to initialize a new instance of Candidate
 */
export function setCandidate(candidate: Candidate) : void {
    const admin = findAdmin();
    if(admin == null){
        throw new Error("Contract hasn't been intialized");
    }
    assert(admin == context.sender.toString(), "You don't have permission");
    assert(candidate.age >= 18, "Candidate must be 18 or more years old to vote");
    // on testnet, accountIds ends with ".testnet" which is 8
    assert(candidate.id.length > 8, "Invalid accountId");
    let storedCandidate = getCandidate(candidate.id);
    assert(storedCandidate == null, `a candidate with ${candidate.id} already exists`);
    listedCandidates.set(candidate.id, candidate);
}


export function getCandidate(id: string) : Candidate | null {
    return listedCandidates.get(id);
}

export function getCandidates() : Candidate[] {
    return listedCandidates.values();
}

/**
 * @dev allow registed and approved users to vote for a candidate
 * @notice voters can only vote once
 * @param id of candidate
 */
export function voteCandidate(id: string) : void {
    const voter = getVoter(context.sender);
    if(voter == null) {
        throw new Error("Voter not found");
    }
    assert(voter.voted == false, "Voter has already voted");
    assert(voter.verified == true, "Voter hasn't been approved to vote yet");
    const candidate = getCandidate(id);
    if (candidate == null) {
        throw new Error("Candidate not found");
    }

    candidate.incrementVotes();
    voter.setVote(id);

    listedCandidates.set(candidate.id, candidate);
    listedVoters.set(voter.accountId, voter);
}

/**
 * @dev allow users to register as a Voter
 * @notice checks are enforced to ensure users meet the criteria of being a voter
 * @param newVoter object of values to initialize a new instance of Voter
 */
export function setVoter(newVoter: Voter) : void {
    let storedVoter = getVoter(newVoter.accountId);
    if(storedVoter !== null) {
        throw new Error(`a voter with ${storedVoter.accountId} already exists`);
    }
    assert(newVoter.age >= 18 ,"Voter must be 18 or more years old to vote");
    assert(newVoter.accountId.length > 8, "Invalid accountId");

    listedVoters.set(newVoter.accountId, newVoter);
}

/**
 * @dev allow the admin to approve a voter to vote
 * @param voterId of voter
 */
export function approveVoter(voterId: string) : void {
    const admin = findAdmin();
    assert(admin == context.sender.toString(), "You don't have permission");
    let storedVoter = getVoter(voterId);
    if(storedVoter == null) {
        throw new Error(`Voter does not exist`);
    }
    assert(storedVoter.verified == false, "Voter has already been verified");
    storedVoter.approve();
    listedVoters.set(voterId, storedVoter);
}


export function getVoter(voterId: string) : Voter | null {
    return listedVoters.get(voterId);
}


export function findAdmin() : string | null {
    const admin = getAdmin();
    return admin;
} 


export function getVoters() : Voter[] {
    return listedVoters.values();
}
