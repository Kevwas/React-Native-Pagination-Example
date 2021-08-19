/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  pagination: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationItem: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#666',
    paddingTop: 10,
    paddingRight: 15,
    borderRadius: 22.5,
    height: 45,
    width: 45,
    position: 'relative',
    marginTop: 0,
    marginRight: 5,
  },
  paginationItemActive: {
    borderWidth: 1,
    borderColor: '#888',
    color: '#888',
  },
  paginationItemContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: 5,
    marginTop: -7,
    // transform: 'translate(-50%, -50%)',
  },
  prevAndNextButtons: {
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 10,
    color: 'blue',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
    margin: 10,
  },
});

function Pagination({
  contentContainerStyle,
  data,
  dataLimit,
  navigation,
  RenderComponent,
  maxPaginatorLimit,
}) {
  const automaticPageLimit =
    Math.floor(data.length / dataLimit) <= 1 ? 2 : Math.ceil(data.length / dataLimit);
  const pageLimit =
    automaticPageLimit < maxPaginatorLimit ? automaticPageLimit : maxPaginatorLimit;

  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(ScrollView);

  const hidePaginator = Math.ceil(data.length / dataLimit) === 1;
  const showPageNumbers = pageLimit >= 3;

  function scrollToTop() {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  function goToNextPage() {
    setCurrentPage(page => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page => page - 1);
  }

  function changePage(num) {
    const pageNumber = Number(num);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = (num = 0) => {
    const startIndex = (currentPage + num) * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const paginationGroup = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    return paginationGroup.filter((el) => el <= data.length / dataLimit);
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    scrollToTop();
  },[]);

  return (
    <SafeAreaView style={contentContainerStyle}>
      {/* <Text>{title}</Text> */}
      {/* show the posts, 10 posts at a time */}
      <ScrollView ref={scrollRef} style={{height : !hidePaginator ? '75%' : '100%' }}>
        {getPaginatedData().map((item) => (
          <RenderComponent
            key={item.recordID}
            contact={item}
          />
        ))}
      </ScrollView>
      { !hidePaginator &&
        <View style={styles.pagination} >
          {/* prev button */}
          <TouchableOpacity
            onPress={() => goToPreviousPage()}
            disabled={currentPage === 1}
            style={
              currentPage === 1
              ?
                styles.prevAndNextButtonsDisabled
              :
                styles.prevAndNextButtons
            }
          >
            <Text>prev</Text>
          </TouchableOpacity>
          {/* show page numbers */}
          {
          showPageNumbers &&
            getPaginationGroup().map((item, index) => (
              // getPaginatedData(1).length >= 1 &&
                <TouchableOpacity
                  key={index}
                  onPress={() => changePage(item)}
                  style={styles.prevAndNextButtons}
                >
                  <View style={
                      [styles.paginationItemContent,
                      {backgroundColor: item === currentPage ? 'lime' : 'white'}
                      ]
                    }
                  >
                    <Text>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
          ))}

          {/* next button */}
          <TouchableOpacity
            onPress={() => goToNextPage()}
            disabled={currentPage >= data.length / dataLimit}
            style={
              currentPage >= data.length / dataLimit
              ?
                styles.prevAndNextButtonsDisabled
              :
                styles.prevAndNextButtons
            }
          >
            <Text>next</Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  );
}

export default Pagination;
