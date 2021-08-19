/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAll} from 'react-native-contacts';
import ContactItem from './src/ContactItem';
import Pagination from './src/Pagination';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
      }
      setContacts(await getAll());
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      console.warn(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  return (
    <SafeAreaView>
      {contacts.length > 0 && (
        <Pagination
          data={contacts}
          dataLimit={3}
          maxPaginatorLimit={4}
          RenderComponent={ContactItem}
          title="Contacts"
        />
      )}
    </SafeAreaView>
  );
};

export default Contacts;
