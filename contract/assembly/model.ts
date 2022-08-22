import { PersistentUnorderedMap, u128, context, storage, PersistentSet } from "near-sdk-as";

// @ts-ignore
@nearBindgen
export class Candidate {
    id: string;
    name: string;
    age: u32;
    image: string;
    votes: u32;

    public static fromPayload(payload: Candidate) : Candidate {
        const candidate = new Candidate();
        candidate.id = payload.id;
        candidate.name = payload.name;
        candidate.age = payload.age;
        candidate.image = payload.image;
        candidate.votes = 0;
        return candidate;
    }

    public incrementVotes() : void {
        this.votes += 1;
    }
}

// @ts-ignore
@nearBindgen
export class Voter {
    accountId: string;
    age: u32;
    voted: boolean;

    public static fromPayload(payload: Voter) : Voter {
        const voter = new Voter();
        voter.age = payload.age;
        voter.accountId = payload.accountId;
        voter.voted = false;
        return voter;
    }

    public setVote() : void {
        this.voted = true;
    }
}

export const listedCandidates = new PersistentUnorderedMap<string,Candidate>('LISTED_CANDIDATES');

export const listedVoters = new PersistentUnorderedMap<string,Voter>('LISTED_VOTERS');

export const listedOperators = new PersistentSet<string>('LISTED_OPERATORS');

export function setAdmin(admin: string) : void {
    storage.set<string>("admin", admin);
}

export function getAdmin() : string | null {
    return storage.get<string>("admin");
}