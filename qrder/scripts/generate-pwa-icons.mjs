import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const sizes = [192, 512];
const brandColor = "#fd6500";
const backgroundColor = "#1a1a1a";
const outputDir = join(process.cwd(), "public", "icons");

await mkdir(outputDir, { recursive: true });

for (const size of sizes) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size * 0.18}" />
      <text
        x="50%"
        y="54%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-weight="700"
        font-size="${size * 0.42}"
        fill="${brandColor}"
      >
        Q
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(outputDir, `icon-${size}.png`));
}

console.log("PWA icons generated in public/icons/");
