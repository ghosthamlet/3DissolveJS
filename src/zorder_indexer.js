/* ==========================================================================
 * zorder_indexer.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2011
 * ==========================================================================
 * History:
 *
 * 10.May.2011  Started
 * ==========================================================================
 * Z-Order indexing class for 3D Dissolve JS
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

function ZOrderRec ()
{
    this.pointer = null;
    this.parentIndex = null;
    this.leftIndex = null;
    this.rightIndex = null;
}

ZOrderRec.prototype.clear = function ()
{
    this.pointer = null;
    this.parentIndex = null;
    this.leftIndex = null;
    this.rightIndex = null;
};

ZOrderRec.prototype.setZOrderRec = function ( pt, pi, li, ri )
{
    this.pointer = pt;
    this.parentIndex = pi;
    this.leftIndex = li;
    this.rightIndex = ri;
};

function ZOrderIndexer ()
{
    this.zOrder = new Array(MAX_POINTS);
    for (var i = 0; i < MAX_POINTS; i++)
    {
        this.zOrder[i] = new ZOrderRec();
    }
    this.zHead = null;
    this.zItems = 0;
}

ZOrderIndexer.prototype.clear = function ()
{
    for (var i = 0; i < MAX_POINTS; i++)
    {
        this.zOrder[i].clear();
    }
    this.zHead = null;
    this.zItems = 0;
};

ZOrderIndexer.prototype.addZOrder = function ( pointIndex, treeTopIndex )
{
    if (this.zItems == 0)
    {
        this.zOrder[0].setZOrderRec(pointIndex, null, null, null);
        this.zHead = 0;  // point the furthermost pixel to 0
        this.zItems++;
    }
    else if (p[pointIndex].zEye > p[this.zOrder[treeTopIndex].pointer].zEye) // if Zeye of passed in particle < Zeye of the particle at the TreeTop
    {
        if (this.zOrder[treeTopIndex].leftIndex == null)
        {
            this.zOrder[this.zItems].setZOrderRec(pointIndex, treeTopIndex, null, null);
            this.zOrder[treeTopIndex].leftIndex = this.zItems;

            // get the zHead sorted
            if ((this.zItems == 0) || (p[pointIndex].zEye < p[this.zHead].zEye))
            {
                this.zHead = this.zItems;
            }

            this.zItems++;
        }
        else
        {
            this.addZOrder(pointIndex, this.zOrder[treeTopIndex].leftIndex);  // add it to left tree;
        }
    }
    else
    {
        if (this.zOrder[treeTopIndex].rightIndex == null)
        {
            this.zOrder[this.zItems].setZOrderRec(pointIndex, treeTopIndex, null, null);
            this.zOrder[treeTopIndex].rightIndex = this.zItems;

            // get the zHead sorted out
            if ((this.zItems == 0) || (p[pointIndex].zEye < p[this.zHead].zEye))
            {
                this.zHead = this.zItems;
            }

            this.zItems++;
        }
        else
        {
            this.addZOrder(pointIndex, this.zOrder[treeTopIndex].rightIndex);  // add it to left tree;
        }
    }
};

ZOrderIndexer.prototype.showWithPreorder = function ( particleIndex )
{
    if (this.zOrder[particleIndex].leftIndex != null)
    {
        this.showWithPreorder(this.zOrder[particleIndex].leftIndex);
    }

    if (p[this.zOrder[particleIndex].pointer] != null)
    {
        p[this.zOrder[particleIndex].pointer].show();
    }

    if (this.zOrder[particleIndex].rightIndex != null)
    {
        this.showWithPreorder(this.zOrder[particleIndex].rightIndex);
    }
};
