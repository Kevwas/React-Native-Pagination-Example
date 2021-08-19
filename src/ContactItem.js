/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Avatar, ListItem} from 'react-native-elements';

const ContactItem = ({contact, onPress}) => {
  const {
    emailAddresses,
    givenName,
    familyName,
    phoneNumbers,
    hasThumbnail,
    thumbnailPath,
  } = contact;
  return (
    <ListItem
      bottomDivider
      containerStyle={{
        padding: 20,
        backgroundColor: 'white',
      }}
      onPress={onPress}>
      <Avatar
        containerStyle={{backgroundColor: 'white'}}
        rounded
        size="medium"
        source={{uri: hasThumbnail ? thumbnailPath : null}}
        title={givenName[0].toUpperCase()}
        titleStyle={{fontSize: 20}}
      />
      <ListItem.Content>
        <ListItem.Title>{givenName + ' ' + familyName}</ListItem.Title>
        <ListItem.Subtitle>{emailAddresses[0].email}</ListItem.Subtitle>
        <ListItem.Subtitle>{phoneNumbers[0].number}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ContactItem;
