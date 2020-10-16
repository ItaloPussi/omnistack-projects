import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native'
import api from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import {useNavigation} from '@react-navigation/native'

d
interface OrphanageDetailsRouteParams{
  position:{
    latitude:number,
    longitude:number,
  }
}

export default function OrphanageData() {
  const navigation = useNavigation()

  const route = useRoute()

  const {position} = route.params as OrphanageDetailsRouteParams

  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [instructions, setInstructions] = useState("")
  const [opening_hours, setOpening_hours] = useState("")
  const [open_on_weekends, setOpen_on_weekends] = useState(false)
  const [images, setImages] = useState<string[]>([])

  async function handleSubmitForm(){
    const {latitude, longitude} = position

    const data = new FormData()

    data.append("name", name)
    data.append("about", about)
    data.append("instructions", instructions)
    data.append("opening_hours", opening_hours)
    data.append("open_on_weekends", String(open_on_weekends))
    data.append("whatsapp", String(whatsapp))
    data.append("latitude", String(latitude))
    data.append("longitude", String(longitude))

    images.forEach((image,index)=>{
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any)
    })

    try{
      await api.post("orphanages", data)
    }catch{
      alert("Ops, ocorreu um erro. Tente novamente em alguns instantes")
    }
    navigation.navigate("OrphanagesMap")
  }

  async function handleSelectImages(){
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync()

    if(status !== "granted"){
      alert("Eita, precisamos de acesso as suas fotos...")
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if(result.cancelled){
      return 
    }

    const {uri} = result

    setImages([...images,uri])

  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label} >Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={about}
        onChangeText={setAbout}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <Text style={styles.label}>Fotos</Text>
      
      <View style={styles.uploadedImagesContainer}>
        {  
          images.map((uri,index)=>{
              return (
                <Image
                  key={index}
                  source={{uri}}
                  style={styles.uploadedImage}
                />
              )
          })
        }

      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpening_hours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpen_on_weekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmitForm}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer:{
    flexDirection: "row"
  },

  uploadedImage:{
    width:64,
    height:64,
    borderRadius:20,
    marginBottom:32,
    marginRight:8
  },


  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})