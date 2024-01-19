const sharp = require("sharp");

function compress(input, webp, grayscale, quality, originSize) {
	let format = webp ? "webp" : "jpeg";
	let compressionQuality = quality * 0.05

	quality = Math.ceil(compressionQuality);
	

	return sharp(input)
		.grayscale(grayscale)
		.toFormat(format, {
			quality: quality,
			effort: 1,
			chromaSubsampling: '4:2:0'
		})
		.toBuffer({resolveWithObject: true})
		.then(({data: output,info}) => {	// this way we can also get the info about output image, like height, width
		// .toBuffer()
		// .then( output => {
			return {
				err: null,
				headers: {
					"content-type": `image/${format}`,
					"content-length": info.size,
					"x-original-size": originSize,
					"x-bytes-saved": originSize - info.size,
				},
				output: output
			};
		}).catch(err => {
			return {
				err: err
			};
		});
}

module.exports = compress;
