import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.gambar) {
      return res.status(400).json({ error: 'Gagal menerima gambar' });
    }

    const file = files.gambar;
    const data = fs.readFileSync(file.filepath);
    const base64 = data.toString('base64');
    const url = `data:${file.mimetype};base64,${base64}`;

    res.status(200).json({
      message: 'Gambar diterima di Vercel',
      url: url
    });
  });
};
