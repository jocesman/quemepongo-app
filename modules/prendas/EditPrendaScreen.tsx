    // EditPrendaScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../navigation/types';
import { API_URL } from '@env';
import { AsyncStorageService } from '../../src/services/AsyncStorageService';
import addPrendaStyles from '../../styles/addPrenda.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditPrenda'>;

export function EditPrendaScreen({ route, navigation }: Props) {
  const { prenda } = route.params;
  const [nombre, setNombre] = useState(prenda.nombre);
  const [tipo, setTipo] = useState(prenda.tipo);
  const [abrigo, setAbrigo] = useState(prenda.abrigo);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorageService.getToken();

      const res = await fetch(`${API_URL}/prendas/${prenda.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, tipo, abrigo }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al actualizar');
      }

      Alert.alert('✅ Prenda actualizada');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo actualizar la prenda');
    }
  };

  return (
    <ScrollView contentContainerStyle={addPrendaStyles.container}>
      <Text style={addPrendaStyles.title}>Editar Prenda</Text>

      <Text style={addPrendaStyles.textLabel}>Nombre</Text>
      <TextInput
        style={addPrendaStyles.textInput}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de la prenda"
      />

      <Text style={addPrendaStyles.textLabel}>Tipo</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(value) => setTipo(value)}
        style={addPrendaStyles.picker}
      >
        <Picker.Item label="Superior" value="superior" />
        <Picker.Item label="Inferior" value="inferior" />
        <Picker.Item label="Accesorio" value="accesorio" />
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

      <TouchableOpacity style={addPrendaStyles.button} onPress={handleUpdate}>
        <Text style={addPrendaStyles.buttonText}>💾 Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
