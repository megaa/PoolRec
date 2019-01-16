/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PanResponderExample from './PR';
import PanResponderExampleOrig from './PR_orig';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
    /*
      <View style={styles.container}>
        <PanResponderExample bgColor={'white'} num={' '} txtCol='black' />
        <PanResponderExample bgColor={'yellow'} num={'1'} txtCol='black' />
        <PanResponderExample bgColor={'blue'} num={'2'} txtCol='white' />
        <PanResponderExample bgColor={'red'} num={'3'} txtCol='white' />
        <PanResponderExample bgColor={'#E74283'} num={'4'} txtCol='black' />
        <PanResponderExample bgColor={'orange'} num={'5'} txtCol='black' />
        <PanResponderExample bgColor={'green'} num={'6'} txtCol='white' />
        <PanResponderExample bgColor={'brown'} num={'7'} txtCol='white' />
        <PanResponderExample bgColor={'black'} num={'8'} txtCol='white' />
        <PanResponderExample bgColor={'yellow'} num={'9'} txtCol='black' />
      </View>
    */
    <View style={styles.container}>
      <View style={styles.table}>
        <PanResponderExample bgColor='white' num=' ' txtCol='black' />
        <PanResponderExample bgColor='yellow' num='1' txtCol='black' />
      </View>
      <View style={styles.panel}>
        <Text>AAA</Text>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  table: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: 'red',
    width: 330,
    height: 660
  },
  panel: {
    flex: 0,
    borderWidth: 1,
    borderColor: 'blue',
    width: 82,
    height: 660,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
