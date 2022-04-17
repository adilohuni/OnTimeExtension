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


echo "Package done."
