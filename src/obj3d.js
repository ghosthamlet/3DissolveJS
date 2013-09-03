/* ==========================================================================
 * obj3d.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 26.Dec.2009  Converted to JavaScript
 * 06.Apr.1997  Last Delphi update
 * 28.Mar.1996  Written for Delphi
 * ==========================================================================
 * A simple 3D engine for JavaScript and the Canvas element
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
// ==== Global constants
// ========================================================================

var MaxGlowDistance = 200;         // up to where the pixels glow at their own color
var MaxViewDistance = 400;         // up to where the pixels are visible

var FadingDistance;                // fading distance

// ========================================================================
// ==== Global Variables
// ========================================================================

var world; // = new tdWorld(640, 640, 320, 320, 0);
var camera; // = new tdCamera();

// ========================================================================
// ==== tdWorld class
// ========================================================================

/**
 * @constructor
 * @param nW
 * @param nH
 * @param nX
 * @param nY
 * @param nBackgroundColor
 */
function tdWorld ( nW, nH, nX, nY, nBackgroundColor )
{
    this.width = nW;
    this.height = nH;
    this.originX = nX;
    this.originY = nY;
    this.backgroundColor = nBackgroundColor;
}

tdWorld.prototype.changeOrigin = function ( nX, nY )
{
    this.originX = nX;
    this.originY = nY;
};

tdWorld.prototype.clearDevice = function ()
{
    ctx.clearRect(0, 0, this.width, this.height);
};

// ========================================================================
// ==== tdLocation class
// ========================================================================

/**
 * Constructs a new tdLocation object. Locations encapsulate a 3D point
 * with both cartesian and spherical coordinates and the ability to
 * modify and report on both coordinate systems.
 *
 * @constructor
 */
function tdLocation ()
{
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.r = 0;
    this.u = 0;
    this.f = Math.PI / 2;
    this.cacheSinCos();
}

tdLocation.prototype.toString = function ()
{
    return "Location (x,y,z) = (" + this.x + ", " + this.y + ", " + this.z + ") - (r, u, f) = (" +
           this.r + ", " + this.u + ", " + this.f + ")";
};

tdLocation.prototype.initCartesian = function ( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.cartesianToSpherical();
};

tdLocation.prototype.initSpherical = function ( r, u, f )
{
    this.r = r;
    this.u = u;
    this.f = f;
    this.sphericalToCartesian();
};

tdLocation.prototype.initCylindrical = function ( r, u, z )
{

    this.x = r * Math.cos(u);
    this.y = r * Math.sin(u);
    this.z = z;
    this.cartesianToSpherical();
};

tdLocation.prototype.offsetCartesian = function ( x, y, z )
{
    this.x += x;
    this.y += y;
    this.z += z;
    this.cartesianToSpherical();
};

tdLocation.prototype.cartesianToSpherical = function ()
{
    this.r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    // theta calculation
    if (this.x == 0)
    {
        if (this.y >= 0)
        {
            this.u = Math.PI / 2;
        }
        else
        {
            this.u = Math.PI * 3 / 2;
        }
    }
    else
    {
        if (this.x > 0)
        {
            this.u = Math.atan(this.y / this.x);
        }
        else
        {
            this.u = Math.atan(this.y / this.x) + Math.PI;
        }
        if (this.u < 0)
        {
            this.u += Math.PI * 2;
        }
    }

    if (this.z == 0)
    {
        this.f = Math.PI / 2;
    }
    else
    {
        this.f = Math.atan(Math.sqrt(this.x * this.x + this.y * this.y) / this.z);
        if (this.f < 0)
        {
            this.f += Math.PI;
        }
    }
    this.cacheSinCos();
};

tdLocation.prototype.sphericalToCartesian = function ()
{
    this.cacheSinCos();
    this.x = this.r * this.SinF * this.CosU;
    this.y = this.r * this.SinF * this.SinU;
    this.z = this.r * this.CosF;
};

tdLocation.prototype.cacheSinCos = function ()
{
    this.SinU = Math.sin(this.u);
    this.CosU = Math.cos(this.u);
    this.SinF = Math.sin(this.f);
    this.CosF = Math.cos(this.f);
};

// ========================================================================
// ==== tdCamera class
// ========================================================================

tdCamera.prototype = new tdLocation();
tdCamera.prototype.constructor = tdCamera;
tdCamera.superclass = tdLocation.prototype;

/**
 * Constructs a new tdCamera object, i.e. a location with distance and roll
 * properties. Cameras always point to 0,0,0
 *
 * @constructor
 */
function tdCamera ()
{
    tdCamera.superclass.initCartesian.call(this, 0, 0, 0);
    this.d = 200;
    this.roll = 0;
}

tdCamera.prototype.toString = function ()
{
    return "Camera (x,y,z, d, r, roll) = (" + this.x + ", " + this.y + ", " + this.z + ", " +
           this.d + ", " + this.r + ", " + this.roll + ")";
};

tdCamera.prototype.initCartesian = function ( x, y, z, d )
{
    tdCamera.superclass.initCartesian.call(this, x, y, z);
    this.d = d;
    this.cartesianToSpherical();
};

tdCamera.prototype.initSpherical = function ( r, u, f, d )
{
    tdCamera.superclass.initSpherical.call(this, r, u, f);
    this.d = d;
};

tdCamera.prototype.initCylindrical = function ( r, u, z, d )
{
    tdCamera.superclass.initCylindrical.call(this, r, u, z);
    this.d = d;
};

tdCamera.prototype.changeU = function ( dU )
{
    this.u += dU;
    this.cacheSinCosU();
};

