import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, ScrollView, StatusBar, Platform } from 'react-native';
import axios from 'axios';

export default function WelcomeScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://666073d45425580055b3f87d.mockapi.io/Project/api/donuts/shops');
        const imageUrls = response.data.map(shop => shop.image);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
      <ScrollView 
        contentContainerStyle={styles.scrollView} 
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        style={Platform.OS === 'web' ? { height: '100vh', overflowY: 'scroll' } : {}}
      >
        <Text style={styles.title}>Welcome to Cafe World</Text>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Get Started" onPress={() => navigation.navigate('Shops')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: StatusBar.currentHeight },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'pink',
    width: '100%',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 300, height: 150, marginVertical: 10, resizeMode: 'cover' },
  buttonContainer: { marginVertical: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red' },
});
