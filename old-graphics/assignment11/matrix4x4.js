/* 
Iris Yuan
Matrix class for animation
Create and multiply matrices for rotation, translation and transformation by point 
*/

function Matrix4x4 (array) {
	this.matrix = array;
	if (typeof array === 'undefined') {
		this.rows = 0;
		this.cols = 0;
	} else {
		this.rows = array.length;
		this.cols = array[0].length;
	}
}

Matrix4x4.prototype.identity = function() {
	this.matrix = [ [1, 0, 0, 0], 
					[0, 1, 0, 0],
				  	[0, 0, 1, 0],
				 	[0, 0, 0, 1] ];
	this.rows = 4;
	this.cols = 4;
}

Matrix4x4.prototype.rotateX = function(angle) {
	var rotatedX = new Matrix4x4();
	rotatedX.identity();
	rotatedX.matrix[1][1] = Math.cos(angle);
	rotatedX.matrix[1][2] = -Math.sin(angle);
	rotatedX.matrix[2][1] = Math.sin(angle); 
	rotatedX.matrix[2][2] = Math.cos(angle);
	this.multiply(rotatedX);
}

Matrix4x4.prototype.rotateY = function(angle) {
	var rotatedY = new Matrix4x4();
	rotatedY.identity();
	rotatedY.matrix[0][0] = Math.cos(angle); 
	rotatedY.matrix[0][2] = Math.sin(angle);
	rotatedY.matrix[2][0] = -Math.sin(angle); 
	rotatedY.matrix[2][2] = Math.cos(angle);
	this.multiply(rotatedY);
}

Matrix4x4.prototype.rotateZ = function(angle) {
	var rotatedZ = new Matrix4x4();
	rotatedZ.identity();
	rotatedZ.matrix[0][0] = Math.cos(angle); 
	rotatedZ.matrix[0][1] = -Math.sin(angle);
	rotatedZ.matrix[1][0] = Math.sin(angle); 
	rotatedZ.matrix[1][1] = Math.cos(angle);
	this.multiply(rotatedZ);
}

Matrix4x4.prototype.translate = function(x, y, z) {
	var translated = new Matrix4x4();
	translated.identity();
	translated.matrix[0][3] = x;
	translated.matrix[1][3] = y;
	translated.matrix[2][3] = z;
	this.multiply(translated);
}

Matrix4x4.prototype.transform = function(point) {
	var p = new Matrix4x4([ [point[0]], 
							[point[1]], 
							[point[2]], 
							[1] ]);
	this.multiply(p, true);
	return p.matrix;
}

Matrix4x4.prototype.multiply = function(m2, canTransform) {
	var multiplied = [];
	var rowSum = 0;
	// 'this' matrix's rows
	for (var row = 0; row < this.rows; row++) { 
		multiplied[row] = [];
		// second matrix's columns
		for (var col = 0; col < m2.cols; col++) {
			rowSum = 0; // empty the row sum for each pairwise iteration
			for (var i = 0; i < this.cols; i++) { 
				rowSum += this.matrix[row][i] * m2.matrix[i][col];
			}
			multiplied[row].push(rowSum);
		}
	}
	// make the leg appear in correct order as in class
	(typeof canTransform === 'undefined') ? this.matrix = multiplied : m2.matrix = multiplied; 
}

var m = new Matrix4x4();
m.identity();
