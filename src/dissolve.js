/* ==========================================================================
 * dissolve.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 06.Dec.2009  Started
 * 05.Mar.2011  Added shape transitions
 * 06.Mar.2011  Added shape caption, axes
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

var LONGITUDE_POINTS = 36;
var LATITUDE_POINTS = 19;
var LATITUDE_POINTS_DIV_2 = Math.round((LATITUDE_POINTS - 1) / 2);
var LONGITUDE_POINTS_DIV_2 = Math.round(LONGITUDE_POINTS / 2);
var LONGITUDE_POINTS_DIV_3 = Math.round(LONGITUDE_POINTS / 3);
var MAX_POINTS = LONGITUDE_POINTS * LATITUDE_POINTS;  // 684 points
var MAX_POINTS_MINUS_1 = MAX_POINTS - 1;
var p = new Array(MAX_POINTS);                        // dissolve points

var WORLD_FILL_STYLE = "rgba(0, 0, 0, 0.8)";   // black with 70% alpha for blur effect
var lblShapeCaption;
var nextShapeCaption = new Object();

var bUseZOrderIndexer = false;
var zOrderIndexer = new ZOrderIndexer();

var bShowStats = false;

function fillStyleForPatternFrequency ( n )
{
    var x = Math.min(16 + n * 16, 192);
    return "rgb(" + x + "," + x + "," + x + ")";
}

function showPatternGrid ()
{
    for (var i = 0; i < MAX_PATTERNS; i++)
    {
        var x = i % 10;
        var y = Math.floor(i / 10);

        ctx.fillStyle = (i == currentPattern) ? "#7a7" : ((i == nextPattern) ? "#447" : fillStyleForPatternFrequency(patternFrequency[i]));
        ctx.fillRect(x * 8 + 4, y * 8 + 4, 6, 6);
    }
}

function drawFrame ()
{
    //ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
    //ctxImage = ctx.getImageData(0, 0, iCanvasWidth, iCanvasHeight);
    //ctxPixels = ctxImage.data;

    ctx.fillStyle = WORLD_FILL_STYLE;
    ctx.fillRect(0, 0, iCanvasWidth, iCanvasHeight);

    if (bShowStats)
    {
        showPatternGrid();
    }

    if (bShowAxes)
    {
        showAxes();
    }

    // New Show with z-order indexer
    if (bUseZOrderIndexer)
    {
        zOrderIndexer.showWithPreorder(0);
    }
    else
    {
        for (var i = 0; i < MAX_POINTS; i++)
        {
            p[i].show(ctxPixels);
        }
    }

    // update frame count
    frameCount++;

    //ctx.putImageData(ctxImage, 0, 0);
}

var wdx = 1;
var wdy = 2;

var MARGIN = 64;

function updateAnimation ()
{
    camera.changeU(0.017);
    camera.changeF(-0.012);
    camera.changeRoll(0.021);

    world.originX += wdx;
    world.originY += wdy;

    if ((world.originX > world.width - MARGIN) || (world.originX < MARGIN))
    {
        wdx = -wdx;
    }
    if ((world.originY > world.height - MARGIN) || (world.originY < MARGIN))
    {
        wdy = -wdy;
    }

    if (bUseZOrderIndexer)
    {
        zOrderIndexer.clear();
    }

    for (var i = 0; i < MAX_POINTS; i++)
    {
        if (!p[i].finished) // if the point is still transitioning to its destination, advance its parameters
        {
            p[i].advanceStep();
            if (p[i].finished)
            {
                transitionedPoints++;
            }
        }
        p[i].calcScreen();

        if (bUseZOrderIndexer)
        {
            zOrderIndexer.addZOrder(i, 0);
        }
    }

    if ((transitionedPoints == MAX_POINTS) && (!transitionFinished))
    {
        transitionFinished = true;
        lblShapeCaption.innerHTML = nextShapeCaption.value;
        currentPattern = nextPattern;
        patternFrequency[currentPattern]++;
    }

    showFrameCount();
}

function mainLoop ()
{
    drawFrame();
    updateAnimation();
    if (bAnimationOn)
    {
        setTimeout('mainLoop()', 10);
    }
}

function initShapeDescription ( shapeCaptionElementId )
{
    lblShapeCaption = document.getElementById(shapeCaptionElementId);
}

function initDissolve ()
{
    lblShapeCaption.innerHTML = "Welcome to 3D Dissolve JS";
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i] = new tdDissolvePoint(i);
        p[i].initSpherical(100, Math.random() * Math.PI * 2, Math.random() * Math.PI);
        p[i].setColorRGBA(128, 192, 255, 0.5);
        p[i].calcScreen();
        p[i].show(ctxPixels);
    }

    // initialize pattern times
    for (i = 0; i < MAX_PATTERNS; i++)
    {
        patternFrequency[i] = 0;
    }
    patternFrequency[0] = 1;

    initializeAxes();
}

function setNewTarget ()
{
    if ((!transitionFinished) || (!bAnimationOn))
    {
        setTimeout('setNewTarget()', 2000);  // wait for another 2 sec
        return;
    }

    var pattern = getNextPattern();
    setPattern(pattern, nextShapeCaption);
    lblShapeCaption.innerHTML += " --> " + nextShapeCaption.value;
    setTimeout('setNewTarget()', randomRange(10, 15) * 1000);          // calculate new target every 10-15"
}
