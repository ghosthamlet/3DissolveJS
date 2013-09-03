/* ==========================================================================
 * axes.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 06.Mar.2011  Started
 * ==========================================================================
 * This is a Particle class for a Dissolve particle
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

var bShowAxes = false;
var AXIS_SIZE = 160;
var q = new Array(7);            // axes, incl. center

/**
 * Creates the Axes tdPoints and sets them up
 */
function initializeAxes ()
{
    // Create Axes
    for (var i = 0; i < 7; i++)
    {
        q[i] = new tdPoint();
    }
    q[0].initCartesian(0, 0, 0, 0);
    q[1].initCartesian(AXIS_SIZE, 0, 0, 0);
    q[2].initCartesian(-AXIS_SIZE, 0, 0, 0);
    q[3].initCartesian(0, AXIS_SIZE, 0, 0);
    q[4].initCartesian(0, -AXIS_SIZE, 0, 0);
    q[5].initCartesian(0, 0, AXIS_SIZE, 0);
    q[6].initCartesian(0, 0, -AXIS_SIZE, 0);
}

/**
 * Displays the axes on the screen.
 */
function showAxes ()
{
    for (var i = 0; i < 7; i++)
    {
        q[i].calcScreen();
    }
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(64,64,64,0.6)";
    tdDrawLine(q[0], q[2]);
    tdDrawLine(q[0], q[4]);
    tdDrawLine(q[0], q[6]);
    ctx.strokeStyle = "rgba(120,120,120,0.6)";
    tdDrawLine(q[0], q[1]);
    ctx.strokeStyle = "rgba(120,120,120,0.6)";
    tdDrawLine(q[0], q[3]);
    ctx.strokeStyle = "rgba(120,120,200,0.6)";
    tdDrawLine(q[0], q[5]);
}
