#!/usr/bin/env bash

set -e

echo "Creating web store package: firefox"

DES=build/onTime.firefox

rm -rf $DES
mkdir -p $DES

echo "Copying firefox files"
bash utilities/copy-common-files.sh  $DES

echo "Copying firefox files"
cp -R ./platform/firefox/**   $DES/

if [ "$1" = all ]; then
    echo "Creating firefox plain package"
    pushd $(dirname $DES/) > /dev/null
    zip onTime.firefox.zip -qr $(basename $DES/)/*
    popd > /dev/null
elif [ -n "$1" ]; then
    echo "Version control"
    pushd $(dirname $DES/) > /dev/null
    zip onTime_"$1".firefox.zip -qr $(basename $DES/)/*
    popd > /dev/null
fi

echo "Package done."
