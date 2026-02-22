const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/homepage');
const files = fs.readdirSync(imagesDir);

console.log('🖼️  Converting images to WebP...\n');

files.forEach(async (file) => {
  const ext = path.extname(file);
  if (['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(ext, '.webp'));

    try {
      const info = await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }
});

console.log('✨ Conversion complete!');
