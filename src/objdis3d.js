/* ==========================================================================
 * objdis3d.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c) 2009, CyLog Software
 * ==========================================================================
 * History:
 *
 * 26.Dec.2009  Converted to JavaScript
 *        1997  Written for Delphi
 * ==========================================================================
 * The implementation of a 3D Dissolve object
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

// ========================================================================
// ==== Global Variables
// ========================================================================

// ========================================================================
// ==== tdDisPoint class
// ========================================================================

tdDissolvePoint.prototype = new tdPoint();
tdDissolvePoint.prototype.constructor = tdDissolvePoint;
tdDissolvePoint.superclass = tdPoint.prototype;

/**
 * Constructs a new tdDissolvePoint with a unique identifier.
 *
 * @constructor
 * @param uniqueId
 */
function tdDissolvePoint ( uniqueId )
{
    tdDissolvePoint.superclass.initCartesian.call(this, 0, 0, 0);
    this.uniqueId = uniqueId;
    this.targetPoint = new tdLocation();
    this.xStep = 0.0;
    this.yStep = 0.0;
    this.zStep = 0.0;
    this.endColor = null;
    this.fR = this.colorR;   // floating value to hold the actual color value before conversion to Integer
    this.fG = this.colorG;
    this.fB = this.colorB;
    this.rStep = 0.0;
    this.gStep = 0.0;
    this.bStep = 0.0;
    this.aStep = 0.0;
    this.endR = 0;
    this.endG = 0;
    this.endB = 0;
    this.endA = 0;

    this.currentStep = 0;
    this.steps = 0;
    this.finished = true;
}

tdDissolvePoint.prototype.getRgbaColor = function()
{
    return rgbaColor(this.colorR, this.colorG, this.colorB, this.colorA);
};

tdDissolvePoint.prototype.initCartesian = function ( x, y, z )
{
    tdPoint.superclass.initCartesian.call(this, x, y, z);
    this.finished = true;
};

tdDissolvePoint.prototype.initSpherical = function ( r, u, f )
{
    tdPoint.superclass.initSpherical.call(this, r, u, f);
    this.finished = true;
};

tdDissolvePoint.prototype.initCylindrical = function ( r, u, z )
{
    tdPoint.superclass.initCylindrical.call(this, r, u, z);
    this.finished = true;
};

/**
 * Sets up the steps for the transition of this tdDissolvePoint from its
 * current coordinate to a new one, including the transition to a new color
 *
 * @param cr
 * @param cg
 * @param cb
 * @param ca
 * @param steps
 */
tdDissolvePoint.prototype.setupTransitions = function ( cr, cg, cb, ca, steps )
{
    this.xStep = (this.targetPoint.x - this.x) / steps;
    this.yStep = (this.targetPoint.y - this.y) / steps;
    this.zStep = (this.targetPoint.z - this.z) / steps;
    this.fR = this.colorR;
    this.fG = this.colorG;
    this.fB = this.colorB;
    this.rStep = (cr - this.colorR) / steps;
    this.gStep = (cg - this.colorG) / steps;
    this.bStep = (cb - this.colorB) / steps;
    this.aStep = (ca - this.colorA) / steps;
    this.endR = cr;
    this.endG = cg;
    this.endB = cb;
    this.endA = ca;
    this.endColor = rgbaColor(cr, cg, cb, ca);

    // finally setup what is needed for the transition to start
    this.currentStep = 0;
    this.steps = steps;
    this.finished = false;
};

/**
 * Advances one step towards the transition. When the transition completes,
 * the
 */
tdDissolvePoint.prototype.advanceStep = function ()
{
    if (!this.finished)
    {
        this.x += this.xStep;
        this.y += this.yStep;
        this.z += this.zStep;
        this.colorR = Math.round(this.fR += this.rStep);
        this.colorG = Math.round(this.fG += this.gStep);
        this.colorB = Math.round(this.fB += this.bStep);
        this.colorA += this.aStep;
        this.color = rgbaColor(this.colorR, this.colorG, this.colorB, this.colorA);
        this.currentStep++;
        if (this.currentStep >= this.steps)
        {
            this.x = this.targetPoint.x;
            this.y = this.targetPoint.y;
            this.z = this.targetPoint.z;
            this.colorR = this.endR;
            this.colorG = this.endG;
            this.colorB = this.endB;
            this.colorA = this.endA;
            this.color = this.endColor;
            this.finished = true;
            this.currentStep = 0;
        }
    }
};

tdDissolvePoint.prototype.setTargetCartesian = function ( x, y, z, cr, cg, cb, ca, steps )
{
    this.targetPoint.initCartesian(x, y, z);
    this.setupTransitions(cr, cg, cb, ca, steps);
};

tdDissolvePoint.prototype.setTargetSpherical = function ( r, u, f, cr, cg, cb, ca, steps )
{
    this.targetPoint.initSpherical(r, u, f);
    this.setupTransitions(cr, cg, cb, ca, steps);
};

tdDissolvePoint.prototype.setTargetCylindrical = function ( r, u, z, cr, cg, cb, ca, steps )
{
    this.targetPoint.initCylindrical(r, u, z);
    this.setupTransitions(cr, cg, cb, ca, steps);
};

tdDissolvePoint.prototype.setTargetCartesianOffset = function ( x, y, z, offset_x, offset_y, offset_z, cr, cg, cb, ca, steps )
{
    this.targetPoint.initCartesian(x, y, z);
    this.targetPoint.offsetCartesian(offset_x, offset_y, offset_z);
    this.setupTransitions(cr, cg, cb, ca, steps);
};

tdDissolvePoint.prototype.setTargetSphericalOffset = function ( r, u, f, offset_x, offset_y, offset_z, cr, cg, cb, ca, steps )
{
    this.targetPoint.initSpherical(r, u, f);
    this.targetPoint.offsetCartesian(offset_x, offset_y, offset_z);
    this.setupTransitions(cr, cg, cb, ca, steps);
};


