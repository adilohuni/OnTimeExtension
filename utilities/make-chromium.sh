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


echo "Package done."
