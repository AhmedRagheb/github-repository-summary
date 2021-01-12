describe('ConfigService', () => {
	it('returns github url', () => {
		const config = require('./ConfigService').config;
		expect(config.gitHubUrl).toBe('https://api.github.com');
	});
});

export {}