import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(file_path):
    try:
        # Open the .docx file as a zip archive
        with zipfile.ZipFile(file_path) as docx:
            # Read the document.xml file
            xml_content = docx.read('word/document.xml')
            
            # Parse the XML content
            tree = ET.fromstring(xml_content)
            
            # The namespace dictionary
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # Extract all text from w:t elements
            text_elements = tree.findall('.//w:t', namespaces)
            text = ''.join([element.text for element in text_elements if element.text])
            
            return text
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = read_docx(sys.argv[1])
        with open("output.txt", "w", encoding="utf-8") as f:
            f.write(text)
    else:
        print("Usage: python read_docx.py <path_to_docx>")
