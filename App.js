/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  View,
} from 'react-native';

import Pagination from './src/Pagination';
import Post from './src/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('something went wrong while requesting posts');
      })
      .then(res => setPosts(res))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
      console.log('jasdjkl')
  }, []);

  if (isLoading) return <ActivityIndicator />
  if (error) return <Text>{error}</Text>
  return (
    <SafeAreaView>
      <Pagination
        data={posts}
        RenderComponent={Post}
        title="Posts"
        pageLimit={5}
        dataLimit={10}
      />
    </SafeAreaView>
  );
};

export default App;
