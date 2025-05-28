import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const HomeScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const classNames = {
    0: "burger",
    1: "butter_naan",
    2: "chai",
    3: "chapati",
    4: "chole_bhature",
    5: "dal_makhani",
    6: "dhokla",
    7: "fried_rice",
    8: "idli",
    9: "jalebi",
    10: "kaathi_rolls",
    11: "kadai_paneer",
    12: "kulfi",
    13: "masala_dosa",
  };


  // Function to take a picture using the camera
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera access is required to take a picture!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allow the user to crop/resize the image
      aspect: [4, 4], // This is the cropping aspect ratio
      quality: 1, // Set the quality of the image to 1 for best resolution
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri); // Set the image URI
    }
  };

  // Function to pick an image from the device
  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow the user to crop/resize the image
      aspect: [4, 4], // This is the cropping aspect ratio
      quality: 1, // Set the quality of the image to 1 for best resolution
    });

    if (!pickedImage.canceled) {
      console.log(pickedImage); // Log the result to debug if needed
      setImage(pickedImage.assets[0].uri); // Set the image URI
    } else {
      console.log("Image selection was cancelled.");
    }
  };

  const ClassifyImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : "image";

    let formData = new FormData();
    formData.append("file", {
      uri: localUri,
      name: filename,
      type: type,
    });

    try {
      const response = await axios.post(
        "http://192.168.137.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Get the predicted class index and map it to the class name
      const predictedClassIndex = response.data.prediction;
      const predictedClassName = classNames[predictedClassIndex];
      setPrediction(predictedClassName);

      navigation.navigate("ResultScreen",{prediction : predictedClassName});
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageBox}>
        <Image
          style={styles.UploadedImage}
          source={
            image ? { uri: image } : require("../assets/Logo.png") // Placeholder image
          }
        />
      </View>

      <Text style={styles.text}>Upload the Image to know your dish.</Text>

      <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
        <Text style={styles.pickImageButtonText}>PickImage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
        <Text style={styles.takePictureButtonText}>TakeImage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classifyImageButton} onPress={ClassifyImage}>
        <Text style={styles.classifyImageButtonText}>Classify the image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFCD7",
    flex: 1,
  },
  UploadedImage: {
    alignSelf: "center",
    width: 295,
    height: 295,
    borderRadius: 30,
    marginTop: -0.5
  },
  ImageBox: {
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 30,
    width: 300,
    height: 300,
    marginTop: 50,
  },
  text: {
    color: "#DC143C",
    fontFamily: "MonRegular",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 15,
  },
  pickImageButton: {
    backgroundColor: "#DC143C",
    alignSelf: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    marginTop: 40,
  },
  pickImageButtonText: {
    color: "#F5F5F5",
    fontFamily: "MonRegular",
    fontSize: 18,
  },
  takePictureButton: {
    backgroundColor: "#DC143C",
    alignSelf: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    marginTop: 30,
  },
  takePictureButtonText: {
    color: "#F5F5F5",
    fontFamily: "MonRegular",
    fontSize: 18,
  },
  classifyImageButton: {
    backgroundColor: "#FF9933",
    alignSelf: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    marginTop: 30,
  },
  classifyImageButtonText: {
    color: "#F5F5F5",
    fontFamily: "MonRegular",
    fontSize: 18,
  },
});
