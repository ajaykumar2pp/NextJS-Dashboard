import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const uploadDir = path.join(process.cwd(), '/public/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      return `${Date.now()}-${part.originalFilename}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(request, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: 'Upload error' }, { status: 500 })
        );
      }

      const { name, email } = fields;
      const image = files.image[0];
      const imagePath = '/uploads/' + path.basename(image.filepath);

      // TODO: Save to MongoDB if needed here

      return resolve(
        NextResponse.json({ name: name[0], email: email[0], image: imagePath })
      );
    });
  });
}



import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  const data = await req.formData();

  const name = data.get('name');
  const email = data.get('email');
  const imageFile = data.get('image');

  if (!imageFile || typeof imageFile === 'string') {
    return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'your-app-users' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    await connectDB();

    const user = await User.create({
      name,
      email,
      image: result.secure_url,
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
