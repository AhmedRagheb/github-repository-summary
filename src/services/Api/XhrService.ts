const statusCode = {
	ok: 200
};

const successStatusCodes = [statusCode.ok];

export class ApiError implements Error {
	name = 'Api Error';
	message = '';
	canRetry = true;
}

class XhrService {
	async fetch<T>(url: string, settings: RequestInit = { method: 'GET' }): Promise<T> {
		if (!settings.headers) {
			settings.headers = new Headers([
				['content-type', 'application/json']
			]);
		}

		const result = await fetch(url, settings);

		if (successStatusCodes.includes(result.status)) {
			return result.json().catch(() => null);
		}

		throw new ApiError();
	}
}

export const xhr = new XhrService();
