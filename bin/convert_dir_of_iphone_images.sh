#!/bin/bash

set -e

DIRECTORY=$1

cd $DIRECTORY

heic_count=`ls -1 *.flac 2>/dev/null | wc -l`

if [ $heic_count -eq "0" ]; then
    echo "There are no .heic files in the directory!" && exit 1
fi

echo "==========================="
echo "Converting from heic to jpg"
echo "==========================="
ls | sed 's/\.heic//' | xargs -I {} sh -c 'magick convert {}.heic {}.jpg'

echo "==================="
echo "Deleting heic files"
echo "==================="
rm -rf *.heic

echo "==============="
echo "Resizing images"
echo "==============="
ls | xargs -I {} sh -c 'convert -resize 25% {} {}'