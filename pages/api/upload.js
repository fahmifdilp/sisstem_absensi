import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const filePath = path.join(process.cwd(), 'public', 'latest.jpg');
    fs.writeFileSync(filePath, buffer);
    res.status(200).json({ message: 'Gambar diterima', size: buffer.length });
  });
}
