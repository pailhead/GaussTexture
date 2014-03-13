var pailhead = pailhead || {};

pailhead.GaussTexture = function(texSize, gaussHeight, gaussDev){
	this.settings = {
		size : texSize || 64,
		height = gaussHeight || 1.0,
		deviation : gaussDev || 0.075125
	}
	return this.createGaussTexture();
}

pailhead.GaussTexture.prototype = {

	createGaussTexture:function(){

		var arraySize = this.settings.size * this.settings.size * 3;
		console.log('gauss() arraySize = ' + arraySize);
		var pixelArray = new Uint8Array(arraySize);
		console.log('gauss() pixelArray = ' + pixelArray);
		var dx, dy, dH;	

		for (var i = 0; i < this.settings.size; i++){
			for (var k = 0; k < this.settings.size; k++){

				dx = 2.0 * k / this.settings.size - 1.0;
				dy = 2.0 * i / this.settings.size - 1.0;
				dH = gaussHeight * Math.exp(-(dx*dx+dy*dy)/gaussDev);
				dH *= 255;

				for (var j = 0; j < 3; j++){
					var index = 3*(i * this.settings.size + k) + j;
					pixelArray[index] = dH;
				}
			}
		}
		return new THREE.DataTexture( pixelArray, this.settings.size, this.settings.size, THREE.RGBFormat );
	}
}
