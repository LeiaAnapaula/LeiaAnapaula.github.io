CS180: Intro to Computer Vision
Project 5 — Diffusion Models
Part A: Sampling, Denoising, and Image Manipulation

Author: Leia Chavarría-Dávila
Semester: Fall 2025

------------------------------------------------------------
Overview
------------------------------------------------------------
This project explores DeepFloyd IF, a text-conditioned diffusion model,
and implements core components of the diffusion process. The assignment
includes forward noise processes, classical and neural denoising, iterative
sampling, classifier-free guidance, image-to-image translation, inpainting,
visual anagrams, and hybrid images.

All code is provided in the accompanying notebook, and all generated
results are displayed in index.html.

------------------------------------------------------------
File Structure
------------------------------------------------------------

proj5/
│
├── index.html
│   • Main project webpage
│   • Displays all images and results for Parts 0–1.9
│
├── images/
│   • Contains all generated output images
│     (named p11_*, p12_*, p13_*, …, p19_*)
│
├── model/
│   • Any .pth files (prompt embeddings, custom prompts)
│   • Provided pretrained model files or embeddings
│
└── notebook.ipynb
    • Completed Colab notebook with all code
    • Implements forward process, denoising, CFG sampling,
      image-to-image, inpainting, anagrams, and hybrids

------------------------------------------------------------
How to View the Project
------------------------------------------------------------
1. Open index.html in any browser.
2. Scroll or use navigation links to view each part:
   - Part 0: Setup and prompt embeddings
   - Part 1.1–1.9: All implemented diffusion components
3. All image files are stored in /images and referenced in the webpage.

------------------------------------------------------------
Dependencies
------------------------------------------------------------
• Python 3.10+
• PyTorch + CUDA
• diffusers library
• DeepFloyd IF models (accepted license required)
• HuggingFace login + token
• torchvision
• numpy
• PIL

All dependencies are installed automatically in the provided Colab environment.

------------------------------------------------------------
Instructions to Reproduce Results
------------------------------------------------------------
1. Open notebook.ipynb in Google Colab (GPU recommended).
2. Run the setup cell to load models and authenticate with HuggingFace.
3. Run the cells for Part 0 to generate prompt embeddings.
   (Or optionally load your precomputed .pth files.)
4. Execute each section of the notebook sequentially.
5. Save all outputs to the /images folder.
6. Refresh index.html to reflect updated images.

------------------------------------------------------------
Notes
------------------------------------------------------------
• Random seed used for all sampling: 4444
• Prompt embeddings for the three chosen prompts are included in /model
• All outputs match the required deliverables for Project 5 Part A

------------------------------------------------------------
End of README
------------------------------------------------------------
