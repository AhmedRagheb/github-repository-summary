import { AppConfig } from '../Configuration/AppConfig';
import { xhr } from './XhrService';
import { api } from './GithubApiProxy';

jest.mock('../Configuration/ConfigService', () => ({
	config: {
		gitHubUrl: 'https://stub-api.github.com'
	} as AppConfig
}));

describe('GithubApiProxy', () => {
	const xhrFetchSpy = jest.spyOn(xhr, 'fetch');

	describe('getRepoDetails', () => {
		it(`should make a request to GitHub API endpoint and return a result of this request`, async () => {
			const expectedResult = 'expected getRepoDetails';
			xhrFetchSpy.mockResolvedValueOnce(expectedResult);

			const result = await api.getRepoDetails('hello-world', 'test');

			expect(result).toBe(expectedResult);
			expect(xhr.fetch).toHaveBeenCalledTimes(1);
			expect(xhr.fetch).toHaveBeenCalledWith(
				`https://stub-api.github.com/repos/hello-world/test`
			);
		});
	});

	describe('getRepoCommitStats', () => {
		it(`should make a request to GitHub API endpoint and return a result of this request`, async () => {
			const expectedResult = 'expected getRepoCommitStats';
			xhrFetchSpy.mockResolvedValueOnce(expectedResult);

			const result = await api.getRepoCommitStats('hello-world', 'test');

			expect(result).toBe(expectedResult);
			expect(xhr.fetch).toHaveBeenCalledTimes(1);
			expect(xhr.fetch).toHaveBeenCalledWith(
				`https://stub-api.github.com/repos/hello-world/test/stats/commit_activity`
			);
		});
	});

	describe('getRepoCommits', () => {
		it(`should make a request to GitHub API endpoint and return a result of this request`, async () => {
			const expectedResult = 'expected getRepoCommits';
			xhrFetchSpy.mockResolvedValueOnce(expectedResult);

			const result = await api.getRepoCommits('hello-world', 'test', 3);

			expect(result).toBe(expectedResult);
			expect(xhr.fetch).toHaveBeenCalledTimes(1);
			expect(xhr.fetch).toHaveBeenCalledWith(
				`https://stub-api.github.com/repos/hello-world/test/commits?per_page=3`
			);
		});
	});

	afterEach(() => xhrFetchSpy.mockReset());
});
