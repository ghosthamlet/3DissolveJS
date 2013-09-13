/* ==========================================================================
 * dissolve_pattern.js
 *
 * Written by Kostas Symeonidis
 * Copyright (c)2009-2011
 * ==========================================================================
 * History:
 *
 * 05.Mar.2011  Started this file in order to add shape changing functionality
 * 17.Mar.2011  Added more shapes
 * ==========================================================================
 * Pattern Library for 3D Dissolve JS
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

// =====================================================================================================================
// =====================================================================================================================
// ==== Pattern Library
// =====================================================================================================================
// =====================================================================================================================

function p100_Original3dDissolveJS ( shapeCaption )
{
    var c = ColorFactory.rgb(128, 192, 255);
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(100, Math.random() * Math.PI * 2, Math.random() * Math.PI, c.r, c.g, c.b, c.a, 200);
    }
    shapeCaption.value = "Original Random points on a blue colored sphere";
}

function p101_RandomColoredSphere ( shapeCaption )
{
    var r1 = randomRange(80, 160);
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(r1, Math.random() * Math.PI * 2, Math.random() * Math.PI, c.r, c.g, c.b, c.a, 300);
    }
    shapeCaption.value = "Random points on a randomly colored sphere";
}

function p102_LatLongSphere ( shapeCaption )
{
    var r1 = randomRange(80, 160);
    var c = ColorFactory.randomHiSatHiValueHue();
    var fHueStart = Math.random();
    var fHueStep = (Math.random() - fHueStart) / Math.PI;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = (j / LONGITUDE_POINTS) * Math.PI * 2;
            var fF = ((i / (LATITUDE_POINTS - 1)) * 0.95 + 0.025) * Math.PI;  // just offset from poles
            c.setHue(fHueStart + fF * fHueStep);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(r1, fU, fF, c.r, c.g, c.b, c.a, 300);
        }
    }

    shapeCaption.value = "Lat/Long aligned points on gradient-colored sphere";
}

function p103_Helix ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(Math.floor(i / 4), i / MAX_POINTS * 24 * Math.PI, (i / 1900) * Math.PI,
                                c.r, c.g, c.b, c.a, 100 + Math.floor(i / 3));
    }
    shapeCaption.value = "Helix";
}

// =====================================================================================================================
// ==== Dissolve Classic Shapes
// =====================================================================================================================

function p000_RandomGradientColoredSphere ( shapeCaption )
{
    var r1 = randomRange(80, 160);
    var c = ColorFactory.randomHiSatHiValueHue();
    var fHueStart = Math.random();
    var fHueStep = (Math.random() - fHueStart) / Math.PI;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fF = Math.random() * Math.PI;
            c.setHue(fHueStart + fF * fHueStep);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(r1, Math.random() * Math.PI * 2, fF, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Random points on a gradient-colored sphere";
}

function p001_PolarCaps ( shapeCaption )
{
    var r1 = randomRange(80, 160);
    var c = new Color();
    c.setRandomHue(0.0, 1.0, DEFAULT_ALPHA);

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        var iMidLatitude = (LATITUDE_POINTS - 1) / 2;
        var fSat = 1 - Math.abs(iMidLatitude - i) / iMidLatitude;   // 9..0..9 ==> 1..0..1 ==> 0..1..0

        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = (j / LONGITUDE_POINTS) * Math.PI * 2;
            var fF = (i / (LATITUDE_POINTS - 1)) * Math.PI;
            c.setSaturation(fSat);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(r1, fU, fF, c.r, c.g, c.b, c.a, 300);
        }
    }

    shapeCaption.value = "Polar caps on randomly colored planet";
}

function p002_Shell ( shapeCaption )
{
    var c = ColorFactory.rgb(0, randomRange(80, 160), randomRange(80, 160));
    var iStartRadius = randomRange(30, 60);

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = (j / LONGITUDE_POINTS) * Math.PI * 2;
            var fF = (i / (LATITUDE_POINTS - 1)) * Math.PI;
            c.setRed(i * 10 + 70);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(iStartRadius + j * 2, fU, fF, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Shell";
}

function p003_Decaoctopus ( shapeCaption )
{
    var c = ColorFactory.rgb(random(256), 0, random(256));
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = frac((i * 20 + j * 2) / 360) * Math.PI * 2;
            c.setGreen(j * 5 + 75);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(j * 4, fU, Math.PI / 2, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Decaoctopus";
}

function p004_Galaxy ( shapeCaption )
{
    var c = ColorFactory.rgb(224, 224, 224);
    for (var i = 0; i < 12; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = frac((60 * Math.floor(i / 2) + j * 5 + random(4)) / 360) * Math.PI * 2;
            var fF = Math.PI / 2 + randomFloatRange(-0.1, 0.1);
            c.setBlue((LONGITUDE_POINTS - j) * 5 + 75);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(j * 4 + random(10), fU, fF, c.r, c.g, c.b, c.a, 300);
        }
    }
    for (i = 12; i < LATITUDE_POINTS; i++)
    {
        for (j = 0; j < LONGITUDE_POINTS; j++)
        {
            var n = random(30);
            c.setRgba(225 + n, 225 + n, 225 + n, DEFAULT_ALPHA);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(random(40), randomFloat(Math.PI * 2), randomFloat(Math.PI), c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Spiral Galaxy";
}

function p005_Umbrella ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fU = frac((i * 20 + j * 2) / 360) * Math.PI * 2;
            var fF = (150 - j * 2) / 180 * Math.PI;
            // c.setGreen(j * 5 + 75);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(j * 5, fU, fF, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Spiralled Umbrella";
}

function p006_Ring ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fF = Math.PI / 2 + randomFloatRange(-0.1, 0.1);
            c.setSaturation(randomFloatRange(0.5, 1.0));
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(random(10) + 130, randomFloat(Math.PI * 2), fF, c.r, c.g, c.b, c.a, 100);
        }
    }
    shapeCaption.value = "Ring with varying color saturation";
}

function p007_Cones ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fR = 108 - Math.abs(i - 9) * 12;
            c.setSaturation(1 - i / 36);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian((i - 9) * 12,
                                                           fR * Math.cos(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           fR * Math.sin(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Two Cones";
}

function p008_CircularDisk ( shapeCaption )
{
    var c = ColorFactory.rgb(random(50) + 50, 0, 0);
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fR = random(140);
            c.setGreen(192 - fR);
            c.setBlue(255 - fR);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(fR, randomFloat(Math.PI * 2), Math.PI / 2, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Random Circular Disk";
}

function p009_Spheroid ( shapeCaption )
{
    var c = ColorFactory.rgb(random(256), 255, random(256));
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fR = random(140);
            c.setGreen(110 + fR);
            c.setBlue(255 - fR);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(fR, randomFloat(Math.PI * 2), randomFloat(Math.PI), c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Spheroid - random points inside a Sphere";

}

function p010_FatTorus ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var r1 = random(40) + 60;
    var r2 = r1 - 40;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fR = r2 + r1 * Math.cos(i / LATITUDE_POINTS_DIV_2 * Math.PI);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(fR * Math.sin(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           fR * Math.cos(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           r2 * Math.sin(i / LATITUDE_POINTS_DIV_2 * Math.PI),
                                                           c.r, c.g, c.b, c.a, 300 - i * 10);
        }
    }
    shapeCaption.value = "Fat Torus " + r1 + "-" + r2;
}

function p011_ThinTorus ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var r1 = random(20) + 90;
    var r2 = random(10) + 20;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var fR = r1 + r2 * Math.cos(i / LATITUDE_POINTS_DIV_2 * Math.PI);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(r2 * Math.sin(i / LATITUDE_POINTS_DIV_2 * Math.PI),
                                                           fR * Math.sin(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           fR * Math.cos(j / LONGITUDE_POINTS * Math.PI * 2),
                                                           c.r, c.g, c.b, c.a, 360 - j * 10);
        }
    }
    shapeCaption.value = "Thin Torus " + r1 + "-" + r2;
}

function p012_SphereWithDisk ( shapeCaption )
{
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();

    var r1 = random(20) + 90;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < 18; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(r1, j * 20 / 180 * Math.PI, i * 10 / 180 * Math.PI,
                                                           c1.r, c1.g, c1.b, c1.a, 360 - j * 10);
        }
        for (j = 18; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetCylindrical(random(50), j * 20 / 180 * Math.PI, 0,
                                                             c2.r, c2.g, c2.b, c2.a, 360 - j * 10);
        }
    }
    shapeCaption.value = "Sphere with circular disc";
}

function p013_EllipticCylinder ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var component = random(3); // which color component mutates
    var r1 = random(60) + 50;

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            switch (component)
            {
                case 0:
                    c.setRed(i * 8 + 111); // 111..255
                    break;
                case 1:
                    c.setGreen(i * 8 + 111); // 111..255
                    break;
                case 2:
                    c.setBlue(i * 8 + 111); // 111..255
                    break;
            }
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(r1 * Math.cos(j / 18 * Math.PI),
                                                           (r1 / 2) * Math.sin(j / 18 * Math.PI),
                                                           (i - LATITUDE_POINTS_DIV_2) * 11,
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Elliptic Cylinder (varying " + (component == 0 ? "red" : (component == 1 ? "green" : "blue")) + ")";
}

function p014_ThreeSpheres ( shapeCaption )
{
    var cr = ColorFactory.randomRed();
    var cg = ColorFactory.randomGreen();
    var cb = ColorFactory.randomBlue();
    var rr = random(50) + 30;
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS_DIV_3; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetSphericalOffset(rr, j / 6 * Math.PI, i / 18 * Math.PI, 0, 0, 60,
                                                                 cr.r, cr.g, cr.b, cr.a, 300);
            p[i * LONGITUDE_POINTS + j + LONGITUDE_POINTS_DIV_3].setTargetSphericalOffset(rr, j / 6 * Math.PI, i / 18 * Math.PI, 0, 60, 0,
                                                                                          cg.r, cg.g, cg.b, cr.a, 100);
            p[i * LONGITUDE_POINTS + j + 2 * LONGITUDE_POINTS_DIV_3].setTargetSphericalOffset(rr, j / 6 * Math.PI, i / 18 * Math.PI, 60, 0, 0,
                                                                                              cb.r, cb.g, cb.b, cr.a, 200);
        }
    }
    shapeCaption.value = "Three spheres (red, green, blue)";
}

function p015_Cone ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var r = random(8) + 2;
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        c.setSaturation(1 - i / 36);
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(i * r * Math.cos(j / 18 * Math.PI), i * r * Math.sin(j / 18 * Math.PI), (i - 9) * 12,
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Simple Cone (" + ((LATITUDE_POINTS - 1) * r) + ")";
}

function p016_ThreeTori ( shapeCaption )
{
    var cr = ColorFactory.randomRed();
    var cg = ColorFactory.randomGreen();
    var cb = ColorFactory.randomBlue();
    var vr = 12 + random(12);
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        var rr = 30 + 12 * Math.cos(i / 9 * Math.PI);
        for (var j = 0; j < LONGITUDE_POINTS_DIV_3; j++)
        {
            var sinV = vr * Math.sin(i / 9 * Math.PI);
            var sinR = rr * Math.sin(j / 6 * Math.PI);
            var cosR = rr * Math.cos(j / 6 * Math.PI);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(sinV, sinR, cosR + 100, cr.r, cr.g, cr.b, cr.a, 300);
            p[i * LONGITUDE_POINTS + j + LONGITUDE_POINTS_DIV_3].setTargetCartesian(sinR, sinV + 100, cosR, cg.r, cg.g, cg.b, cr.a, 200);
            p[i * LONGITUDE_POINTS + j + 2 * LONGITUDE_POINTS_DIV_3].setTargetCartesian(sinR + 100, cosR, sinV, cb.r, cb.g, cb.b, cr.a, 100);
        }
    }
    shapeCaption.value = "Three Torii (red, green, blue)";
}

function p017_Umbrella ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(Math.floor(i / 4), i / MAX_POINTS * 12 * Math.PI, (90 - Math.floor(i / 10)) / 180 * Math.PI,
                                c.r, c.g, c.b, c.a, 100 + Math.floor(i / 3));
    }
    shapeCaption.value = "Spiralled Umbrella";
}

function p018_DropInWater ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        var ci = i - 9;
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var cj = j - 18;
            var sq = Math.sqrt(ci * ci + cj * cj);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(ci * 14, cj * 7, Math.round(70 * Math.exp(-sq * Math.PI / 20)) * Math.cos(3 * sq * Math.PI / 10),
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Drop in the Water";
}

function p019_Spring ( shapeCaption )
{
    var c = ColorFactory.randomGreen();
    var r = random(80) + 40;
    var sp = random(20) + 15; // spring twist factor
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setSaturation(1 - i / MAX_POINTS);
        p[i].setTargetCartesian(r * Math.cos(i / sp), r * Math.sin(i / sp), Math.floor(i / 5) - 68,
                                c.r, c.g, c.b, c.a, 100 + Math.floor(i / 3));
    }
    shapeCaption.value = "Spring (" + sp + ")";
}

function p020_Flatland ( shapeCaption )
{
    var c = new Color();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            c.setRgba(i * 14 + 3, 120, 255 - j * 7, DEFAULT_ALPHA);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian((i - 9) * 14, (j - 18) * 7, 0, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Flat colored plane";
}

function p021_PlanetWithRings ( shapeCaption )
{
    var cp = ColorFactory.randomHiSatHiValueHue();
    var cr = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(90 + random(15), Math.random() * Math.PI * 2, (88 + random(7)) / 180 * Math.PI, cr.r, cr.g, cr.b, cr.a, 300);
    }
    for (i = 301; i < MAX_POINTS; i++)
    {
        p[i].setTargetSpherical(50, Math.random() * Math.PI * 2, Math.random() * Math.PI, cp.r, cp.g, cp.b, cp.a, 100);
    }
    shapeCaption.value = "Planet with Rings";
}

function p022_Seaweed ( shapeCaption )
{
    var c = new Color();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        var rr = Math.random() * Math.PI * 2;
        var rf = Math.random() * Math.PI * 5 / 6;
        c.setRgba(0, 255, random(256), DEFAULT_ALPHA);
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(j * 4, rr + Math.random() * (Math.PI / 36), rf + j / 180 * Math.PI, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "\"Seaweed\"";
}

function p023_TwoCylinders ( shapeCaption )
{
    var rr = random(20) + 20;
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS_DIV_2; j++)
        {
            c1.setGreen(255 - Math.abs(i - 9) * 20);
            c2.setRed(255 - Math.abs(i - 9) * 20);
            c2.setGreen(255 - Math.abs(i - 9) * 20);

            p[i * LONGITUDE_POINTS + j].setTargetCylindrical(rr, (j / 9) * Math.PI, (i - 9) * 10,
                                                             c1.r, c1.g, c1.b, c1.a, 300);

            p[i * LONGITUDE_POINTS + j + LONGITUDE_POINTS_DIV_2].setTargetCartesian(rr * Math.cos(j / 9 * Math.PI), (i - 9) * 10, rr * Math.sin(j / 9 * Math.PI),
                                                                                    c2.r, c2.g, c2.b, c2.a, 300);

        }
    }
    shapeCaption.value = "Two Cylinders";
}

function p024_SineSidedQuadrilateral ( shapeCaption )
{
    var c1 = new Color();
    var c2 = new Color();
    var c3 = new Color();
    var c4 = new Color();
    var rr = random(25) + 5;
    for (var i = 0; i < 171; i++)
    {
        c1.setRgba(84 + i, 255, 84 + i, DEFAULT_ALPHA);
        c2.setRgba(255 - i, 255 - i, 255, DEFAULT_ALPHA);
        c3.setRgba(84 + i, 84 + i, 255, DEFAULT_ALPHA);
        c4.setRgba(255 - i, 255, 255 - i, DEFAULT_ALPHA);
        p[i].setTargetCartesian(i - 85, 85 + rr * Math.sin(i * 2 * Math.PI / 171), 0, c1.r, c1.g, c1.b, c1.a, 300 - i);
        p[i + 171].setTargetCartesian(85 + rr * Math.sin(i * 2 * Math.PI / 171), 85 - i, 0, c2.r, c2.g, c2.b, c2.a, 300 - i);
        p[i + 342].setTargetCartesian(85 - i, -85 - rr * Math.sin(i * 2 * Math.PI / 171), 0, c3.r, c3.g, c3.b, c3.a, 300 - i);
        p[i + 513].setTargetCartesian(-85 - rr * Math.sin(i * 2 * Math.PI / 171), i - 85, 0, c4.r, c4.g, c4.b, c4.a, 300 - i);
    }
    shapeCaption.value = "Sine-sided Quadrilateral";
}

function p025_HyperbolicParaboloid ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var flooring = random(2);
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var z = 25 * (Math.pow((i - 9) * 10, 2) / 2500 - Math.pow((j - 18) * 5, 2) / 2500);
            if ((flooring == 0) && (z < 0))
            {
                z = 0;
            }
            var rr = 255 - Math.round(3 * z);

            c.setRgb(rr, 255 - rr, 255);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian((i - 9) * 14, (j - 18) * 7, z, c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Hyperbolic Paraboloid" + ((flooring == 0) ? " flooring on X-Y plane" : "");
}

function p026_HyperbolicParaboloidWithAbsHeight ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var z = 25 * (Math.pow((i - 9) * 10, 2) / 2500 - Math.pow((j - 18) * 5, 2) / 2500);
            c.setSaturation(1 - Math.abs(z) / 100);
            c.setValue(1 - Math.abs(z) / 200);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian((i - 9) * 14, (j - 18) * 7, Math.abs(z), c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Hyperbolic Paraboloid with absolute desaturating Heights";
}

function p027_CosSquaredRevolvedAroundX ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var rR = 80 - 60 * Math.pow(Math.cos((i - 9) * Math.PI / 18), 2);
            c.setSaturation(rR / 100);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian((i - 9) * 10, rR * Math.cos(j * Math.PI / 18), rR * Math.sin(j * Math.PI / 18),
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = "Section of <em>cos<sup style='font-size: 75%'>2</sup></em> revolved around x-axis";
}

function p028_SinSquared ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var r1 = random(2) + 1;
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        var rR = (120 / r1) * Math.pow(Math.sin(r1 * i * Math.PI / 18), 2);

        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            c.setSaturation(rR / 100);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(rR * Math.cos(j * Math.PI / 18), rR * Math.sin(j * Math.PI / 18), (i - 9) * 10,
                                                           c.r, c.g, c.b, c.a, 300);
        }
    }
    shapeCaption.value = ((r1 == 1) ? "Single" : "Double") + " Sin<sup style='font-size: 75%'>2</sup> revolved around z-axis";
}

function p029_CubeEdges ( shapeCaption )
{
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    var c3 = ColorFactory.randomHiSatHiValueHue();
    var r3 = 28;          // 683/12 = 57, therefore 0..57 - 28 = -28..29
    var r4 = r3 * 3; //

    for (var i = 0; i < MAX_POINTS; i++)
    {
        var j = (i % 58);
        switch (i % 12)
        {
            case  0: p[i].setTargetCartesian((j - r3) * 3, -r4, r4, c1.r, c1.g, c1.b, c1.a, 300); break;
            case  1: p[i].setTargetCartesian(r4, (j - r3) * 3, r4, c1.r, c1.g, c1.b, c1.a, 300); break;
            case  2: p[i].setTargetCartesian((r3 - j) * 3, r4, r4, c1.r, c1.g, c1.b, c1.a, 300); break;
            case  3: p[i].setTargetCartesian(-r4, (r3 - j) * 3, r4, c1.r, c1.g, c1.b, c1.a, 300); break;

            case  4: p[i].setTargetCartesian((j - r3) * 3, -r4, -r4, c2.r, c2.g, c2.b, c2.a, 200); break;
            case  5: p[i].setTargetCartesian(r4, (j - r3) * 3, -r4, c2.r, c2.g, c2.b, c2.a, 200); break;
            case  6: p[i].setTargetCartesian((r3 - j) * 3, r4, -r4, c2.r, c2.g, c2.b, c2.a, 200); break;
            case  7: p[i].setTargetCartesian(-r4, (r3 - j) * 3, -r4, c2.r, c2.g, c2.b, c2.a, 200); break;

            case  8: p[i].setTargetCartesian(-r4, -r4, (j - r3) * 3, c3.r, c3.g, c3.b, c3.a, 50); break;
            case  9: p[i].setTargetCartesian(-r4, r4, (j - r3) * 3, c3.r, c3.g, c3.b, c3.a, 50); break;
            case 10: p[i].setTargetCartesian(r4, r4, (j - r3) * 3, c3.r, c3.g, c3.b, c3.a, 50); break;
            case 11: p[i].setTargetCartesian(r4, -r4, (j - r3) * 3, c3.r, c3.g, c3.b, c3.a, 50); break;
        }
    }
    shapeCaption.value = "Cube with random-colored edges";
}

function p030_ParametricPlot ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        var r = (i / 8) + 50 * Math.sin(i * 7 * Math.PI / MAX_POINTS_MINUS_1);
        c.setSaturation(i / MAX_POINTS_MINUS_1);
        p[i].setTargetCartesian(r * Math.cos(i * 8 * Math.PI / MAX_POINTS_MINUS_1),
                                r * Math.sin(i * 8 * Math.PI / MAX_POINTS_MINUS_1),
                                Math.floor(i / 8) - 40,
                                c.r, c.g, c.b, c.a,
                                Math.floor((MAX_POINTS_MINUS_1 - i) / 3) + 73);
    }
    shapeCaption.value = "Parametric plot swirling around z axis";
}

function p031_ParametricPlot ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setSaturation(i / MAX_POINTS_MINUS_1);
        p[i].setTargetCartesian((i / 8) * Math.sin(11 * Math.PI / MAX_POINTS_MINUS_1 * i),
                                10 * Math.cos(i * 23 * Math.PI / MAX_POINTS_MINUS_1) + 50 * Math.cos(1.15 + i * 3 * Math.PI / MAX_POINTS_MINUS_1),
                                80 * Math.cos(i * 7 * Math.PI / MAX_POINTS_MINUS_1),
                                c.r, c.g, c.b, c.a,
                                Math.floor((MAX_POINTS_MINUS_1 - i) / 3) + 73);
    }
    shapeCaption.value = "Parametric plot";
}

function p032_FiveCircles ( shapeCaption )
{
    var c0 = ColorFactory.white();
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    var c3 = ColorFactory.randomHiSatHiValueHue();
    var c4 = ColorFactory.randomHiSatHiValueHue();
    var c5 = ColorFactory.randomHiSatHiValueHue();

    var r = random(20) + 60;
    for (var i = 0; i < MAX_POINTS; i++)
    {
        if (i < 500)
        {
            switch (i % 5)
            {
                case 0: p[i].setTargetCartesian(r * Math.cos(i * Math.PI / 250), 80, r * Math.sin(i * Math.PI / 250), c1.r, c1.g, c1.b, c1.a, 350); break;
                case 1: p[i].setTargetCartesian(r * Math.cos(i * Math.PI / 250), 40, r * Math.sin(i * Math.PI / 250), c2.r, c2.g, c2.b, c2.a, 250); break;
                case 2: p[i].setTargetCartesian(r * Math.cos(i * Math.PI / 250), 0, r * Math.sin(i * Math.PI / 250), c3.r, c3.g, c3.b, c3.a, 200); break;
                case 3: p[i].setTargetCartesian(r * Math.cos(i * Math.PI / 250), -40, r * Math.sin(i * Math.PI / 250), c4.r, c4.g, c4.b, c4.a, 300); break;
                case 4: p[i].setTargetCartesian(r * Math.cos(i * Math.PI / 250), -80, r * Math.sin(i * Math.PI / 250), c5.r, c5.g, c5.b, c5.a, 400); break;
            }
        }
        else // white axis
        {
            p[i].setTargetCartesian(0, i - 591, 0, c0.r, c0.g, c0.b, c0.a, 100);
        }
    }
    shapeCaption.value = "Five circles around Y-axis";
}

function p033_BellLeaves ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var leaves = random(6) + 2;    // two to seven leaves

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        c.setSaturation(i / (LATITUDE_POINTS - 1));
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetCylindrical((i + 1) * 8, j * Math.PI / 18,
                                                             Math.abs(50 * Math.sin(j / 36 * leaves * Math.PI)) * Math.sin(i * 2.5 / 9),
                                                             c.r, c.g, c.b, c.a,
                                                             (LATITUDE_POINTS - i) * 20);
        }
    }
    shapeCaption.value = "Squared Sine Bell-Shaped Leaves (" + leaves + ")";
}

function p034_BellLookingCosineWithFolds ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var folds = randomRange(1, 3);    // one to three folds

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        c.setSaturation(i / (LATITUDE_POINTS - 1));
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetCylindrical((i + 1) * 8, j * Math.PI / 18,
                                                             (50 - i * 2) * Math.cos(i * 4 * folds / 18),
                                                             c.r, c.g, c.b, c.a,
                                                             (LONGITUDE_POINTS - j) * 10);
        }
    }
    shapeCaption.value = "Bell-looking Cosine with " + folds + " fold" + (folds > 1 ? "s" : "");
}

function p035_LeavesAndFolds ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var folds = randomRange(1, 3);    // one to three folds
    var leaves = 12 + random(2) * 6;   // two or three leaves

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        c.setSaturation(i / (LATITUDE_POINTS - 1));
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetCylindrical((i + 1) * 8, j * Math.PI / 18,
                                                             Math.abs(50 * Math.sin(j / leaves * Math.PI)) * Math.sin(i * 2 * folds / 9),
                                                             c.r, c.g, c.b, c.a,
                                                             (LATITUDE_POINTS - i) * 20);
        }
    }
    shapeCaption.value = "Squared Sine Bell-Shaped Leaves clone (" + folds + ", " + leaves + ")";
}

function p036_FloweryCylindricalCosine ( shapeCaption )
{
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    var r1 = randomRange(60, 100);
    var r2 = randomRange(15, 30);
    for (var i = 0; i < MAX_POINTS; i++)
    {
        if (i < 360)
        {
            p[i].setTargetCylindrical(r1 + 20 * Math.cos(i / 36 * 4 * Math.PI),
                                      i * Math.PI / 180,
                                      20 * Math.cos(i / 36 * 4 * Math.PI),
                                      c1.r, c1.g, c1.b, c1.a, 400 - Math.floor(i / 2));
        }
        else
        {
            p[i].setTargetSpherical(r2, randomFloat(2 * Math.PI), randomFloat(Math.PI), c2.r, c2.g, c2.b, c2.a, 100);
        }
    }
    shapeCaption.value = "Flowery Cylindrical Cosine with Sphere";
}

function p037_ClosedLoopParametricPlot ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var r = 70 + random(50);
    var folds = random(13) + 5;
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setSaturation(Math.abs(Math.sin(i * 2 * Math.PI / MAX_POINTS_MINUS_1)));
        p[i].setTargetCartesian(r * Math.cos(i * 2 * Math.PI / MAX_POINTS_MINUS_1),
                                r * Math.sin(i * 4 * Math.PI / MAX_POINTS_MINUS_1),
                                20 * Math.cos(i * 2 * folds * Math.PI / MAX_POINTS_MINUS_1),
                                c.r, c.g, c.b, c.a,
                                400 - Math.floor(i / 2));
    }
    shapeCaption.value = "Closed-loop parametric plot (" + folds + ")";
}

function p038_ParametricPlot ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setSaturation(i / MAX_POINTS_MINUS_1);
        p[i].setTargetCartesian((i / 19) * Math.sin(7 * Math.PI / MAX_POINTS_MINUS_1 * i),
                                10 * Math.cos(i * 23 * Math.PI / MAX_POINTS_MINUS_1) + 50 * Math.cos(1.15 + i * 3 * Math.PI / MAX_POINTS_MINUS_1),
                                80 * Math.cos(i * 7 * Math.PI / MAX_POINTS_MINUS_1),
                                c.r, c.g, c.b, c.a,
                                Math.floor((MAX_POINTS_MINUS_1 - i) / 3) + 73);
    }
    shapeCaption.value = "Parametric Plot #2";
}

function p039_WineGlass ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var sector = randomFloatRange(0.2, 2);        // portion of 0..2*Pi

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        c.setSaturation(i / (LATITUDE_POINTS - 1));
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            p[i * LONGITUDE_POINTS + j].setTargetSpherical((i + 1) * 5 + 20,
                                                           j * sector * Math.PI / 36,
                                                           i * 7 * Math.PI / 180,
                                                           c.r, c.g, c.b, c.a,
                                                           400 - i * 10);
        }
    }
    shapeCaption.value = "Wine Glass";
}

function p040_TwoCylinders ( shapeCaption )
{
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    var r1 = randomRange(60, 100);
    var r2 = randomRange(20, r1 - 10);
    var sector1 = randomFloatRange(0.2, 2);
    var sector2 = randomFloatRange(0.2, 2);

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            if (i <= LATITUDE_POINTS_DIV_2)
            {
                p[i * LONGITUDE_POINTS + j].setTargetCylindrical(r1,
                                                                 j / 36 * sector1 * Math.PI,
                                                                 (i - 4) * 14,
                                                                 c1.r, c1.g, c1.b, c1.a,
                                                                 400 - i * 10);
            }
            else
            {
                p[i * LONGITUDE_POINTS + j].setTargetCylindrical(r2,
                                                                 j / 36 * sector2 * Math.PI + Math.PI,
                                                                 (i - 4 - LATITUDE_POINTS_DIV_2) * 14,
                                                                 c2.r, c2.g, c2.b, c2.a,
                                                                 200);
            }
        }
    }
    shapeCaption.value = "Two Concentric incomplete Cylinders";
}

function p041_CylinderWithSphere ( shapeCaption )
{
    var c1 = ColorFactory.randomHiSatHiValueHue();
    var c2 = ColorFactory.randomHiSatHiValueHue();
    var r1 = randomRange(50, 90);
    var r2 = randomRange(30, r1 - 10);
    var rtype = random(3);

    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            if (i <= LATITUDE_POINTS_DIV_2 + 1)
            {
                p[i * LONGITUDE_POINTS + j].setTargetCylindrical(r1, j * Math.PI / 18, (i - 5) * 14,
                                                                 c1.r, c1.g, c1.b, c1.a,
                                                                 400 - i * 30);
            }
            else
            {
                switch (rtype)
                {
                    case 0: p[i * LONGITUDE_POINTS + j].setTargetSpherical(r2, randomFloat(2 * Math.PI), randomFloat(Math.PI),
                                                                           c2.r, c2.g, c2.b, c2.a, 40);
                        break;
                    case 1: p[i * LONGITUDE_POINTS + j].setTargetSpherical(random(r2), randomFloat(2 * Math.PI), randomFloat(Math.PI),
                                                                           c2.r, c2.g, c2.b, c2.a, 40);
                        break;
                    case 2: p[i * LONGITUDE_POINTS + j].setTargetCylindrical(random(r2), randomFloat(2 * Math.PI), random(70) - 35,
                                                                             c2.r, c2.g, c2.b, c2.a, 40);
                        break;
                }

            }
        }
    }
    shapeCaption.value = "Cylinder with Contents (type " + rtype + ")";
}

function p042_CurvedSurface ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            var rz = (i - 9) * (j - 17) / 2;
            c.setSaturation((100 - Math.abs(rz)) / 100);
            p[i * LONGITUDE_POINTS + j].setTargetCartesian(i * 12 - 108, // 0..18 * 12 = 0..216
                                                           j * 6 - 105, // 0..35 * 6  = 0..210
                                                           rz,
                                                           c.r, c.g, c.b, c.a,
                                                           400 - i * 20);
        }
    }
    shapeCaption.value = "Curved surface - <em>f(x*y)</em>";
}

function p043_FlatCosine ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var hue = Math.random();
    var hueStep = (Math.random() - hue) / MAX_POINTS_MINUS_1;
    var divider = randomRange(14, 24);
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setHue(hue + hueStep * i);
        p[i].setTargetCartesian(i / 3 - 113.83, 0, 30 * Math.cos(i / divider),
                                c.r, c.g, c.b, c.a, 400);
    }
    shapeCaption.value = "Flat rainbow-colored Cosine (" + divider + ")";
}

function p044_ShellMarkII ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var hue = Math.random();
    var hueStep = (Math.random() - hue) / (LONGITUDE_POINTS - 1);
    var r2 = randomRange(2, 10);
    for (var i = 0; i < LATITUDE_POINTS; i++)
    {
        for (var j = 0; j < LONGITUDE_POINTS; j++)
        {
            c.setHue(hue + hueStep * j);
            p[i * LONGITUDE_POINTS + j].setTargetSpherical(j * 4,
                                                           (j * r2) * Math.PI / 180,
                                                           i * Math.PI / 18,
                                                           c.r, c.g, c.b, c.a,
                                                           400 - j * 5);
        }
    }
    shapeCaption.value = "Shell MkII (" + r2 + ")";
}

function p045_CubeMarkII ( shapeCaption )
{
    var c = new Array(6);
    for (var k = 0; k < 6; k++)
    {
        c[k] = ColorFactory.randomHiSatHiValueHue();
    }

    var size = randomRange(140, 220);
    var sizeHalf = size / 2;

    for (var i = 0; i < MAX_POINTS; i++)
    {
        k = i % 6;
        var ra = random(size) - sizeHalf;
        var rb = random(size) - sizeHalf;
        switch (k)
        {
            case  0: p[i].setTargetCartesian(ra, rb, sizeHalf, c[k].r, c[k].g, c[k].b, c[k].a, 500); break;
            case  1: p[i].setTargetCartesian(ra, rb, -sizeHalf, c[k].r, c[k].g, c[k].b, c[k].a, 500); break;
            case  2: p[i].setTargetCartesian(ra, sizeHalf, rb, c[k].r, c[k].g, c[k].b, c[k].a, 300); break;
            case  3: p[i].setTargetCartesian(ra, -sizeHalf, -rb, c[k].r, c[k].g, c[k].b, c[k].a, 300); break;
            case  4: p[i].setTargetCartesian(sizeHalf, ra, rb, c[k].r, c[k].g, c[k].b, c[k].a, 100); break;
            case  5: p[i].setTargetCartesian(-sizeHalf, ra, rb, c[k].r, c[k].g, c[k].b, c[k].a, 100); break;
        }
    }
    shapeCaption.value = "Cube MkII - random points on sides (" + size + ")";
}

function p046_ParametricPlotColorGradient ( shapeCaption )
{
    var c = ColorFactory.randomHiSatHiValueHue();
    var hue = Math.random();
    var hueStep = (Math.random() - hue) / MAX_POINTS_MINUS_1;

    var r1 = randomRange(6, 15);
    var r2 = randomRange(4, 23);
    var r3 = randomRange(4, 10);
    for (var i = 0; i < MAX_POINTS; i++)
    {
        c.setHue(hue + hueStep * i);
        p[i].setTargetCartesian((i / 8) * Math.sin(r1 * Math.PI / MAX_POINTS_MINUS_1 * i),
                                10 * Math.cos(i * r2 * Math.PI / MAX_POINTS_MINUS_1) + 50 * Math.cos(1.15 + i * 3 * Math.PI / MAX_POINTS_MINUS_1),
                                80 * Math.cos(i * r3 * Math.PI / MAX_POINTS_MINUS_1),
                                c.r, c.g, c.b, c.a,
                                Math.floor((MAX_POINTS_MINUS_1 - i) / 3) + 73);
    }
    shapeCaption.value = "Color Gradient Parametric 3D Plot (" + r1 + ", " + r2 + ", " + r3 + ")";
}

// =====================================================================================================================
// =====================================================================================================================
// ==== End of Pattern Library
// =====================================================================================================================
// =====================================================================================================================

var MAX_PATTERNS = 51;
var currentPattern = 0;
var nextPattern;
var patternFrequency = new Array(MAX_PATTERNS);
var transitionFinished = true;
var transitionedPoints = 0;

/**
 * Calculates a new pattern
 */
