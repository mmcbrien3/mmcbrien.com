---
layout: thoughts_entry 
---
## Brains vs. Brawn: A footnote on GPUs and the Discrete Cosine Transform

#### October 26th, 2019

### Introduction

The discrete cosine transform (DCT) is an important mathematical process that is used in image compression. It is called a discrete transform because it maps a set of discrete data points to a new domain. In our case, the DCT will convert an image into a sum of cosines of different frequencies. The DCT is similar to the discrete fourier transform, and in fact the DCT can be derived directly from the DFT. For many mathematical reasons that need not be discussed here, the DCT is preferred to the DFT for image compression.

Let us define the DCT explicitly.


$$
\text{Imagine you have an } M\text{x}N \text{ image:} f[m,n]
\\
f[0,0] \text{ represents the pixel at the origin, etc.}
\\
\text{DCT}(f)= F[k,l] = \sum_{m=0}^{M-1}\sum_{n=0}^{N-1} f[m,n]*\cos\left[\frac{\pi}{M}\left(m+\frac{1}{2}\right)k\right]*\cos\left[\frac{\pi}{N}\left(n+\frac{1}{2}\right)l\right]
$$


This looks complicated, but there are a few things to note that may clear things up. We can see that we have a double sum that covers the entire image from for each value of k and l in the DCT. This means that if we have a 512x512 image, the DCT will be a 512x512 matrix and each value in the DCT will require the entire 512x512=262144 term sum to be computed. Said another way, the total number of times the argument of the sum must be evaluated is equal to M^2*N^2, in the case of a 512x512 image, 68719476736 times.

It's also worth noting that the cosines change in frequency based on the current value of m and k (or n and l). You can see that the value of F[0, 0] is simply the sum of all the pixel in f[m, n] because the argument of each cosine is always 0 and cos(0) = 1. As the value of k and l changes, we get the sum of each pixel in f multiplied by a cosine of some frequency dependent upon the position m, n.

So who cares about all this. Well this feature of mapping the image to a new domain is critical for compression. Imagine you have some image and you want to compress it. How would you do that? In this case we are talking about lossy compression, we can sacrifice quality for the sake of data compression.

We could make the image smaller by taking only every other pixel or every third pixel. We can do much better using the DCT. If we are going to remove data from an image, we should remove the parts of the image that humans have trouble noticing anyways. For example, high frequency aspects of an image are more difficult to notice than low frequency. An example of this property is shown below.



We will get more into how this was performed later, but for now, you can see the obvious problems of filtering out low frequency terms when compared to high frequency terms. This was performed using the DCT. The values of the DCT represent the the different frequencies associated with the image. The values close to F[0, 0] represent low frequency terms and the values close to F[M-1, N-1] represent high frequency terms. We can take a few basic steps to perform compression using the DCT. 1) Take the DCT of an image, 2) remove some high frequency terms, 3) transmit only the remaining lower frequency terms, 4) the receiver performs the inverse DCT only on the remaining data and receives a good representation of the image.

### A Brief look at compression



### A Faster DCT



### Optimizing Python to run DCT

### Conclusions

bop.

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
      }
    });
</script>
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
