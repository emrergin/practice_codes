1. echo $SHELL

2. cd /tmp && mkdir missing

3. man touch

4. cd missing && touch semester

5. echo '#!/bin/sh'>semester
echo 'curl --head --silent https://missing.csail.mit.edu'>>semester

6. ./semester
ls -l

7. The file does not have executable permission by itself.

8. man chmod

9. chmod +x semester
./semester

10. date -r semester | sudo tee /home/last-modified.txt

11. cat /sys/class/power_supply/BAT0/capacity
