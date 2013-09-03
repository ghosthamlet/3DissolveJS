/* ==========================================================================
 * colors.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 06.Mar.2011  Started
 * ==========================================================================
 *
 * ==========================================================================
 * "3D Dissolve JS" License
 * GNU General Public License version 3.0 (GPLv3)
 * ==========================================================================
 * This file is part of "3D Dissolve JS"
 *
 * "3D Dissolve JS" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "3D Dissolve JS" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "3D Dissolve JS". If not, see <http://www.gnu.org/licenses/>.
 * ==========================================================================
 */

// ========================================================================
// ==== Utility Methods
// ========================================================================

/**
 * Returns a string representing a canvas color using the given R, G, B and
 * alpha values.
 *
 * @param r
 * @param g
 * @param b
 * @param a
 */
function rgbaColor ( r, g, b, a )
{
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// ========================================================================
// ==== Color class  HSV: [0..1] RGB: [0..255]: Alpha: [0..1]
// ========================================================================

/**
 * Main constructor for a Color, initial color is black. Internally the
 * objects of this class maintain values for RGB and HSV with automatic
 * conversions between them. An alpha channel is also present.
 */
function Color ()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1.0;

    this.h = 0.0;
    this.s = 0.0;
    this.v = 0.0;
}

/**
 * String representation of the color, useful for debugging
 */
Color.prototype.toString = function()
{
    return "(" + this.r + "," + this.g + "," + this.b + ") {" + this.h + "," + this.s + "," + this.v + "} a=" + this.a;
};

// =====================================================================================================================
// ==== Main Color Conversion Methods
// =====================================================================================================================

/**
 * Converts the internal Hue, Saturation and Value vector to RGB
 */
Color.prototype.hsvToRgb = function ()
{
    if (this.s == 0) // saturation is zero, therefore this is a shade of gray
    {
        var value = Math.round(this.v * 255);
        this.r = value;
        this.g = value;
        this.b = value;
    }
    else
    {
        var R, G, B;
        if (this.h == 1)
        {
            this.h = 0;
        }
        var hue = this.h * 6;
        var iHue = Math.floor(hue);
        var fHue = hue - iHue;
        var a1 = this.v * (1 - this.s);
        var a2 = this.v * (1 - (this.s * fHue));
        var a3 = this.v * (1 - (this.s * (1 - fHue)));
        switch (iHue)
        {
            case 0:
                R = this.v;
                G = a3;
                B = a1;
                break;
            case 1:
                R = a2;
                G = this.v;
                B = a1;
                break;
            case 2:
                R = a1;
                G = this.v;
                B = a3;
                break;
            case 3:
                R = a1;
                G = a2;
                B = this.v;
                break;
            case 4:
                R = a3;
                G = a1;
                B = this.v;
                break;
            case 5:
                R = this.v;
                G = a1;
                B = a2;
                break;
        }
        this.r = Math.round(R * 255);
        this.g = Math.round(G * 255);
        this.b = Math.round(B * 255);
    }
};

/**
 * Converts the R, G, B values of this color to H, S, V
 */
Color.prototype.rgbToHsv = function ()
{
    var iMax = Math.max(this.r, Math.max(this.g, this.b));
    var iMin = Math.min(this.r, Math.min(this.g, this.b));
    var iDelta = iMax - iMin;

    this.v = iMax / 255;
    this.s = (iMax != 0) ? 255.0 * iDelta / iMax : 0;

    var fHue = 0; // calculation of Hue from 0..6
    if (this.s != 0)
    {
        if (this.r == iMax)
        {
            fHue = (this.g - this.b) / iDelta;
        }
        else if (this.g == iMax)
        {
            fHue = 2 + (this.b - this.r) / iDelta;
        }
        else if (this.b == iMax)
        {
            fHue = 4 + (this.r - this.g) / iDelta;
        }
        if (fHue < 0)
        {
            fHue += 6;
        }
        else if (fHue == 6)
        {
            fHue = 0;
        }
    }
    this.h = fHue / 6;
};

// =====================================================================================================================
// ==== Set full color methods RGB[A] and HSV[A]
// =====================================================================================================================

