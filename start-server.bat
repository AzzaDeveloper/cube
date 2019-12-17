@echo off
color 0b
title Cube Server
mode con: cols=75 lines=25
cd cube
nodemon index.js
pause