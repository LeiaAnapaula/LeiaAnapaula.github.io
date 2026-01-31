Project 1 – Prokudin-Gorskii Colorizing (Leia)

How to run
----------
python main.py

Environment
-----------
Python 3.10+
pip install -r requirements.txt

Data
----
Script expects:
  images/monastery.jpg
  images/self_portrait.tif
(Use the course-provided images. If not present, place them in ./images/.)

Outputs
-------
aligned/monastery.png
aligned/self_portrait.tif (and a PNG export you can use for web)

Notes
-----
- Single-scale NCC for monastery (±15 px), 10% border crop.
- Pyramid NCC (~6–7 levels) with anti-aliased resampling for self_portrait.
