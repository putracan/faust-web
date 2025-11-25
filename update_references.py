import os
import re

# Patterns to replace
replacements = [
    (r'\.\./style\.css', '../src/style.css'),
    (r'\.\./main\.js', '../src/main.js'),
    (r'\.\./load-right-sidebar\.js', '../src/load-right-sidebar.js'),
    (r'\.\./itbatam\.ico', '../src/itbatam.ico'),
    (r'\.\./logo-solusi-teknologi\.png', '../src/logo-solusi-teknologi.png'),
    (r'https://faust\.co\.id/logo-solusi-teknologi-BATAM\.png', 'https://faust.co.id/src/logo-solusi-teknologi-BATAM.png'),
]

# Get current directory - use absolute path
import sys
if len(sys.argv) > 1:
    base_dir = sys.argv[1]
else:
    base_dir = os.getcwd()

# Folders to process
folders = ['id', 'en']

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    if not os.path.exists(folder_path):
        print(f"Folder {folder} tidak ditemukan")
        continue

    html_files = [f for f in os.listdir(folder_path) if f.endswith('.html')]

    for html_file in html_files:
        file_path = os.path.join(folder_path, html_file)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Apply all replacements
            for pattern, replacement in replacements:
                content = re.sub(pattern, replacement, content)

            # Only write if content changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

print("Selesai!")
