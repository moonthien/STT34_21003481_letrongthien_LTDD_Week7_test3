import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function ShopsScreen({ navigation }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('https://666073d45425580055b3f87d.mockapi.io/Project/api/donuts/shops')
      .then(response => setShops(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shops Near Me</Text>
      </View>

      <FlatList
        data={shops}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Drinks', { shopId: item.id })}>
            <View style={styles.shop}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopStatus}>{item.status}</Text>
                <Text style={styles.shopTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        contentContainerStyle={Platform.OS === 'web' ? { paddingBottom: 20, height: '100vh', overflowY: 'scroll' } : { paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    paddingTop: StatusBar.currentHeight 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  backButton: { 
    marginRight: 10 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  shop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 8 
  },
  details: { 
    marginLeft: 10 
  },
  shopName: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  shopStatus: { 
    fontSize: 14, 
    color: 'green' 
  },
  shopTime: { 
    fontSize: 14, 
    color: 'gray' 
  },
});
