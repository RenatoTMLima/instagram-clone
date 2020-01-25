import React, {Component} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {View, StyleSheet, TouchableOpacity, Text, TextInput, Image} from 'react-native';

import api from '../services/api';

import camera from '../assets/camera.png';

export default class New extends Component{
   static navigationOptions = {
      headerTitle: 'Nova publicação'
   }

   state = {
      image: null,
      preview: null,
      author: '',
      place: '',
      description: '',
      hashtags: ''
   }

   handleSelectImage = async () => {
      const image = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         base64: true
      });  

      if(image.cancelled){
         console.log('Cancelou');
      }else{
         const preview = {
            uri: `data:image/jpeg;base64,${image.base64}`
         }

         this.setState({preview, image});
      }
   }

   handleCameraImage = async () => {
      const image = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         base64: true
      });  

      if(image.cancelled){
         console.log('Cancelou');
      }else{
         const preview = {
            uri: `data:image/jpeg;base64,${image.base64}`
         }

         this.setState({preview, image});
      }
   }

   handleSubmit = async () => {
      const data = new FormData();

      data.append('image', this.state.image);
      data.append('author', this.state.author);
      data.append('place', this.state.place);
      data.append('description', this.state.description);
      data.append('hashtags', this.state.hashtags);

      await api.post('/post', data);

      this.props.navigation.navigate('Feed');
   }

   async componentDidMount(){
      const cameraPermission = (await ImagePicker.getCameraPermissionsAsync()).granted;
      const cameraRollPermission = (await ImagePicker.getCameraRollPermissionsAsync()).granted;

      if(!cameraPermission){
         ImagePicker.requestCameraPermissionsAsync();
      }
      if(!cameraRollPermission){
         ImagePicker.requestCameraRollPermissionsAsync();
      }
   }

   render(){
      return (
      <View style={styles.container}>
         <View style={styles.cameraButtons}>
            <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
               <Text style={styles.selectButtonText}>Selecionar imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraOpen} onPress={this.handleCameraImage}>
               <Image style={styles.cameraIcon} source={camera} />
            </TouchableOpacity>
         </View>

         { this.state.preview && <Image style={styles.preview} source={this.state.preview} />}

         <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do autor"
            placeholderTextColor="#999"
            value={this.state.author}
            onChangeText={author => this.setState({author})}
         />

         <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Local da foto"
            placeholderTextColor="#999"
            value={this.state.place}
            onChangeText={place => this.setState({place})}
         />

         <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Descrição"
            placeholderTextColor="#999"
            value={this.state.description}
            onChangeText={description => this.setState({description})}
         />

         <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Hashtags"
            placeholderTextColor="#999"
            value={this.state.hashtags}
            onChangeText={hashtags => this.setState({hashtags})}
         />

         <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
            <Text style={styles.shareButtonText}>Compartilhar</Text>
         </TouchableOpacity>
      </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
    cameraButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
    cameraOpen:{
      flex: 1,
      alignSelf: 'center',
      maxWidth: 40
    },
    cameraIcon: {
      alignSelf: 'center'
    },
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
      
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
});