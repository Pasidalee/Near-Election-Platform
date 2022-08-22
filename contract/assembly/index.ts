import {Candidate, listedCandidates, Voter, listedVoters, getAdmin, setAdmin} from "./model";
import { ContractPromiseBatch, context, logging} from "near-sdk-as";


/**
 * Used to initialize the voting contract
 * @param adminId Admin accountId of the voting platform
 */
export function init(adminId: string) : void {
    if(context.contractName.toString() != context.sender.toString()) {
        throw new Error("You don't have permission");
    }

    if(getInitializeStatus()) {
        throw new Error(`Contract already initialized`);
    }

    setAdmin(adminId);
}

/**
 * Used to add a candidate to the vote
 * @param candidate Details of the adding candidate
 */
export function setCandidate(candidate: Candidate) : void {
    if(!getInitializeStatus()) {
        throw new Error(`Contract is not initialized yet`);
    }

    const admin = getAdmin();
    if(admin != context.sender.toString()) {
        throw new Error("You don't have permission");
    }
    let storedCandidate = listedCandidates.get(candidate.id);
    if( storedCandidate != null) {
        throw new Error(`a candidate with ${candidate.id} already exists`);
    }
    listedCandidates.set(candidate.id, candidate);
}

/**
 * Used to get the candidate details for the given id
 * @param id ID of the candidate
 * @return Candidate details if it is present. Otherwise, null.
 */
export function getCandidate(id: string) : Candidate | null {
    return listedCandidates.get(id);
}

/**
 * Used to get the details of the registered candidates
 * @return Array of candidate objects
 */
export function getCandidates() : Candidate[] {
    return listedCandidates.values();
}

/**
 * Used to vote for candidate with the given ID.
 * @param id ID of the candidate that user would like to vote
 */
export function voteCandidate(id: string) : void {

    if(!getInitializeStatus()) {
        throw new Error(`Contract is not initialized yet`);
    }

    const candidate = listedCandidates.get(id);
    if (candidate == null) {
        throw new Error("Candidate not found");
    }

    const voter = listedVoters.get(context.sender);

    if(voter == null) {
        throw new Error("Voter not found");
    }

    if(voter.age < 18) {
        throw new Error("Voter must be 18 or more years old to vote");
    }

    if(voter.voted == true) {
        throw new Error("Voter has already voted");
    }


    candidate.incrementVotes();
    listedCandidates.set(candidate.id, candidate);

    voter.setVote();
    listedVoters.set(voter.accountId, voter);
}

/**
 * Used to add a votes to the vote
 * @param newVoter Details of the adding voter
 */
export function setVoter(newVoter: Voter) : void {

    if(!getInitializeStatus()) {
        throw new Error(`Contract is not initialized yet`);
    }

    const admin = getAdmin();
    if(admin != context.sender.toString()) {
        throw new Error("You don't have permission");
    }

    let storedVoter = listedVoters.get(newVoter.accountId);
    if(storedVoter != null) {
        throw new Error(`a voter with ${storedVoter.accountId} already exists`);
    }

    listedVoters.set(newVoter.accountId, newVoter);
}

//
// export function getVoter(id: string) : Voter | null {
//     return listedVoters.get(id);
// }
//

/**
 * Used to get the details of the registered voters
 * @return Array of voters
 */
export function getVoters() : Voter[] {
    return listedVoters.values();
}

/**
 * Used to get the Initialisation status of the voting platform
 * @return Initialisation status
 */
export function getInitializeStatus() : boolean {
    let admin = getAdmin();
    return admin != null;
}

/**
 * Used to get the vote status of the logged-in user
 * @return Vote status
 */
export function getVoteStatus() : boolean {
    let voter = listedVoters.get(context.sender);

    if(voter == null) {
        throw new Error("Voter not found");
    }

    return voter.voted;
}