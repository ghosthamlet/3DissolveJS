/* ==========================================================================
 * Animation Control.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c) 2009, CyLog Software
 * ==========================================================================
 * History:
 *
 * 06.Dec.2009  Added more comments
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

var bAnimationOn = false;

var frameCount = 0;
var lblFrameCount;

var dtStarted;

/**
 * Stops the animation if it's currently running by setting the
 * bAnimationOn flag to FALSE
 *
 */
function stopAnimation ()
{
    if (bAnimationOn)
    {
        bAnimationOn = false;
    }
}

/**
 * Starts the animation if it is not currently running. Calls the given
 * main loop method once to kick start the animation.
 *
 * @param mainLoopMethod
 */
function startAnimation ( mainLoopMethod )
{
    if (!bAnimationOn)
    {
        frameCount = 0;
        bAnimationOn = true;
        dtStarted = new Date().getTime();
        mainLoopMethod();
    }
}

/**
 * Shows the current frame count of the animation
 */
function showFrameCount ()
{
    var elapsed = new Date().getTime() - dtStarted;
    var fps = (elapsed == 0) ? 0 : 1000 * (frameCount / elapsed);
    lblFrameCount.innerHTML = fps.toFixed(1) + " fps"; // frameCount + " " +
}

/**
 * Initialises the animation by capturing the label element for displaying the
 * frame counter.
 *
 * @param frameCounterElementId
 */
function initAnimationControl ( frameCounterElementId )
{
    lblFrameCount = document.getElementById(frameCounterElementId);
}

