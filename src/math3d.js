/* ==========================================================================
 * math3d.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 28.Mar.1996  Written for Delphi
 * 26.Dec.2009  Converted to JavaScript
 * ==========================================================================
 * Math3D is a collection of helpful mathematical routines used in Dissolve
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
// ==== Global constants
// ========================================================================

// ========================================================================
// ==== Functions
// ========================================================================

/**
 * Returns the fractional part of a number
 * @param a
 */
function frac ( a )
{
    return a - Math.floor(a);
}

/**
 *
 * @param a
 * @param b
 */
function div ( a, b )
{
    return Math.floor (a/b);
}

// ========================================================================
// ==== Initialiser
// ========================================================================

