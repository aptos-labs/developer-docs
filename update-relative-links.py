# Configure this script by setting the path (to files to update links for) and search_directory below.
# Path can either be a file or a folder. If given a folder, it will fix all relative links for .mdx files within the folder.
# Search_directory determines where the link fixer will search for similarly named files. Set this to the highest-up folder in which all other files exist.
# This script only fixes links between .md and .mdx files. Image paths are not checked.
# Use `python3 update-relative-links.py` to run this script. 

import os
import re

def find_markdown_links(file_path):
    """
    Find all relative markdown links in the provided file.
    """
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Regex to find markdown links: [text](relative/path.md)
    links = re.findall(r'\[.*?\]\((.*?)\)', content)
    return links, content

def search_directory_for_file(directory, filename):
    """
    Recursively search the given directory and all subdirectories for a file with the given filename.
    """
    for root, _, files in os.walk(directory):
        if filename in files:
            return os.path.relpath(os.path.join(root, filename), start=directory)
    return None

def update_links_in_file(file_path, directory):
    """
    Update all relative markdown links in the file with their actual paths found in the directory.
    """
    links, content = find_markdown_links(file_path)
    updated_content = content
    warnings = False
    changed = False
    warning_messages = []

    for link in links:
        # Skip hardcoded links, image files, and links that start with '#'
        if link.startswith('http://') or link.startswith('https://') or re.search(r'\.(png|jpeg|jpg|gif|svg|bmp|webp)$', link) or link.startswith('#'):
            continue

        header = ''
        if '#' in link:
            filename, header = link.split('#', 1)
            filename = os.path.basename(filename)
            filename_mdx = filename if filename.endswith('.mdx') else f"{os.path.splitext(filename)[0]}.mdx"
        else:
            filename = os.path.basename(link)
            if filename == "index":
                filename_mdx = os.path.basename(os.path.dirname(link)) + ".mdx"
            else:
                filename_mdx = filename if filename.endswith('.mdx') else f"{os.path.splitext(filename)[0]}.mdx"

        actual_path_md = search_directory_for_file(directory, filename)
        actual_path_mdx = search_directory_for_file(directory, filename_mdx)

        actual_path = actual_path_md if actual_path_md else actual_path_mdx

        if actual_path:
            # Calculate the relative path from the file to the actual path
            relative_path = os.path.relpath(os.path.join(directory, actual_path), start=os.path.dirname(file_path))
            # Reattach the header if it exists
            updated_link = f"{relative_path}#{header}" if header else relative_path
            # Replace the relative link in the content
            if f']({link})' in updated_content:
                updated_content = updated_content.replace(f']({link})', f']({updated_link})')
                changed = True
        else:
            # Output file and line number if unable to update link
            line_number = content[:content.find(link)].count('\n') + 1
            warning_messages.append(f"❌ Warning: Neither '{filename}' nor '{filename_mdx}' found.\n   File: {file_path}#{line_number}")
            warnings = True

    with open(file_path, 'w') as file:
        file.write(updated_content)
    
    if not warnings:
        if changed:
            print(f"✅ Updated file: {file_path}\n")
        else:
            print(f"✅ Links are already up to date for: {file_path}\n")
    else:
        for message in warning_messages:
            print(message)
        print(f"Updated file with warnings: {file_path}")
        print(f"Searched this directory: {directory}\n")

def update_links_in_folder(folder_path, search_directory):
    """
    Recursively find all .mdx files in the folder and update their links.
    """
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                update_links_in_file(file_path, search_directory)

def main(path, search_directory):
    """
    Main function to update links in the specified file or folder.
    """
    if not os.path.exists(path):
        print(f"Error: Path '{path}' does not exist or is not a file/folder.")
        return
    
    if not os.path.exists(search_directory):
        print(f"Error: Directory '{search_directory}' does not exist.")
        return

    if os.path.isfile(path):
        update_links_in_file(path, search_directory)
    elif os.path.isdir(path):
        update_links_in_folder(path, search_directory)

path = "apps/nextra/pages/en/build/"
search_directory = "apps/nextra/pages/en"
main(path, search_directory)