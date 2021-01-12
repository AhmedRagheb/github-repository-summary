
export interface Commit {
    sha: string;
    node_id: string;
    commit: CommitMessage;
    url: string;
}

export interface CommitMessage {
    message: string;
    url: string;
}
