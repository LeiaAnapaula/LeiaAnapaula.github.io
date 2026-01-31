CS180 / Project 2: Fun with Filters and Frequencies
Author: Leia Anapaula
Semester: Fall 2025

==================================================
Overview
==================================================
This project explores image filtering in the spatial and frequency domains,
including convolution, edge detection, Gaussian derivatives, unsharp masking,
hybrid images, and multiresolution blending.

The implementation was done in Python (NumPy, SciPy, OpenCV, Matplotlib).
All results are displayed in `index.html`, which is linked to the images
generated and stored in the `figs/` and `spline/` folders.

==================================================
Contents
==================================================
1. proj2.ipynb
   - Main Jupyter Notebook with all code and experiments.

2. index.html
   - Webpage report with explanations, code snippets, and visual results.

3. figs/ (output images)
   - Contains generated figures for each part of the project:
     * Edge detection (Part 1.2, 1.3)
     * Unsharp masking (Part 2.1, including Taj Mahal, siblings, and recovery test)
     * Hybrid images (Part 2.2, Mom + Dad)
     * Multiresolution blending (Part 2.4, e.g., Messi + Pope, cotton candy dress)

4. spline/ (input images & masks)
   - Original images used in experiments, plus masks for blending.

5. Additional input images:
   - mom.jpg, dad.jpg, girls.jpg, siblings.jpg, selfie.jpeg, taj.jpg, cameraman.png

==================================================
How to View
==================================================
1. Open `index.html` in a web browser to read the full project writeup.
2. All referenced images will load from the `figs/` and `spline/` directories.

==================================================
Key Highlights
==================================================
- Implemented naive 2D convolution (4-loop + 2-loop) and compared to SciPy.
- Applied finite-difference and DoG filters for edge detection.
- Sharpened images with unsharp masking and tested recovery from blur.
- Created hybrid images (Mom + Dad) showing low/high frequency fusion.
- Blended images with Laplacian pyramids (Messi’s hair on the Pope, cotton candy dress).

==================================================
Notes
==================================================
- All code runs under Python 3.12 (Anaconda), with NumPy 1.26.4, SciPy 1.14.1, OpenCV 4.12.
- Known issues: alignment is important for hybrid images (face alignment affects results).
