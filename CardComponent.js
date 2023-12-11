import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

//This creates a card component, similar to bootstrap's card, we pass in newItem which contains title, image, description, and a link and returns a card component that formats it.
const NewsCard = ({ newsItem }) => {
  const { title, imageUrl, description, link } = newsItem;

  const handleLinkPress = ()=>{
    Linking.openURL(newsItem.link).catch((err) => console.error('Error opening link:', err));
  }
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.link}>Read more</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 10,
      padding: 10,
      flexDirection: 'row',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 4,
      marginRight: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: '#555555',
      marginBottom: 5,
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });