marco () {
    tosave=$(pwd)
    cd /home/zulmet/nonwebdev
    mkdir -p marco
    cd ./marco
    echo "$tosave">lastmarcoed.txt
    cd $tosave
}

polo() {
    cd /home/zulmet/nonwebdev/marco
    prepwd=`cat lastmarcoed.txt`
    cd $prepwd
}