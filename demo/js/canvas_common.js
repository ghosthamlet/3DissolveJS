/* ==========================================================================
 * Canvas_Common.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c) 2009, CyLog Software
 * ==========================================================================
 * History:
 *
 * 08.Nov.2009  Started
 * ==========================================================================
 * License
 * GNU General Public License version 3.0 (GPLv3)
 * ==========================================================================
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ==========================================================================
 */

var ctx;
var ctxImage;         // holder of pixel data
var ctxPixels;        // holder of pixel data for canvas
var iCanvasWidth;
var iCanvasHeight;
var iCanvasX;
var iCanvasY;

var lastColor;


/**
 *
 * @param canvasElement
 * @param w
 * @param h
 */
function initCanvas ( canvasElement, w, h )
{
    var canvas = document.getElementById(canvasElement);
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

    // get the size and position of the canvas on the page
    iCanvasWidth = canvas.width;
    iCanvasHeight = canvas.height;
    iCanvasX = canvas.offsetLeft;
    iCanvasY = canvas.offsetTop;

    // create a back image and get a pointer to the pixels array
    ctxImage = ctx.getImageData(0, 0, iCanvasWidth, iCanvasHeight);
    ctxPixels = ctxImage.data;

    return canvas;
}

/**
 * Draw a Pixel on the canvas context. This method is caching the last color used
 * as the ctx.fillStyle is an expensive method.
 *
 * @param x
 * @param y
 * @param c
 */
function drawPixel ( x, y, c )
{
    if (lastColor != c)
    {
        lastColor = c;
        ctx.fillStyle = colors[c];
    }
    ctx.fillRect(x, y, 1, 1);
}

function drawLine ( x0, y0, x1, y1 )
{
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

/**
 * Converts the canvas to a PNG and modifies the document location to it
 
 * @param canvasElement
 */
function convertToPng ( canvasElement, outputElement )
{
   var canvas = document.getElementById(canvasElement);
   var url = canvas.toDataURL();
   /*
   var img = document.createElement("img");
   img.src = url;
   // document.location.href = strDataURI;
   
   var output = document.getElementById(outputElement);
   while (output.hasChildNodes())
   {
        output.removeChild(output.firstChild);
   }
   output.appendChild(img);
   */
   newwindow = window.open(url, 'canvas generated image');
}


