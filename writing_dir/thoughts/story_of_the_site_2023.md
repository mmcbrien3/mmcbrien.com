---
layout: thoughts_entry 
---

![](/assets/howItsMade.png)

#### April 24th, 2023

### Overview
This post is a brief history of how the website took shape and reached
it's current form. It doesn't go into deep technical details and isn't a
tutorial on how to set everything up. Maybe I'll write that tutorial one
day.

### Origins 

When I created this website, I had three goals for it:
1. Create a showcase for some of my work
2. Have an easy place to write and publish blogs
3. Learn about web development

Goals (1) and (2) are quite easy to achieve with any website
building platform like squarespace. However, using a common
platform like this would mean that I wouldn't achieve goal (3).

To that end, I started learning about easy ways to set up
static websites with easy hosting. This is when I learned about
[GitHub pages](https://docs.github.com/en/pages), which is a service
provided by GitHub that allows you to easily publish websites
from your repositories. GitHub recommends using [Jekyll](https://jekyllrb.com),
which is a ruby-based static-site builder. This all fit the bill!

With this discovery and a bit of effort, the first version of the
website was born: `mmcbrien3.github.io`.

### Improving on the Original

The first version of the site was great. One of the main benefits of using
jekyll is that you can write pages very quickly in markdown, and jekyll
will convert this to HTML for you. Adding paragraph breaks, **bolds**, and
images is very straightforward (at least for me since I had experience with
markdown). Writing and publishing to the web was very straightforward.

An early issue I had with my site was that I didn't like the color scheme. To
fix this, I investigated how the Jekyll theme I was using set up everything. This
is when I first started tinkering with CSS for the first time and I was able
to update the site to use the [dracula theme](https://draculatheme.com).

### The Release Process

The GitHub pages site was great, but I wanted to take more control on the release process,
and I wanted to start using a custom domain [mmcbrien.com](mmcbrien.com). To this end,
I migrated the site to use S3 as the static site host. A code pipeline on AWS pulls
the latest commit from GitHub automatically, runs a simple build command, and publishes
the artifacts to S3. With this pipeline, I was able to create custom build and release commands for my site. 
These custom commands meant that I could now build any static site I wanted with any dependency
and was no longer constricted by the GitHub pages dependencies and workflow.

At the same time, I was able to migrate to a new custom domain using 
[Route 53 and CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html).

For the first time, I was completely in control of how my website was written, built,
released, and published!

In the future, I could extend the release process to include testing to validate the build
and CloudFront actions to expedite the release.

### NPM

The next improvement came when I realized how poor my dependency management was. I usually make changes on
my laptop, but I tried making a change on my desktop. I realized that getting all the dependencies installed
correctly to perform the build was more challenging than it should be. I had been using Ruby and
*global* node packages to get everything to work.

I undertook the work to define what dependencies one would need before starting (currently Ruby and Node), and
then writing a one-liner using npm that could do the rest. I added a few more nice to haves, including npm
clean, build, and serve commands. These commands are by the code pipeline in the release process.
Finally, the site was in a state where building and releasing was sensible and tight.

### Typescript

At this point, the site was in quite a good state. However, with some of my blogs, I was interested
in adding some relatively beefy javascript to support the text. This was achievable with the setup,
but writing the javascript was quite painful for me since I am more of a strongly-typed kind of engineer.

To support this, I migrated to using [typescript](https://www.typescriptlang.org/) with [babel](https://babeljs.io/) 
as the transpiler. Typescript allows me to write much more readable code and babel will convert that into
browser-compatible javascript.

It is quite remarkable to me that I can write code in typescript and edit text in markdown and all of this
can be automatically converted into a website automatically. This is the type of abstraction that makes
software engineering so thrilling. At this point, I barely have to think about the vast array of underlying
technologies to publish my website.