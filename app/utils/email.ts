export async function sendEmail(name: string, email: string, message: string) {
	const apiEndpoint = '/api/email';

	fetch(apiEndpoint, {
		method: 'POST',
		body: JSON.stringify({ name: name, email: email, message: message }),
	})
		.then((res) => res.json())
		.then((response) => {
			alert(response.message);
		})
		.catch((err) => {
			alert(err);
		});
}

export type ContactFormData = {
	name: string;
	email: string;
	message: string;
};

export const sendContactForm = async (data: ContactFormData): Promise<number> => {
	const res: Response = await fetch('/api/email', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return res.status;
};
