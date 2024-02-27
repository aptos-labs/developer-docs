#!/bin/sh

# Go to the parent directory.
cd "$(dirname "$0")"
cd ..

build_dict_path="/tmp/additional_dict.rws"
rewritten_file_path="/tmp/rewritten_file.md"

which aspell || { echo "ERROR: Please install 'aspell'"; exit 1; }

# Build additional word dictionary.
echo "Building additional word dictionary..."
aspell --encoding=utf-8 --lang=en create master $build_dict_path < scripts/additional_dict.txt
echo "Built additional word dictionary"
echo

everything_spelled_correctly=1

# Check the spelling of all md files, printing misspelled words if found.
for file in `find docs -type f -name "*.md"`
do
    # Rewrite the file to remove inline and multiline code blocks.
    # We also remove HTML tags.
    cat $file | sed '/```/,//d' | sed '/`/,//d' | sed 's/<[^>]*>/\n/g' > $rewritten_file_path
    misspelled_words=`aspell --lang=en --encoding=utf-8 list --add-extra-dicts=$build_dict_path < $rewritten_file_path`
    if [ ! -z "$misspelled_words" ]
    then
        echo "Misspelled words in $file:"
        echo "$misspelled_words"
        echo
        everything_spelled_correctly=0
    fi
done

# If any word was misspelled, exit with an error.
if [ $everything_spelled_correctly -eq 0 ]
then
    echo "Misspelled words were found 😭"
    echo "If the typo is not actually a typo, add the word to scripts/additional_dict.txt"
    echo
    exit 1
else
    echo "No misspelled words were found 🥳"
    echo
    exit 0
fi
