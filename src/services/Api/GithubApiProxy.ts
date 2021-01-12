import { xhr } from './XhrService';
import { config } from '../Configuration/ConfigService';
import { RepoDetails } from '../Models/RepoDetails';
import { CommitActivity } from '../Models/CommitActivity';
import { Commit } from '../Models/Commit';

class GithubApiProxy {
    getRepoDetails(repo: string, owner: string) {
        return xhr.fetch<RepoDetails>(`${config.gitHubUrl}/repos/${repo}/${owner}`);
    }

    getRepoCommitStats(repo: string, owner: string) {
        return xhr.fetch<CommitActivity[]>(`${config.gitHubUrl}/repos/${repo}/${owner}/stats/commit_activity`);
    }

    getRepoCommits(repo: string, owner: string, take: number) {
        return xhr.fetch<Commit[]>(`${config.gitHubUrl}/repos/${repo}/${owner}/commits?per_page=${take}`);
    }
}

export const api = new GithubApiProxy();
export type apiMethods = keyof GithubApiProxy;