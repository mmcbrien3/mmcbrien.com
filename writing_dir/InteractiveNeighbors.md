---
layout: writing
---

## Interactive K Nearest Neighbors

The following shows how regions would be classified based on the training data provided. The nodes (training
data) can be moved by clicking on them and selecting a new space for them.

<div id="knnCanvasContainer" class="resizingCanvasContainer">
<canvas id="knnCanvas" class="resizingCanvas"></canvas>
</div>

<script src="./js/knn.js"></script>
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
      }
    });
</script>
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>