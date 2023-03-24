#!/usr/bin/env bash
count=0;

while true
do
    count=$(( $count + 1 ));
    bash example.sh;
    output=$?;
    if [[ $output = 1 ]]; then
        break
    fi
done

echo $count;
