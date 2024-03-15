#!/usr/bin/env sh

echo "Sorry this isn't implemented yet!"

echo -n "We have binaries and packages available on github, would you like us to bring you there? (y/N): "
read answer

echo $answer

case $answer in
  Y|y) xdg-open "https://github.com/rain-cafe/protontweaks/releases/latest"
    ;;
esac
