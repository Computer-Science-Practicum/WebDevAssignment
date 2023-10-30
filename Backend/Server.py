import os
from flask import Flask, jsonify, request, render_template, send_from_directory
from utility import *
from db import MyDataBase
import cv2

app = Flask(__name__)
db = MyDataBase()

print("images",db.listImages())

if(db.listImages()==[]):
    # get the list of all images
    images = getListOfAllImages()
    # add all images to the database
    for image in images:
        print("trying to add image")
        db.addImage(image['image_url'], image['status'], image['face_coordinates'].x, image['face_coordinates'].y, image['face_coordinates'].width, image['face_coordinates'].height)

# Define a route to serve static images from the 'static' directory
@app.route("/static/<path:filename>")
def serve_static(filename):
    print("on static")
    return send_from_directory("./static", filename)


# Define an API route to get a list of all images with their URLs, status, and face coordinates
@app.route("/api/get_all_image_info")
def get_all_image_info():
    # Get the list of all images from the database
    images = db.listImages()

    # Create a list of dictionaries containing the image info
    image_info = []
    for image in images:
        image_info.append(
            {
                "id": image[0],
                "url": image[1],
                "status": image[2],
                "x": image[3],
                "y": image[4],
                "w": image[5],
                "h": image[6],
            }
        )

    return jsonify({"image_info": image_info})


# route to update the image status (send the image url and id in json format)
@app.route("/api/update_image_status", methods=["POST"])
def update_image_status():
    data = request.get_json()

    print(data)

    id = int(data["id"])
    status = data["status"]

    print(id, status)

    # Update the image status in the database
    db.updateImageStatus(status, id)

    return jsonify({"status": "Image status updated successfully"})

# # serve the index.html file
# @app.route("/")
# def index():
#     print("on /")
#     return render_template("index.html")

# Define a route to serve the entire "Frontend" folder
@app.route('/Frontend/<path:filename>')
def serve_frontend(filename):
    return send_from_directory('../FrontEnd', filename)


if __name__ == "__main__":
    # if table is empty then add images to the database
    app.run(debug=True)
    
        
    
    
