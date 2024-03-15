#!/usr/bin/env bash
set -e

# TODO: Make this smarter so we don't have to update it every release
VERSION="0.5.1"
DEB_PACKAGE="https://github.com/rain-cafe/protontweaks/releases/download/v$VERSION/protontweaks.deb"
RPM_PACKAGE="https://github.com/rain-cafe/protontweaks/releases/download/v$VERSION/protontweaks.rpm"

managers=()

has_manager() {
  if [[ ! -z "$(type -p $1)" ]]; then
    managers+=($1);
  fi
}

sudo_inform() {
  local reason=$1
  local command="sudo ${@:2}"
  echo -e "\n\e[35mWe're attempting to run the following command with sudo...\n\e[0m"
  echo -e "  \e[36m$ $command\n\e[0m"
  echo -e "\e[37m\e[1mReason: $reason\n\e[0m"
  eval $command
}

echo_overwrite() {
  echo -en "\e[1A\e[K$@";
}

continue_prompt() {
  local prompt=${1:-"Would you like to continue?"}
  local response=""

  echo -n "$prompt (Y/n) "
  read response

  case $response in
    *) return 0;;
    N|n)
      echo "Installation canceled!"
      exit 0
    ;;
  esac
}

if [[ $(uname -a) =~ "NixOS" ]]; then
  managers+=("nixos")
else
  has_manager "nix"
fi

has_manager "apt-get"
has_manager "rpm"

if [ ${#managers[@]} -gt 1 ]; then
  echo "We've discovered the following package managers..."
  for i in "${!managers[@]}"; do
    echo "$(($i + 1))) ${managers[$i]}"
  done

  manager_index=""
  echo "which would you prefer to use? (1 - ${#managers[@]}) "
  while [ -z $manager_index ] || [ $manager_index -lt 1 ] || [ $manager_index -gt ${#managers[@]} ]; do
    echo_overwrite "which would you prefer to use? (1 - ${#managers[@]}) "
    read -e manager_index
  done

  manager=${managers[$manager_index - 1]};

  echo_overwrite "which would you prefer to use? (1 - ${#managers[@]}) $manager\n"
else
  manager=${managers[0]};

  echo "Auto detected '$manager' as the only option!"
fi

continue_prompt "Would you like to continue with the installation?"

case $manager in
  "nixos"|"nix")
    echo "Opening instructions, please read the 'NixOS Flake Example' and add it to your configuration!"
    xdg-open "https://github.com/rain-cafe/protontweaks?tab=readme-ov-file#installation"
  ;;
  "apt-get")
    echo "Downloading debian package..."
    curl -fsSL $DEB_PACKAGE -o /tmp/protontweaks.deb
    echo_overwrite "Downloading debian package... Complete!\n"
    sudo_inform "To install the protontweaks debian package with apt-get." apt-get install /tmp/protontweaks.deb
    rm -f /tmp/protontweaks.deb
    ;;
  "rpm")
    echo "Downloading rpm package..."
    curl -fsSL $RPM_PACKAGE -o /tmp/protontweaks.rpm
    echo_overwrite "Downloading rpm package... Complete!\n"
    sudo_inform "To install the protontweaks rpm package with rpm." rpm -i /tmp/protontweaks.rpm
    rm -f /tmp/protontweaks.rpm
esac

echo "Install completed successfully!"


