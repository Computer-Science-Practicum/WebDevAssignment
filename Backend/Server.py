import os
from flask import Flask, jsonify, request
import cv2

app = Flask(__name__)

# Define a route to serve static images from the 'static' directory
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

# Define an API route to get a list of all images with their URLs, status, and face coordinates
@app.route('/api/get_all_image_info')
def get_all_image_info():
    static_directory = './Backend/static'
    image_info_list = []

    # Perform face detection (you may need to adjust this part)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    for root, dirs, files in os.walk(static_directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                image_path = os.path.join(root, file)

                # Perform face detection
                image = cv2.imread(image_path)
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

                # face_cor=[]
                # for (x,y,w,h) in faces:
                #     face_cor.append(f"")

                # Generate response data for each image
                image_info = {
                    'image_url': f'/static/{file}',
                    'status': 'Image and face coordinates retrieved successfully',
                    'face_coordinates': [{'x': str(x), 'y': str(y), 'width': str(w), 'height': str(h)} for (x, y, w, h) in faces]
                }

                image_info_list.append(image_info)

    return jsonify({'images': image_info_list})

if __name__ == '__main__':
    app.run(debug=True)
