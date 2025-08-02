//addPrendaScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, Alert, Platform, ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { API_URL } from '@env';
import { AsyncStorageService } from '../../src/services/AsyncStorageService';
import addPrendaStyles from '../../styles/addPrenda.styles'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPrenda'>;

export function AddPrendaScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<'superior' | 'inferior' | 'accesorio'>('superior');
  const [clima, setClima] = useState<'frio' | 'calor' | 'templado' | 'lluvia'>('templado');
  const [abrigo, setAbrigo] = useState<'alto' | 'medio' | 'bajo'>('medio');
  const [image, setImage] = useState<any>(null);

  const seleccionarImagen = async () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
        }
      }
    );
  };

  const handleSubmit = async () => {
    if (!nombre || !image) {
      Alert.alert('Faltan datos', 'Por favor completa todos los campos y selecciona una imagen.');
      return;
    }

    try {
      const token = await AsyncStorageService.getToken();

      // 1. Crear prenda
      const prendaRes = await fetch(`${API_URL}/prendas`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, tipo, abrigo, clima }),
      });

      const prendaData = await prendaRes.json();

      if (!prendaRes.ok) {
        throw new Error(prendaData.message || 'Error creando prenda');
      }

      // 2. Subir imagen
      const form = new FormData();
      form.append('file', {
        uri: image.uri,
        name: image.fileName || 'prenda.jpg',
        type: image.type || 'image/jpeg',
      });

      const imgRes = await fetch(`${API_URL}/prendas/${prendaData.id}/images`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      });

      if (!imgRes.ok) {
        const errorData = await imgRes.json();
        const mensaje = errorData.message || 'Error subiendo imagen';
        throw new Error(mensaje);
      }


      Alert.alert('Éxito', 'Prenda registrada correctamente');
      navigation.goBack();

    } catch (error: any) {
      console.error('Error al guardar prenda:', error);

      const mensajeError = error?.message || 'Ocurrió un error inesperado al guardar la prenda';
      Alert.alert('Error al guardar', mensajeError.toString());
    }

  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={addPrendaStyles.title}>Agregar Prenda</Text>

      <Text style={addPrendaStyles.textLabel}>Nombre</Text>
      <TextInput
        style={addPrendaStyles.textInput}
        placeholder="Ej: Camisa de algodón"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#666"
      />

      <Text style={addPrendaStyles.textLabel}>Tipo de prenda</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={{ color: '#000', marginBottom: 12 }}
      >
        <Picker.Item label="Superior" value="superior" />
        <Picker.Item label="Inferior" value="inferior" />
        <Picker.Item label="Accesorio" value="accesorio" />
      </Picker>

      <Text style={addPrendaStyles.textLabel}>Clima</Text>
      <Picker
        selectedValue={clima}
        onValueChange={(itemValue) => setClima(itemValue)}
        style={{ color: '#000', marginBottom: 12 }}
      >
        <Picker.Item label="Frío ❄️" value="frio" />
        <Picker.Item label="Calor ☀️" value="calor" />
        <Picker.Item label="Templado 🌤" value="templado" />
        <Picker.Item label="Lluvia 🌧" value="lluvia" />
      </Picker>

      <Text style={addPrendaStyles.textLabel}>Nivel de abrigo</Text>
<Picker
  selectedValue={abrigo}
  onValueChange={(value) => setAbrigo(value)}
  style={addPrendaStyles.picker}
>
  <Picker.Item label="Alto 🧥" value="alto" />
  <Picker.Item label="Medio 🧶" value="medio" />
  <Picker.Item label="Bajo 👕" value="bajo" />
</Picker>


      <TouchableOpacity style={addPrendaStyles.button} onPress={seleccionarImagen}>
        <Text style={addPrendaStyles.buttonText}>📷 Seleccionar imagen</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: '100%', height: 200, marginVertical: 12, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={addPrendaStyles.button} onPress={handleSubmit}>
        <Text style={addPrendaStyles.buttonText}>💾 Guardar Prenda</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
