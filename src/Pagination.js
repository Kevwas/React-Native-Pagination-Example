/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    height: '100%',
  },
  pagination: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
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

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(ScrollView);

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

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    console.log('Rendering posts with no errors');
    scrollToTop();
  }, [currentPage]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      {/* show the posts, 10 posts at a time */}
      <ScrollView style={styles.contentContainer} ref={scrollRef}>
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </ScrollView>

      {/* prev button */}
      <View style={styles.pagination}>
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
        {getPaginationGroup().map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => changePage(item)}
            style={styles.prevAndNextButtons}
          >
            <View style={
                [styles.paginationItemContent, 
                {backgroundColor: item === currentPage ? 'green' : 'white'}
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
          disabled={currentPage === dataLimit}
          style={
            currentPage === dataLimit
            ?
              styles.prevAndNextButtonsDisabled
            :
              styles.prevAndNextButtons
          }
        >
          <Text>next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Pagination;
