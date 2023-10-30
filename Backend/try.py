import os

def list_files_in_folder(folder_path):
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        print(f"The specified path '{folder_path}' is not a valid directory.")
        return

    print(f"Files in the folder '{folder_path}':")
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            print(file_path)

# Example usage:
folder_path = './Backend/static'  # Replace with the path to your folder
list_files_in_folder(folder_path)
