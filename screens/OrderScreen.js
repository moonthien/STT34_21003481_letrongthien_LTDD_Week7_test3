import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderScreen({ route, navigation }) {
  const { selectedDrinks } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = selectedDrinks.reduce((sum, drink) => sum + drink.price * drink.quantity, 0);
    setTotalPrice(total);
  }, [selectedDrinks]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePayment = () => {
    alert('Payment Successful');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Order</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        style={Platform.OS === 'web' ? { height: '100vh', overflowY: 'scroll' } : {}}
      >
        {selectedDrinks.map(item => (
          <View key={item.id} style={styles.order}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.drinkName}>{item.name}</Text>
              <Text style={styles.drinkPrice}>${item.price} x {item.quantity}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Pay Now" onPress={handlePayment} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
    backgroundColor: 'pink',
    width: '100%',
  },
  order: {
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
  details: { marginLeft: 10, flex: 1 },
  drinkName: { fontSize: 18, fontWeight: 'bold' },
  drinkPrice: { fontSize: 16, color: 'gray' },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  buttonContainer: {
    marginTop: 20,
  },
});
