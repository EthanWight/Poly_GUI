/*
Ethan Wight
March 30, 2025
CMSC 410
Project 2
*/

var gl;
var colors;
var vertices;
var program;
var bufferId;
var cBuffer;
var vPosition;
var vCol;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1.0); // gray

    // Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Create buffers
    bufferId = gl.createBuffer();
    cBuffer = gl.createBuffer();

    // Get attribute locations
    vPosition = gl.getAttribLocation(program, "vPosition");
    vCol = gl.getAttribLocation(program, "vColor");

    // Setup event listeners
    document.getElementById('add-polygon-btn').addEventListener('click', addPolygon);
    
    // Setup sliders to update color in real-time
    ['red-slider', 'green-slider', 'blue-slider'].forEach(function(sliderId) {
        document.getElementById(sliderId).addEventListener('input', updateColor);
    });

    // Initial render of blank canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
};

function getColor() {
    var red = document.getElementById('red-slider').value / 255;
    var green = document.getElementById('green-slider').value / 255;
    var blue = document.getElementById('blue-slider').value / 255;
    
    return [red, green, blue, 1.0];
}

function updateColor() {
    var currentColor = getColor();
    var shape = document.getElementById('shape-select').value;
    
    // Determine number of vertices based on shape
    var numVertices;
    switch(shape) {
        case 'triangle':
            numVertices = 3;
            break;
        case 'square':
            numVertices = 4;
            break;
        case 'hexagon':
            numVertices = 6;
            break;
        case 'circle':
            numVertices = 362; // 360 segments + 2 for center and closing point
            break;
    }
    
    // Create color array matching the number of vertices
    var colorArray = [];
    for (var i = 0; i < numVertices; i++) {
        colorArray.push(currentColor[0], currentColor[1], currentColor[2], currentColor[3]);
    }
    colors = new Float32Array(colorArray);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    render();
}

function addPolygon() {
    var shape = document.getElementById('shape-select').value;
    var color = getColor();
    
    // Generate vertices based on selected shape
    switch(shape) {
        case 'triangle':
            vertices = generateTriangle();
            break;
        case 'square':
            vertices = generateSquare();
            break;
        case 'hexagon':
            vertices = generateHexagon();
            break;
        case 'circle':
            vertices = generateCircle();
            break;
    }
    
    // Update color array to match number of vertices
    var colorArray = [];
    for (var i = 0; i < vertices.length / 2; i++) {
        colorArray.push(color[0], color[1], color[2], color[3]);
    }
    colors = new Float32Array(colorArray);
    
    // Load vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    // Load colors
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vCol, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vCol);
    
    render();
}

function generateTriangle() {
    return new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.0,  0.5
    ]);
}

function generateSquare() {
    return new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5,
        -0.5,  0.5
    ]);
}

function generateHexagon() {
    var vertices = [];
    var radius = 0.5;
    for (var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i) / 6;
        vertices.push(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    return new Float32Array(vertices);
}

function generateCircle() {
    var vertices = [0, 0]; // Center point
    var radius = 0.5;
    var numSegments = 360; // One vertex per degree
    
    for (var i = 0; i <= numSegments; i++) {
        var angle = (Math.PI * 2 * i) / numSegments;
        vertices.push(
            radius * Math.cos(angle), 
            radius * Math.sin(angle)
        );
    }
    
    return new Float32Array(vertices);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Draw polygon based on shape and vertices
    var shape = document.getElementById('shape-select').value;
    switch(shape) {
        case 'triangle':
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            break;
        case 'square':
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            break;
        case 'hexagon':
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
            break;
        case 'circle':
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 362); // 360 segments + 2 for center and closing point
            break;
    }
}