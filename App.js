import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [tipo, setTipo] = useState(Camera.Constants.Type.back);
  const [temPermissao, setTemPermissao] = useState(null);
  const [exibirCamera, setExibirCamera] = useState(false);

  const solicitarPermissaoCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setTemPermissao(status === "granted");
  };

  const alternarTipoCamera = () => {
    setTipo(
      tipo === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const abrirCamera = () => {
    setExibirCamera(true);
    solicitarPermissaoCamera();
  };

  const fecharCamera = () => {
    setExibirCamera(false);
  };

  if (exibirCamera) {
    if (temPermissao === null) {
      return <View />;
    }

    if (temPermissao === false) {
      return <Text>Sem acesso à câmera</Text>;
    }

    return (
      <View style={estilos.container}>
        <Camera style={estilos.camera} type={tipo}>
          <View style={estilos.botaoContainer}>
            <TouchableOpacity
              style={estilos.botao}
              onPress={alternarTipoCamera}
            >
              <Text style={estilos.textoBotao}>Inverter Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botao} onPress={fecharCamera}>
              <Text style={estilos.textoBotao}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.introContainer}>
        <Text style={estilos.introTexto}>
          Bem-vindo ao aplicativo de câmera!
        </Text>
        <TouchableOpacity style={estilos.introBotao} onPress={abrirCamera}>
          <Image source={require("./camera.png")} style={estilos.imagemBotao} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3b453",
  },
  introContainer: {
    alignItems: "center",
  },
  introTexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  introBotao: {
    marginBottom: 30,
  },
  imagemBotao: {
    width: 130,
    height: 85,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  botaoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  botao: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  textoBotao: {
    fontSize: 16,
    color: "#f3b453",
  },
});
