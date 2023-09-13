import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container : {
    display: 'flex',
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#1F1E25',
    alignItems : 'center',
    marginBottom: 10,
  },
  name : {
    flex: 1,
    color: '#FFF',
    fontSize: 17,
    marginLeft: 16
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#E23C44',
    alignItems: 'center',
    justifyContent: 'center'
  },
})