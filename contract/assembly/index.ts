import {Candidate, listedCandidates, Voter, listedVoters, getAdmin, setAdmin} from "./model";
import { ContractPromiseBatch, context, logging} from "near-sdk-as";

export function init(adminId: string) : void {
    if(context.contractName.toString() != context.sender.toString()) {
        throw new Error("You don't have permission");
    }

    let admin = getAdmin();
    if( admin !== null) {
        throw new Error(`Contract already initialized`);
    }

    setAdmin(adminId);
}

export function setCandidate(candidate: Candidate) : void {
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

export function getCandidate(id: string) : Candidate | null {
    return listedCandidates.get(id);
}

export function getCandidates() : Candidate[] {
    return listedCandidates.values();
}

export function voteCandidate(id: string) : void {
    const candidate = listedCandidates.get(id);
    if (candidate == null) {
        throw new Error("Candidate not found");
    }

    const voter = listedVoters.get(context.sender);
    logging.log(listedVoters.keys());
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

export function setVoter(newVoter: Voter) : void {
    const admin = getAdmin();
    if(admin != context.sender.toString()) {
        throw new Error("You don't have permission");
    }
    let storedVoter = listedVoters.get(newVoter.accountId);
    if(storedVoter !== null) {
        throw new Error(`a voter with ${storedVoter.accountId} already exists`);
    }

    listedVoters.set(newVoter.accountId, newVoter);
}

//
// export function getVoter(id: string) : Voter | null {
//     return listedVoters.get(id);
// }
//

export function getVoters() : Voter[] {
    return listedVoters.values();
}
