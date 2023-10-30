import os
import cv2


class Face_coordinates:
    def __init__(self, x, y, width, height):
        self.x:int = x
        self.y:int = y
        self.width:int = width
        self.height:int= height

def getFaceCordinateFromImage(image_url: str) -> Face_coordinates:
    # Load the Haar Cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Read the image using the headless version of OpenCV
    image = cv2.imread(image_url, cv2.IMREAD_COLOR)
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    
    if len(faces) == 0:
        # No faces detected in the image
        return Face_coordinates(0, 0, 0, 0)
    
    # Extract the coordinates of the first detected face
    x, y, w, h = faces[0]
    
    face_cor = Face_coordinates(int(x), int(y), int(w), int(h))
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