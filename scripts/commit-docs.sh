#!bin/bash

## https://www.conventionalcommits.org/en/v1.0.0/#specification

optsFunction() {
   echo ""
   echo "Usage: $0 -d description of docs change for commit"
   echo "-d \"Description of docs change\""
   exit 1 # Exit script after printing help
}

# Read the parameter and set the variables if everything it's fine
while getopts "d:" opt
do
   case "$opt" in
      d ) DESCRIPTION="$OPTARG" ;; # Description of docs change to commit
      ? ) optsFunction ;; # Print optsFunction in case parameter is not valid
   esac
done

# Print optsFunction in case DESCRIPTION are empty
if [ -z "$DESCRIPTION" ]
then
   echo "You cannot left the DESCRIPTION empty";
   optsFunction
fi

# Begin script in case all parameters are correct
echo "print all files on tree"
git status

echo "adding all files"
git add -A

echo "adding messages to commit"
git commit -m "docs: $DESCRIPTION" 

echo "push to github"
git push
