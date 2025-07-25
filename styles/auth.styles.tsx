import { StyleSheet, Dimensions } from "react-native";

const authStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Opcional, para que no toque bordes en pantallas chicas
    backgroundColor: "#fff", // Puedes cambiar o sacar si ya tienes color general
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222", // color un poco más oscuro para mejor contraste
    textAlign: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 80,
    resizeMode: "contain", // Para que la imagen no se distorsione
  },

  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonDisabled: {
    backgroundColor: "#A0A0A0", // gris para cuando esté inhabilitado
    shadowOpacity: 0, // quitar sombra para botón deshabilitado
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  buttonTextDisabled: {
    color: "#DDD", // texto más clarito cuando deshabilitado
  },

  textLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
    alignSelf: "flex-start", // para que quede alineado a la izquierda en inputs anchos
    width: Dimensions.get("window").width * 0.8,
  },

  textInput: {
    width: Dimensions.get("window").width * 0.8, // Ancho del 80% de la pantalla
    height: 50,
    borderRadius: 8,
    backgroundColor: "rgba(243, 245, 248, 1)", // Color claro de fondo para buen contraste
    alignSelf: "center", // Centrar horizontalmente en el padre
    marginBottom: 20,
    paddingHorizontal: 12, // Espacio interno horizontal para texto
    textAlignVertical: "center", // Centrado vertical (Android)
    borderWidth: 1,
    borderColor: "#ccc", // borde gris claro para delimitar el input
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // sombra en Android
    fontSize: 16,
    color: "#333", // color de texto gris oscuro para buena legibilidad
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -12, // negativo para acercar al input, pero menos agresivo
    marginBottom: 8,
    alignSelf: "flex-start",
    width: Dimensions.get("window").width * 0.8,
  },

  registerText: {
    color: "#007AFF",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default authStyles;
