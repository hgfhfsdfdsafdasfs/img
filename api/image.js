import sharp from "sharp";

export default async function handler(req, res) {
    const image = await sharp("public/image.png")
        .resize(200) // optional scaling
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });

    const { data, info } = image;
    const { width, height } = info;

    const pixels = [];

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            row.push([r, g, b, a]);
        }
        pixels.push(row);
    }

    res.json({ width, height, pixels });
}