tdCamera.prototype.changeF = function ( dF )
{
    this.f += dF;
    this.cacheSinCosF();
};

tdCamera.prototype.changeR = function ( dR )
{
    this.r += dR;
};

tdCamera.prototype.changeD = function ( dD )
{
    this.d += dD;
};

tdCamera.prototype.changeRoll = function ( dRoll )
{
    this.roll += dRoll;
};

tdCamera.prototype.newU = function ( nU )
{
    this.u = nU;
    this.cacheSinCosU();
};

tdCamera.prototype.newF = function ( nF )
{
    this.f = nF;
    this.cacheSinCosF();
};

tdCamera.prototype.newR = function ( nR )
{
    this.r = nR;
};

tdCamera.prototype.NewD = function ( nD )
{
    this.d = nD;
};

tdCamera.prototype.NewRoll = function ( nRoll )
{
    this.roll = nRoll;
};

tdCamera.prototype.cacheSinCosU = function ()
{
    this.SinU = Math.sin(this.u);
    this.CosU = Math.cos(this.u);
};

tdCamera.prototype.cacheSinCosF = function ()
{
    this.SinF = Math.sin(this.f);
    this.CosF = Math.cos(this.f);
};

// ========================================================================
// ==== tdPoint class
// ========================================================================

tdPoint.prototype = new tdLocation();
tdPoint.prototype.constructor = tdPoint;
tdPoint.superclass = tdLocation.prototype;

/**
 * Constructs a tdPoint, i.e. a location that is visible in a tdWorld.
 * It has a color and can calculate the "Eye" and "Screen" coordinates
 * using the predefined camera.
 *
 * @constructor
 */
function tdPoint ()
{
    tdPoint.superclass.initCartesian.call(this, 0, 0, 0);
    this.color = "#fff";
    this.colorR = 255;
    this.colorG = 255;
    this.colorB = 255;
    this.colorA = 1.0;
    this.xEye = 0;
    this.yEye = 0;
    this.zEye = 0;
    this.sX = 0;
    this.sY = 0;
    this.pointSize = 1;
}

tdPoint.prototype.toString = function ()
{
    return "Point (x,y,z) = (" + this.x + ", " + this.y + ", " + this.z + ") - Eye(x, y, z) = " +
           this.xEye + ", " + this.yEye + ", " + this.zEye + ") - screen (x,y) = (" + this.sX + ", " + this.sY + ")";
};

tdPoint.prototype.setColorRGBA = function ( r, g, b, a )
{
    this.colorR = r;
    this.colorG = g;
    this.colorB = b;
    this.colorA = a;
    this.color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

tdPoint.prototype.initCartesian = function ( x, y, z, color )
{
    tdPoint.superclass.initCartesian.call(this, x, y, z);
    this.color = color;
};

tdPoint.prototype.initSpherical = function ( r, u, f, color )
{
    tdPoint.superclass.initSpherical.call(this, r, u, f);
    this.color = color;
};

tdPoint.prototype.initCylindrical = function ( r, u, z, color )
{
    tdPoint.superclass.initCylindrical.call(this, r, u, z);
    this.color = color;
};

tdPoint.prototype.calcScreen = function ()
{
    this.xEye = -this.x * camera.SinU + this.y * camera.CosU;
    this.yEye = -this.x * camera.CosU * camera.CosF - this.y * camera.SinU * camera.CosF + this.z * camera.SinF;
    this.zEye = -this.x * camera.SinF * camera.CosU - this.y * camera.SinU * camera.SinF - this.z * camera.CosF + camera.r;

    var helpX = this.xEye * Math.cos(camera.roll) - this.yEye * Math.sin(camera.roll);
    this.yEye = this.xEye * Math.sin(camera.roll) + this.yEye * Math.cos(camera.roll);
    this.xEye = helpX;

    if (this.zEye == 0)
    {
        this.sX = world.originX + Math.round(this.xEye);
    }
    else
    {
        this.sX = world.originX + Math.round(camera.d * this.xEye / this.zEye);
    }
    if (this.zEye == 0)
    {
        this.sY = world.originY + Math.round(this.yEye);
    }
    else
    {
        this.sY = world.originY - Math.round(camera.d * this.yEye / this.zEye);
    }
};

tdPoint.prototype.show = function ()
{
    ctx.fillStyle = this.color;
    ctx.fillRect(this.sX, this.sY, 2, 2);
    // c.fillStyle="rgb("+m+","+(i/4)+",128)";c.fillRect(p[i].sX,p[i].sY,2,2);}
};

tdPoint.prototype.showFaded = function ()
{
    // empty
};

tdPoint.prototype.moveTo = function ()
{
    ctx.moveTo(this.sX, this.sY);
};

tdPoint.prototype.lineTo = function ()
{
    ctx.lineTo(this.sX, this.sY);
};

// ========================================================================
// ==== Various functions
// ========================================================================

function tdDrawLine ( a, b )
{
    ctx.beginPath();
    ctx.moveTo(a.sX, a.sY);
    ctx.lineTo(b.sX, b.sY);
    ctx.stroke();
}

function tdDrawPoly ( aPointArray )
{
    ctx.beginPath();
    ctx.moveTo(aPointArray[0].sX, aPointArray[0].sY);
    for (var i = 1; i < aPointArray.length; i++)
    {
        ctx.lineTo(aPointArray[i].sX, aPointArray[i].sY);
    }
    ctx.stroke();
}

function SetFadingDistance ( a, b )
{
    MaxGlowDistance = a;
    MaxViewDistance = b;
    FadingDistance = b - a;
}
