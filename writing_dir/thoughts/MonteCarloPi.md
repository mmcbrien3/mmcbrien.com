---
layout: thoughts_entry
---
## Monte Carlo Pi Calculation

#### April 8th, 2023
In this article I will show how you can use a monte carlo simulation to estimate the
value of pi.

Imagine a circle with a radius of one that fits perfectly inside of a square. This
square has a side length of two, twice the radius of the circle. The following
graphic visualizes this where the circle is in green and the square in red.

<div id="filledCanvasContainer" class="resizingCanvasContainer">
<canvas id="filledCanvas" class="resizingCanvas"></canvas>
</div>

From our basic geometry knowledge, we know the following about the area of the shapes:

$$
r := \text{the radius of the circle} = 1
\\
A_c := \text{area of the circle} = \pi * r ^ 2 = \pi
\\
A_s := \text{area of the square} = (2r) ^ 2 = 4
$$

Therefore, we know the following about the ratio of the sizes of the shapes.

$$
\frac{A_c}{A_s} = \frac{\pi}{4}
$$

This is all well and good, but we want to actually estimate the value of pi. To do this,
we use a monte carlo simulation.

For the simulation, we will iteratively place points somewhere randomly within the square.
We will record the number of points that are placed and the number of points that are
within the circle. By doing so, we would expect the ratio of the number of points that fall
within the circle to the total number of points to be equal to the ratio of the area of
the circle to the area of the square.

That sets up the following:

$$
C := \text{set of points within the circle}
\\
S := \text{set of points within the square}
\\
\frac{|C|}{|S|} \approx \frac{A_c}{A_s} = \frac{\pi}{4}
\\
\pi \approx \frac{|C| * 4}{|S|}
$$

Now all that's left for us is to run the simulation. Below you will see exactly that. The points
that fall within the circle are in green and the points outside of the circle are in red. As
we add more and more points, we expect our estimate of pi to improve.

<div id="piCanvasContainer" class="resizingCanvasContainer">
<canvas id="piCanvas" class="resizingCanvas"></canvas>
</div>

<div id="piValue"></div>
<div style="
overflow:hidden;
">
<div id="slowerButton" style="
background-color: #6272a4;
color: #000000;
padding: 16px;
display:inline-block;
font-size: 12px;
border: 2px solid #44475a;
cursor: pointer;
float:left;
user-select: none;
">Decrease Speed</div>
<div id="fasterButton" style="
background-color: #6272a4;
color: #000000;
padding: 16px;
display:inline-block;
font-size: 12px;
border: 2px solid #44475a;
cursor: pointer;
float:left;
user-select: none;
">Increase Speed</div>
<div id="resetButton" style="
background-color: #6272a4;
color: #000000;
padding: 16px;
display:inline-block;
font-size: 12px;
border: 2px solid #44475a;
cursor: pointer;
float:left;
user-select: none;
">Reset Animation</div>
</div>
<script src='./js/monteCarloPi.js'></script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
      }
    });
</script>
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>