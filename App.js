import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const openCamera = () => {
    setShowCamera(true);
    requestCameraPermission();
  };

  if (showCamera) {
    if (hasPermission === null) {
      return <View />;
    }

    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Inverter Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          Bem-vindo ao meu aplicativo de câmera!
        </Text>
        <TouchableOpacity style={styles.introButton} onPress={openCamera}>
          <Image
            resizeMode="cover"
            source={require("./camera.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3b453",
  },
  introContainer: {
    alignItems: "center",
  },
  introText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  introButton: {
    marginBottom: 40,
  },
  buttonImage: {
    width: 130,
    height: 85,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: "#f3b453",
  },
});
