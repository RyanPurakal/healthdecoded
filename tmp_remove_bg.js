const Jimp = require('jimp');

async function removeBg(imgPath) {
    try {
        console.log(`Processing ${imgPath}`);
        const image = await Jimp.read(imgPath);
        
        const bgInt = image.getPixelColor(0, 0);
        const bgRgb = Jimp.intToRGBA(bgInt);
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            
            const rDiff = Math.abs(red - bgRgb.r);
            const gDiff = Math.abs(green - bgRgb.g);
            const bDiff = Math.abs(blue - bgRgb.b);
            const dist = rDiff + gDiff + bDiff;
            
            if (dist < 20) {
                this.bitmap.data[idx + 3] = 0;
            } else if (dist < 90) {
                const alpha = Math.floor(((dist - 20) / 70.0) * 255);
                this.bitmap.data[idx + 3] = alpha;
            }
        });
        
        await image.writeAsync(imgPath);
        console.log(`Success: ${imgPath}`);
    } catch (err) {
        console.error(`Error processing ${imgPath}:`, err);
    }
}

async function run() {
    await removeBg('public/logo192.png');
    await removeBg('public/logo512.png');
}

run();
