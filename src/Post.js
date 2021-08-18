/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

function Post(props) {
  const {id, title, body} = props.data;
  return (
    <View>
      <Text style={{fontSize: 5}}>{id}</Text>
      <Text style={{fontSize: 20}}>{title}</Text>
      <Text style={{fontSize: 10}}>{body}</Text>
    </View>
  );
}

export default Post;
