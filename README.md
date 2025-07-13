# 🍛 Indian Food Image Recognizer

A deep learning-based web application that classifies 17 types of Indian food items from images using a pre-trained ResNet50 model. Built with PyTorch and Streamlit, this app helps recognize food categories instantly from photos — useful for dietary tracking, restaurant menu automation, and food ordering platforms.

---

## 🧠 Model

I used a **pretrained ResNet50** Convolutional Neural Network from `torchvision.models`, fine-tuned on a custom dataset of Indian food images containing 17 classes. The model has been trained to achieve high accuracy in recognizing diverse dishes.

---

## 📂 Dataset

- **17 Indian food categories**, including:
  - Biryani, Butter Chicken, Dosa, Idli, Gulab Jamun, Samosa, etc.
- Dataset was curated or obtained from Kaggle website
- Images were resized and normalized before being fed into the model.

---

## 🔧 Tech Stack

- **Backend**: PyTorch, Torchvision
- **Frontend/Web App**: Streamlit
- **Languages**: Python
- **Others**: NumPy, Matplotlib, PIL

---

## 🚀 Features

- Upload or drag-and-drop an image to get instant predictions.
- Confidence score for each prediction.
- User-friendly interface via Streamlit.
- Lightweight and fast — ideal for personal or educational use.

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/indian-food-recognizer.git
cd indian-food-recognizer
# Install dependencies
pip install -r requirements.txt

# Run the Streamlit app
streamlit run app.py
