import streamlit as st
import torch
from torchvision import transforms
from PIL import Image
# Define transformations for preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Load the entire model (not just the state_dict)
TrainedModel = torch.load('./Trained_model.pth', map_location=torch.device('cpu'))
TrainedModel.eval()  # Set the model to evaluation mode

classes = ["burger", "butter_naan", "chai", "chapati",
           "chole_bhature", "dal_makhani", "dhokla",
           "fried_rice", "idli", "jalebi", "kaathi_rolls",
           "kadai_paneer", "kulfi", "masala_dosa"]

Description={
    "burger": "A sandwich consisting of a cooked patty of ground meat, usually beef, placed inside a sliced bread roll or bun. Often garnished with lettuce, tomato, onion, pickles, and various condiments.",
    "butter_naan": "A type of leavened, oven-baked flatbread brushed with butter, common in Indian cuisine. It is soft and fluffy and typically served with curries.",
    "chai": "A popular Indian beverage made by brewing black tea with a mix of aromatic spices and herbs. Often served with milk and sugar.",
    "chapati": "An unleavened flatbread made from whole wheat flour, cooked on a griddle. It is a staple in Indian households and typically served with vegetables or meat dishes.",
    "chole_bhature": "A combination of spicy chickpeas (chole) and deep-fried bread (bhature). It is a popular dish from North India, often enjoyed as a breakfast or lunch item.",
    "dal_makhani": "A creamy and rich lentil dish made with black lentils, butter, and cream. It is a staple in Punjabi cuisine and usually served with naan or rice.",
    "dhokla": "A savory steamed cake made from fermented rice and chickpea batter. It is a popular snack from the state of Gujarat, often served with chutney.",
    "fried_rice": "A dish of cooked rice that has been stir-fried in a wok and is usually mixed with other ingredients such as eggs, vegetables, seafood, or meat. Common in many Asian cuisines.",
    "idli": "A type of savory rice cake, popular as breakfast food in South India. Made from a fermented batter of rice and black lentils, it is steamed and typically served with sambar and chutneys.",
    "jalebi": " A sweet snack made by deep-frying a wheat flour batter in pretzel or circular shapes, which are then soaked in sugar syrup. It is crispy on the outside and juicy on the inside.",
    "kaathi_rolls": "A type of Indian street food where spicy grilled meat or vegetables are wrapped in a paratha (a type of flatbread). Often garnished with onions, chutneys, and spices.",
    "kadai_paneer": "A spicy and flavorful North Indian dish made with paneer (Indian cottage cheese) cooked in a kadai (wok) with tomatoes, onions, and bell peppers.",
    "kulfi": "A traditional Indian ice cream made with slowly simmered whole milk, sugar, and flavorings such as cardamom, saffron, and pistachios. It is denser and creamier than regular ice cream.",
    "masala_dosa": " A popular South Indian dish consisting of a fermented crepe made from rice batter and black lentils, filled with a spiced potato filling. Served with sambar and chutneys."
}

Nutrition={
    "burger": {
        "Calories": "250 kcal",
        "Protein": "12 g",
        "Fat": "13 g",
        "Carbohydrates": "23 g",
        "Fiber": "1 g"
    },
    "butter_naan": {
        "Calories": "310 kcal",
        "Protein": "9 g",
        "Fat": "10 g",
        "Carbohydrates": "45 g",
        "Fiber": "2 g"
    },
    "chai": {
        "Calories": "50 kcal",
        "Protein": "1 g",
        "Fat": "2 g",
        "Carbohydrates": "8 g",
        "Fiber": "0 g"
    },
    "chapati": {
        "Calories": "150 kcal",
        "Protein": "5 g",
        "Fat": "3 g",
        "Carbohydrates": "25 g",
        "Fiber": "4 g"
    },
    "chole_bhature": {
        "Calories": "300 kcal",
        "Protein": "10 g",
        "Fat": "15 g",
        "Carbohydrates": "35 g",
        "Fiber": "5 g"
    },
    "dal_makhani": {
        "Calories": "130 kcal",
        "Protein": "5 g",
        "Fat": "6 g",
        "Carbohydrates": "15 g",
        "Fiber": "4 g"
    },
    "dhokla": {
        "Calories": "160 kcal",
        "Protein": "7 g",
        "Fat": "4 g",
        "Carbohydrates": "25 g",
        "Fiber": "1 g"
    },
    "fried_rice": {
        "Calories": "150 kcal",
        "Protein": "3 g",
        "Fat": "4 g",
        "Carbohydrates": "25 g",
        "Fiber": "1 g"
    },
    "idli": {
        "Calories": "30 kcal",
        "Protein": "1 g",
        "Fat": "0 g",
        "Carbohydrates": "6 g",
        "Fiber": "1 g"
    },
    "jalebi": {
        "Calories": "200 kcal",
        "Protein": "1 g",
        "Fat": "10 g",
        "Carbohydrates": "25 g",
        "Fiber": "0 g"
    },
    "kaathi_rolls": {
        "Calories": "220 kcal",
        "Protein": "10 g",
        "Fat": "10 g",
        "Carbohydrates": "20 g",
        "Fiber": "2 g"
    },
    "kadai_paneer": {
        "Calories": "250 kcal",
        "Protein": "10 g",
        "Fat": "18 g",
        "Carbohydrates": "12 g",
        "Fiber": "2 g"
    },
    "kulfi": {
        "Calories": "160 kcal",
        "Protein": "4 g",
        "Fat": "8 g",
        "Carbohydrates": "20 g",
        "Fiber": "0 g"
    },
    "masala_dosa": {
        "Calories": "150 kcal",
        "Protein": "3 g",
        "Fat": "6 g",
        "Carbohydrates": "22 g",
        "Fiber": "2 g"
    }
}

# Define function to make predictions
def predict(image):
    # Preprocess the image
    image_tensor = transform(image).unsqueeze(0)
    
    # Make prediction
    with torch.no_grad():
        outputs = TrainedModel(image_tensor)
        _, predicted = torch.max(outputs, 1)
    
    # Get the class label
    return classes[predicted.item()]

# Streamlit UI
st.title("Food Image Classifier🍛🍚")
st.write("Upload an image of food to recognise it.")

uploaded_file = st.file_uploader("Upload an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")  # Ensure image is in RGB format
    st.image(image, caption="Uploaded Image.", use_column_width=True)

    # Display a loading bar while the prediction is being made
    progress_text = st.empty()
    progress_bar = st.progress(0)

    for percent_complete in range(100):
        progress_text.text(f"Classifying... {percent_complete + 1}%")
        progress_bar.progress(percent_complete + 1)

    # Perform prediction
    label = predict(image)
    
    # Clear progress bar
    progress_text.text("")
    progress_bar.empty()
    
    # Display the prediction result
    st.subheader("Predicted Food item name")
    st.write(label.upper())

    # Display additional information
    st.subheader("Description")
    st.write(Description.get(label,"No description available"))

    # Display nutritional information
    st.subheader("Nutritional Information(per 100g)")
    for key, value in Nutrition[label].items():
        st.write(f"- **{key}**: {value}")