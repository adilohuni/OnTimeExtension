#!/usr/bin/env bash

set -e

echo "Creating web store package: Chromium"

DES=build/onTime.chromium

rm -rf $DES
mkdir -p $DES

echo "Copying common files"
bash utilities/copy-common-files.sh  $DES

echo "Copying chromium files"
cp -R ./platform/chromium/**   $DES/

if [ "$1" = all ]; then
    echo "Creating Chromium plain package"
    pushd $(dirname $DES/) > /dev/null
    zip onTime.chromium.zip -qr $(basename $DES/)/*
    popd > /dev/null
elif [ -n "$1" ]; then
    echo "Version control"
    pushd $(dirname $DES/) > /dev/null
    zip onTime_"$1".chromium.zip -qr $(basename $DES/)/*
    popd > /dev/null
fi

echo "Package done."
