import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState (null)

  const openImagePickerAsync = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permission.granted === false){
      alert("Permission is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if(pickerResult.cancelled === true){
      return true;
    }
    setSelectedImage({localUri: pickerResult.uri})
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())){
      alert("Compartir no esta disponible")
      return
    }
    await Sharing.shareAsync(selectedImage.localUri)
  }

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Seleccione una Imagen</Text>
    <TouchableOpacity onPress={openImagePickerAsync}>
    <Image source={{
      uri: selectedImage !== null
        ? selectedImage.localUri
        :  "https://picsum.photos/200/200"}}
      style={styles.image}
      onPress={openImagePickerAsync}/>
    </TouchableOpacity>
    {selectedImage !== null ? <TouchableOpacity
      onPress={openShareDialog}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Compartir</Text>
    </TouchableOpacity> : <View />}
  </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#292929"},
  title: {fontSize: 30, color: "#fff", marginBottom: 20},
  image: {height: 200, width: 200, borderRadius: 100},
  button: {backgroundColor: "blue", padding: 7, marginTop: 10},
  buttonText: {fontSize: 20, color: "#fff"}
})

export default App;