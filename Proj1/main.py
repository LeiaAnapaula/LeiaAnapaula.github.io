# CS180 (CS280A): Project 1 starter Python code

# these are just some suggested libraries
# instead of scikit-image you could use matplotlib and opencv to read, write, and display images

import numpy as np
import skimage as sk
import skimage.io as skio # make a python environment with scikit-image installed
from skimage.transform import rescale


# name of the input file
imname = 'images/monastery.jpg'

# read in the image
im = skio.imread(imname)

# convert to double (might want to do this later on to save memory)    
im = sk.img_as_float(im)
    
# compute the height of each part (just 1/3 of total)
height = im.shape[0] // 3 # and int, not float

# debug
print("height: ", height, type(height))


# separate color channels
b = im[:height]
g = im[height: 2*height]
r = im[2*height: 3*height]

# align the images
# functions that might be useful for aligning the images include:
# np.roll, np.sum, sk.transform.rescale (for multiscale)

# align function that merges raw intensity and edge-based matching

# TEST IT ON THE WEBSITE

def align(im1, im2):

    # brute force solution
    max_ncc = -np.inf # ncc can be negative
    max_x, max_y = 0, 0
    # cropped copies for scoring
    im1 = crop_inner(im1)
    im2 = crop_inner(im2)

    for x in range(-15, 16): # ranges should be fine
        for y in range(-15, 16):
            im2_shift = np.roll(im2, (x, y), axis = (0, 1)) # 0 for x-axis and 1 for y-axis, by convention
            current_ncc = ncc(im1, im2_shift) # number

            if current_ncc > max_ncc:
                max_ncc = current_ncc
                max_x, max_y = x, y

    return (max_x, max_y)



def ssd(a, b):

    return float(np.sum((a - b) ** 2)) # sum of sqrd differences of pixel values (a float in [0, 1])

def ncc(a, b):
    a0 = a - a.mean() # the mean of an image?
    b0 = b - b.mean()
    denom = (np.sqrt(np.sum(a0*a0)) * np.sqrt(np.sum(b0*b0))) 
    return float(np.sum(a0*b0) / denom)  if denom != 0 else -np.inf # normalized cross-correlation of pixel values (a float in [-1, 1])


def crop_inner(img, frac = 0.10):
    # crop the borders of the image by a fraction frac
    h, w = img.shape
    dy, dx = int(h * frac), int(w * frac)
    return img[dy : h - dy, dx : w - dx]

# align green and red channels to blue
ag_displacement = align(r, g) # return the displacement, to scale the x,y up again
ag = np.roll(g, (ag_displacement[0], ag_displacement[1]), axis = (0, 1)) # return g shifted to match b

ab_displacement = align(r, b)
ab = np.roll(b, (ab_displacement[0], ab_displacement[1]), axis = (0, 1)) # return r shifted to match b

ag = crop_inner(ag)
ab = crop_inner(ab)
r = crop_inner(r)

print("ag shape: ", ag.shape)
print("ab shape: ", ab.shape)
print("r shape: ", r.shape)

# create a color image
im_out = np.dstack([r, ag, ab])

# save the image
fname = 'aligned/monastery.png'
skio.imsave(fname, (im_out * 255).astype('uint8')) # the pixel values in python range from 0,1 so we scale by 255


# display the image
skio.imshow(im_out)
skio.show()

## PART 2

# use the pyramid function

def align_pyramid(im1, im2, levels=3):
    if levels == 0:
        return align(im1, im2)
    
    # Downsample properly
    im1_small = rescale(im1, 0.5, anti_aliasing=True, preserve_range=True)
    im2_small = rescale(im2, 0.5, anti_aliasing=True, preserve_range=True)
    
    # Get coarse displacement
    coarse_disp = align_pyramid(im1_small, im2_small, levels-1)
    
    # Scale up and refine with small search
    scaled_disp = (coarse_disp[0]*2, coarse_disp[1]*2)
    
    # Small refinement search around scaled displacement
    best_disp = scaled_disp
    best_ncc = -np.inf
    im1_crop = crop_inner(im1)
    
    for dy in range(-2, 3):  # Small search window
        for dx in range(-2, 3):
            test_disp = (scaled_disp[0] + dy, scaled_disp[1] + dx)
            im2_shift = np.roll(crop_inner(im2), test_disp, axis=(0,1))
            current_ncc = ncc(im1_crop, im2_shift)
            if current_ncc > best_ncc:
                best_ncc = current_ncc
                best_disp = test_disp
                
    return best_disp
    
# use the align function i alr created



# name of the input file
imname2 = 'images/self_portrait.tif'

# read in the image
im2 = skio.imread(imname2)

# convert to double (might want to do this later on to save memory)    
im2 = sk.img_as_float(im2)
    
# compute the height of each part (just 1/3 of total)
height2 = im2.shape[0] // 3 # and int, not float

# debug
print("height: ", height2, type(height2))


# separate color channels
b2 = im2[:height2]
g2 = im2[height2: 2*height2]
r2 = im2[2*height2: 3*height2]


# align green and red channels to blue
# Replace pyramid calls with simple align calls temporarily
ag2_displacement = align_pyramid(r2, g2, 3)
ab2_displacement = align_pyramid(r2, b2, 3)
print(f"Simple align - Green: {ag2_displacement}, Blue: {ab2_displacement}")

ag2 = np.roll(g2, (ag2_displacement[0], ag2_displacement[1]), axis = (0, 1))
ab2 = np.roll(b2, (ab2_displacement[0], ab2_displacement[1]), axis = (0, 1))


ag2 = crop_inner(ag2)
ab2 = crop_inner(ab2)
r2 = crop_inner(r2)

print("ag shape: ", ag2.shape)
print("ab shape: ", ab2.shape)
print("r shape: ", r2.shape)

# create a color image
im_out2 = np.dstack([r2, ag2, ab2])

# save the image
fname2 = 'aligned/self_portrait.tif'
skio.imsave(fname2, (im_out2 * 255).astype('uint8')) # the pixel values in python range from 0,1 so we scale by 255


# display the image
skio.imshow(im_out2)
skio.show()
