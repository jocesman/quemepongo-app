// ManagePrendasScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { API_URL } from '@env';
import { AsyncStorageService } from '../../src/services/AsyncStorageService';
import mainStyles from '../../styles/main.styles';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


type Props = NativeStackScreenProps<RootStackParamList, 'ManagePrendas'>;

export function ManagePrendasScreen({ navigation }: Props) {
  const [prendas, setPrendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrendas = async () => {
    try {
      const token = await AsyncStorageService.getToken();
      const res = await fetch(`${API_URL}/prendas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error cargando prendas');
      setPrendas(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudieron cargar tus prendas.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('¿Eliminar?', '¿Estás seguro de eliminar esta prenda?', [
        { text: 'Cancelar', style: 'cancel' },
        {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
            try {
            const token = await AsyncStorageService.getToken();
            const res = await fetch(`${API_URL}/prendas/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400 && data.message.includes('en uso')) {
                Alert.alert('No se puede eliminar', data.message);
                } else {
                throw new Error(data.message || 'Error desconocido al eliminar');
                }
                return;
            }

            Alert.alert('✅ Prenda eliminada');
            fetchPrendas();
            } catch (err) {
            console.error(err);
            Alert.alert('Error', 'No se pudo eliminar la prenda.');
            }
        },
        },
    ]);
    };

 useFocusEffect(
  useCallback(() => {
    fetchPrendas();
  }, [])
);

  const renderItem = ({ item }: { item: any }) => (
    <View style={mainStyles.card}>
      {item.imagenes?.[0]?.url && (
        <Image
          source={{ uri: item.imagenes[0].url }}
          style={{ width: '100%', height: 120, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}
      <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>Abrigo: {item.abrigo}</Text>
      <TouchableOpacity
        style={[mainStyles.button, { marginTop: 8 }]}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={mainStyles.buttonText}>🗑 Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[mainStyles.button, { marginTop: 8, backgroundColor: '#28a745' }]}
        onPress={() => navigation.navigate('EditPrenda', { prenda: item })}
        >
        <Text style={mainStyles.buttonText}>✏️ Editar</Text>
       </TouchableOpacity>
    </View>
  );

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.title}>Mis Prendas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={prendas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      
    </View>
  );
}
