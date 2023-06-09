import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { decode } from 'base64-arraybuffer';

// Increase file size limit from default 1mb to 10mb
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};

export default async function handler(req, res) {
	// Uploads image to Supa
	if (req.method === 'POST') {
		let { image } = req.body;

		if (!image) {
			return res.status(500).json({ message: 'No image provided.' });
		}

		try {
			// Validates that uploaded image is encoded in Base64.
			const contentType = image.match(/data:(.*);base64/)?.[1];
			const base64FileData = image.split('base64,')?.[1];

			if (!contentType || !base64FileData) {
				return res
					.status(500)
					.json({ message: 'Image data not valid' });
			}

			// Generates a unique filename for uploaded image.
			const fileName = nanoid();
			const ext = contentType.split('/')[1];
			const path = `${fileName}.${ext}`; // Decode the Base64 data.

			const { data, error: uploadError } = await supabase.storage
				.from(process.env.SUPABASE_BUCKET)
				.upload(path, decode(base64FileData), {
					contentType,
					upsert: true,
				});
			if (uploadError) {
				throw new Error('Unable to upload image to storage');
			}

			// Construct public URL
			const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${path}`;

			return res.status(200).json({ url });
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong.' });
		}
	}

	// Http method not supported
	else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({
			message: `HTTP method ${req.method} is not supported`,
		});
	}
}
