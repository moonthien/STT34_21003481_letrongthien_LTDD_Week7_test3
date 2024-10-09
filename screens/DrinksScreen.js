import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function DrinksScreen({ route, navigation }) {
  const { shopId } = route.params;
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get(`https://666073d45425580055b3f87d.mockapi.io/Project/api/donuts/shops/${shopId}`)
      .then(response => {
        setDrinks(response.data.drinks);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load drinks. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [shopId]);

  const increaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const handleNavigateToOrder = () => {
    const selectedDrinks = drinks
      .filter(drink => quantities[drink.id] > 0)
      .map(drink => ({ ...drink, quantity: quantities[drink.id] }));

    navigation.navigate('Orders', { selectedDrinks });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Drinks</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollView} 
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        style={Platform.OS === 'web' ? { height: '100vh', overflowY: 'scroll' } : {}}
      >
        {drinks.map(item => (
          <View key={item.id} style={styles.drink}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.drinkName}>{item.name}</Text>
              <Text style={styles.drinkPrice}>${item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[item.id] || 0}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Go to Order" onPress={handleNavigateToOrder} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: StatusBar.currentHeight, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  backButton: {
    marginRight: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
    backgroundColor: 'pink',
    width: '100%',
  },
  drink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: 300,
  },
  image: { width: 100, height: 100, borderRadius: 8 },
  details: { marginLeft: 10 },
  drinkName: { fontSize: 18, fontWeight: 'bold' },
  drinkPrice: { fontSize: 16, color: 'gray' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red' },
});