/**
 * Sets the R, G, B values of the color, with a constant alpha of 1.0
 *
 * @param r   [0..255]
 * @param g   [0..255]
 * @param b   [0..255]
 */
Color.prototype.setRgb = function ( r, g, b )
{
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 1.0;
    this.rgbToHsv();
};

/**
 * Sets the R, G, B values of the color including an alpha parameter [0..1]
 *
 * @param r   [0..255]
 * @param g   [0..255]
 * @param b   [0..255]
 * @param a   [0..1]
 */
Color.prototype.setRgba = function ( r, g, b, a )
{
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.rgbToHsv();
};

/**
 * Sets the Hue, Saturation and Value (Intensity) of the color and gives it
 * a constant alpha of 1.0
 *
 * @param h   [0..1]
 * @param s   [0..1]
 * @param v   [0..1]
 */
Color.prototype.setHsv = function ( h, s, v )
{
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = 1.0;
    this.hsvToRgb();
};

/**
 * Sets the Hue, Saturation and Value (Intensity) of the color and gives it
 * the given alpha
 *
 * @param h
 * @param s
 * @param v
 * @param a
 */
Color.prototype.setHsva = function ( h, s, v, a )
{
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
    this.hsvToRgb();
};

// =====================================================================================================================
// ==== Set individual Color components
// =====================================================================================================================

Color.prototype.setRed = function ( r )
{
    this.r = r;
    this.rgbToHsv();
};

Color.prototype.setGreen = function ( g )
{
    this.g = g;
    this.rgbToHsv();
};

Color.prototype.setBlue = function ( b )
{
    this.b = b;
    this.rgbToHsv();
};

Color.prototype.setHue = function ( h )
{
    this.h = h;
    this.hsvToRgb();
};

Color.prototype.setSaturation = function ( s )
{
    this.s = s;
    this.hsvToRgb();
};

Color.prototype.setValue = function ( v )
{
    this.v = v;
    this.hsvToRgb();
};

// =====================================================================================================================
// ==== Other helpful methods
// =====================================================================================================================

/**
 * Returns a Canvas Color string representation (rgba) for this color
 */
Color.prototype.getRgbaColor = function ()
{
    return rgbaColor(this.r, this.g, this.b, this.a);
};

/**
 * Sets a random Hue for this color
 *
 * @param s
 * @param v
 * @param a
 */
Color.prototype.setRandomHue = function ( s, v, a )
{
    this.h = Math.random();
    this.s = s;
    this.v = v;
    this.a = a;
    this.hsvToRgb();
};

// =====================================================================================================================
// ==== ColorFactory static library methods
// =====================================================================================================================

var ColorFactory = {};

var DEFAULT_ALPHA = 0.7;

ColorFactory.white = function ()
{
    var c = new Color();
    c.setRgba(255, 255, 255, DEFAULT_ALPHA);
    return c;
};

ColorFactory.rgb= function (r, g, b)
{
    var c = new Color();
    c.setRgba(r, g, b, DEFAULT_ALPHA);
    return c;
};

ColorFactory.randomHiSatHiValueHue = function ()
{
    var c = new Color();
    c.setRandomHue(randomFloatRange(0.5, 1.0), randomFloatRange(0.8, 1.0), DEFAULT_ALPHA);
    return c;
};

ColorFactory.randomRed = function ()
{
    var c = new Color();
    c.setRandomHue(randomFloatRange(0.5, 1.0), randomFloatRange(0.8, 1.0), DEFAULT_ALPHA);
    c.setRed(255);
    return c;
};

ColorFactory.randomGreen = function ()
{
    var c = new Color();
    c.setRandomHue(randomFloatRange(0.5, 1.0), randomFloatRange(0.8, 1.0), DEFAULT_ALPHA);
    c.setGreen(255);
    return c;
};

ColorFactory.randomBlue = function ()
{
    var c = new Color();
    c.setRandomHue(randomFloatRange(0.5, 1.0), randomFloatRange(0.8, 1.0), DEFAULT_ALPHA);
    c.setBlue(255);
    return c;
};

