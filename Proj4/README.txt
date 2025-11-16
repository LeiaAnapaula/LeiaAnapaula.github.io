CS180 – Project 4: Neural Radiance Fields (NeRF)
Author: Leia Chavarría Dávila
Semester: Fall 2025

---------------------------------------------
Overview
---------------------------------------------
This project implements a simplified Neural Radiance Field (NeRF) pipeline, including:
• Camera calibration and dataset preparation
• Ray generation from camera intrinsics/extrinsics
• Stratified sampling along rays
• A NeRF-style MLP with positional encoding
• Differentiable volume rendering
• Training on both the Lego multi-view dataset and my own captured scene

All results, visualizations, and code snippets are displayed in index.html.

---------------------------------------------
Project Structure
---------------------------------------------
Proj4/
    index.html           – Full project report with images, code, and explanations
    readme.txt           – This file
    *.png                – Training visualizations, intermediate renders, plots
    *.jpg                – Raw example images
    *.gif                – Novel-view GIF created for Part 2.6
    (any additional assets used in index.html)

---------------------------------------------
Key Files and Deliverables
---------------------------------------------
• Part 0: Camera calibration, captured image pairs, COLMAP reconstructions
• Part 1: Pixel-based neural field (fox image)
• Part 2.1: Ray generation from cameras
• Part 2.2: Stratified sampling along rays
• Part 2.3: Ray and camera visualizations
• Part 2.4: MLP network with positional encoding
• Part 2.5: Volume rendering implementation + diagrams + unit tests + GIF
• Part 2.6: Training NeRF on my own object
      – Training loss plot
      – Intermediate renders
      – Final GIF of camera orbit

---------------------------------------------
Instructions to View the Report
---------------------------------------------
1. Open index.html in any modern browser.
2. Ensure all image assets remain in the same folder as index.html.
3. The page will automatically load all visualizations and code blocks.

---------------------------------------------
Dependencies (for code reproduction)
---------------------------------------------
Python 3.10+
PyTorch
NumPy
OpenCV
ImageIO
COLMAP (optional – used for recovering camera poses)

---------------------------------------------
Notes
---------------------------------------------
• All NeRF components (sampling, rendering, MLP) were implemented manually.
• The project follows the CS180 Project 4 specification exactly.
• Some hyperparameters were adjusted for my custom dataset (documented in Part 2.6).

---------------------------------------------
End of File
---------------------------------------------
