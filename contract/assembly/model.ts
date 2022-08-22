import { PersistentUnorderedMap, storage } from "near-sdk-as";

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
    votedFor: string;
    verified: boolean
    public static fromPayload(payload: Voter) : Voter {
        const voter = new Voter();
        voter.age = payload.age;
        voter.accountId = payload.accountId;
        return voter;
    }

    public setVote(id: string) : void {
        this.voted = true;
        this.votedFor = id;
    }
    public approve() : void {
        this.verified = true;
    }
}

export const listedCandidates = new PersistentUnorderedMap<string,Candidate>('LISTED_CANDIDATES');

export const listedVoters = new PersistentUnorderedMap<string,Voter>('LISTED_VOTERS');

export function setAdmin(admin: string) : void {
    storage.set<string>("admin", admin);
}

export function getAdmin() : string | null {
    return storage.get<string>("admin");
}