import { ContactFormData } from '@/app/utils/email';
import { mailOptions, transporter } from './nodemailerFunctions';

export async function POST(req: Request) {
	const body: ContactFormData = await req.json();
	if (!body.email || !body.name || !body.message) {
		return new Response('Bad request.', { status: 400 });
	}

	const emailBody: string = `Name: ${body.name}\n\nEmail: ${body.email}\n\nMessage: ${body.message}`;

	try {
		await transporter.sendMail({
			...mailOptions,
			subject: 'Contact Form Submission',
			text: emailBody,
		});
	} catch (e) {
		return new Response(e.message, { status: 400 });
	}
	return new Response('OK', { status: 200 });
}
