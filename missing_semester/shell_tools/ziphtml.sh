#!/usr/bin/env bash
find . -name "*.html"  | xargs -d '\n' tar cvf html.tar;