# Polygon Generator Readme

## Overview
This project is a simple WebGL-based polygon generator that allows users to create and visualize different shapes with customizable colors. The application renders triangles, squares, hexagons, and circles on an HTML5 canvas using WebGL.

## Files
- **Poly_GUI.html**: The HTML file that creates the user interface, including the WebGL canvas and control elements.
- **Poly_GUI.js**: The JavaScript file that implements the WebGL rendering and polygon generation logic.
- **webgl-utils.js**: Utility functions for WebGL (not included, but referenced).
- **initShaders.js**: Functions for initializing WebGL shaders (not included, but referenced).
- **MV.js**: Matrix/Vector library for WebGL operations (not included, but referenced).

## Features
- Canvas for rendering WebGL graphics
- Color selection via RGB sliders
- Shape selection dropdown menu with options for:
  - Triangle
  - Square
  - Hexagon
  - Circle
- Button to add the selected shape to the canvas

## Usage
1. Open the HTML file in a web browser that supports WebGL.
2. Use the RGB sliders to select a color for your shape.
3. Choose a shape from the dropdown menu.
4. Click the "Add Polygon" button to render the shape on the canvas.

## Implementation Details
- The application uses vertex and fragment shaders to render the shapes.
- Each shape is generated with appropriate vertex coordinates:
  - Triangle: Three vertices forming a simple triangle
  - Square: Four vertices forming a square
  - Hexagon: Six vertices calculated using polar coordinates
  - Circle: 362 vertices (center point plus 361 points around the circumference)
- Colors are applied uniformly to each shape based on the RGB slider values.
- Shapes are rendered using the TRIANGLE_FAN drawing mode (except for the triangle, which uses TRIANGLES).

## Dependencies
This application requires the following JavaScript libraries:
- webgl-utils.js
- initShaders.js
- MV.js

## Author
Ethan Wight  
