#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re
import glob

# Patterns to replace
replacements = [
    (r'\.\./style\.css', '../src/style.css'),
    (r'\.\./main\.js', '../src/main.js'),
    (r'\.\./load-right-sidebar\.js', '../src/load-right-sidebar.js'),
    (r'\.\./itbatam\.ico', '../src/itbatam.ico'),
    (r'src="\.\./logo-solusi-teknologi\.png"', 'src="../src/logo-solusi-teknologi.png"'),
    (r'https://faust\.co\.id/logo-solusi-teknologi-BATAM\.png', 'https://faust.co.id/src/logo-solusi-teknologi-BATAM.png'),
]

# Process all HTML files in id and en folders
for folder in ['id', 'en']:
    pattern = os.path.join(folder, '*.html')
    files = glob.glob(pattern)

    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Apply all replacements
            for pattern_re, replacement in replacements:
                content = re.sub(pattern_re, replacement, content)

            # Only write if content changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

print("Selesai!")
