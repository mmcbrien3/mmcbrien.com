#!/bin/bash

rm -rf _site/

bundle exec jekyll build

# TODO: How do I force this to be the same as the buildspec.yml without installing docker???
find -name "*.html" -exec sed -i 's/Hosted on GitHub Pages &mdash; Theme by <a href=\"https:\/\/github.com\/orderedlist\">orderedlist<\/a>/Hosted on S3. <a href=\"https:\/\/github.com\/orderedlist\/minimal">Theme<\/a>/g' {} \;

http-server _site/
