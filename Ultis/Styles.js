import { StyleSheet } from "react-native";
export const loginRegisterstyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  contentWrapper: {
    margin: "10%",
  },
  topContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: "#EDEFF3",
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CECACA",
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CECACA",
    backgroundColor: "#fff",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
    color: "green",
  },
  button: {
    backgroundColor: "#508D69",
    width: "100%",
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  buttonRgister: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
    overflow: "hidden",
    color: "black",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
});

export const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  createBtnWrapper: {
    position: "absolute",
    backgroundColor: "#508D69",
    bottom: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: 1111,
    marginBottom: 10,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 2,
  },
  createBtn: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
