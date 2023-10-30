import os
import cv2
from cv2 import data as cv2_data


class Face_coordinates:
    def __init__(self, x, y, width, height):
        self.x:int = x
        self.y:int = y
        self.width:int = width
        self.height:int= height

def getFaceCordinateFromImage(image_url:str)->Face_coordinates:
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    image = cv2.imread(image_url)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    print("faces",faces,image_url)
    face_cor = Face_coordinates(int(faces[0][0]), int(faces[0][1]), int(faces[0][2]), int(faces[0][3]))
    # return face_cor
    return face_cor
    
def getListOfAllImages():
    static_directory = './Backend/static'
    image_info_list = []
    for root, dirs, files in os.walk(static_directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                image_path = os.path.join(root, file)
                image_info = {
                    'image_url': f'/static/{file}',
                    'status': 'Unclassified',
                    'face_coordinates': getFaceCordinateFromImage(image_path)
                }
                image_info_list.append(image_info)
    return image_info_list