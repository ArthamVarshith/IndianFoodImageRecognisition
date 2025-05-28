from flask import Flask,request,jsonify
from PIL import Image
import torch
from torchvision import transforms

app=Flask(__name__)

userdata=[]

model = torch.load('./Trained_model.pth')
model.eval()

# Define the image transformations to match your model's input
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Adjust size based on your model input size
    transforms.ToTensor(),
])


@app.route('/add_user', methods=['POST'])
def addUser():
    data=request.get_json()
    userdata.append(data)
    return jsonify({"Message":"User added successfully..."})


@app.route('/get_user',methods=["GET"])
def getUsers():
    return jsonify(userdata)


@app.route('/predict',methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({'error': "No file provided"})
    
    file=request.files['file']
    img=Image.open(file)

    img=transform(img).unsqueeze(0)

    # Make prediction using the model
    with torch.no_grad():
        output = model(img)
        _, predicted_class = torch.max(output, 1)

    # Return the predicted class
    return jsonify({"prediction": predicted_class.item()})

if "__main__"==__name__:
    app.run(debug=True,host='0.0.0.0')