function getNextPattern ()
{
    do
    {
        var p = random(MAX_PATTERNS);
        // var p = random(2) * 11;
    }
    while (p == currentPattern);
    return p;
}

/**
 * Sets the current pattern
 *
 * @param pattern
 */
function setPattern ( pattern, shapeCaption )
{
    nextPattern = pattern;

    // at this points the transitionFinished should be TRUE, i.e. no tdPoint will be moving
    switch (pattern)
    {
        // New Shapes
        case  0: p100_Original3dDissolveJS(shapeCaption); break;
        case  1: p101_RandomColoredSphere(shapeCaption); break;
        case  2: p102_LatLongSphere(shapeCaption); break;
        case  3: p103_Helix(shapeCaption); break;

        // Original Shapes
        case  4: p000_RandomGradientColoredSphere(shapeCaption); break;
        case  5: p001_PolarCaps(shapeCaption); break;
        case  6: p002_Shell(shapeCaption); break;
        case  7: p003_Decaoctopus(shapeCaption); break;
        case  8: p004_Galaxy(shapeCaption); break;
        case  9: p005_Umbrella(shapeCaption); break;
        case 10: p006_Ring(shapeCaption); break;
        case 11: p007_Cones(shapeCaption); break;
        case 12: p008_CircularDisk(shapeCaption); break;
        case 13: p009_Spheroid(shapeCaption); break;
        case 14: p010_FatTorus(shapeCaption); break;
        case 15: p011_ThinTorus(shapeCaption); break;
        case 16: p012_SphereWithDisk(shapeCaption); break;
        case 17: p013_EllipticCylinder(shapeCaption); break;
        case 18: p014_ThreeSpheres(shapeCaption); break;
        case 19: p015_Cone(shapeCaption); break;
        case 20: p016_ThreeTori(shapeCaption); break;
        case 21: p017_Umbrella(shapeCaption); break;
        case 22: p018_DropInWater(shapeCaption); break;
        case 23: p019_Spring(shapeCaption); break;
        case 24: p020_Flatland(shapeCaption); break;
        case 25: p021_PlanetWithRings(shapeCaption); break;
        case 26: p022_Seaweed(shapeCaption); break;
        case 27: p023_TwoCylinders(shapeCaption); break;
        case 28: p024_SineSidedQuadrilateral(shapeCaption); break;
        case 29: p025_HyperbolicParaboloid(shapeCaption); break;
        case 30: p026_HyperbolicParaboloidWithAbsHeight(shapeCaption); break;
        case 31: p027_CosSquaredRevolvedAroundX(shapeCaption); break;
        case 32: p028_SinSquared(shapeCaption); break;
        case 33: p029_CubeEdges(shapeCaption); break;
        case 34: p030_ParametricPlot(shapeCaption); break;
        case 35: p031_ParametricPlot(shapeCaption); break;
        case 36: p032_FiveCircles(shapeCaption); break;
        case 37: p033_BellLeaves(shapeCaption); break;
        case 38: p034_BellLookingCosineWithFolds(shapeCaption); break;
        case 39: p035_LeavesAndFolds(shapeCaption); break;
        case 40: p036_FloweryCylindricalCosine(shapeCaption); break;
        case 41: p037_ClosedLoopParametricPlot(shapeCaption); break;
        case 42: p038_ParametricPlot(shapeCaption); break;
        case 43: p039_WineGlass(shapeCaption); break;
        case 44: p040_TwoCylinders(shapeCaption); break;
        case 45: p041_CylinderWithSphere(shapeCaption); break;
        case 46: p042_CurvedSurface(shapeCaption); break;
        case 47: p043_FlatCosine(shapeCaption); break;
        case 48: p044_ShellMarkII(shapeCaption); break;
        case 49: p045_CubeMarkII(shapeCaption); break;
        case 50: p046_ParametricPlotColorGradient(shapeCaption); break;
    }

    transitionFinished = false;
    transitionedPoints = 0;
}
