Project 3 — Image Warping and Mosaicing
Author: Leia Chavarría-Dávila
Course: CS180/280A — Computer Vision

-------------------------------------------------
OVERVIEW
-------------------------------------------------
This project implements a full image mosaicing pipeline
from scratch — including correspondence selection,
homography recovery, inverse warping, and blending.

All functions were written manually without using
cv2.findHomography or cv2.warpPerspective.

The project is divided into four parts:

-------------------------------------------------
A.1: Shoot the Pictures
-------------------------------------------------
Collected several sets of overlapping images with a fixed
center of projection (~50–70% overlap). The three datasets:
 - Hearst Memorial Mining Building (left-right)
 - Wheeler Hall (left-right)
 - Hallway (1–2)

Each set contains planar scenes suitable for projective
transforms and mosaicing.

-------------------------------------------------
A.2: Recover Homographies
-------------------------------------------------
Implemented a custom least-squares solver for the linear
system Ah = b, where h represents the 8 parameters of the
homography (h9 = 1).

Function: computeH(im1_points, im2_points)
Features:
 - Constructed A and b manually from point correspondences
 - Solved using np.linalg.lstsq
 - Implemented optional normalization for better conditioning
 - Computed RMSE and median reprojection error
 - Visualized correspondences across images

Deliverables:
 - Visualizations of correspondences (colored lines)
 - Printed A|b system samples and final 3×3 H matrices

-------------------------------------------------
A.3: Warp the Images
-------------------------------------------------
Implemented inverse warping using two interpolation methods:

1. warpImageNearestNeighbor(im, H)
   - Rounds source coordinates to nearest integer.
   - Fast but aliasing at boundaries.

2. warpImageBilinear(im, H)
   - Weighted average of four nearest pixels.
   - Produces smoother results, slower but cleaner.

Tested by rectifying planar objects:
 - “Entrepreneurship” banner
 - “Mary & Child” book cover

Deliverables:
 - Comparison of Nearest vs Bilinear rectification
 - Discussion on trade-offs (speed vs quality)

-------------------------------------------------
A.4: Blend the Images into a Mosaic
-------------------------------------------------
Warped right images into the left image coordinate frame
using computed H. Built a mosaic with smooth transitions.

Implemented a simple *feather blending* technique using
distance transform as an alpha mask to avoid visible seams.

Function: mosaic_pair(left, right, H)
 - Calculates bounding box for warped image
 - Applies inverse warp into extended canvas
 - Computes soft alpha weights using cv2.distanceTransform
 - Blends overlapping regions smoothly

Deliverables:
 - 3 mosaics (Hearst, Wheeler, Hallway)
 - Comparison of source pairs and final blended mosaics
