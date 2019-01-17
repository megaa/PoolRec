/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
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
  constructor(props) {
      super(props);
      this.state = {
          selectedPR: -1
      };
      this.PR = [ null, null ];
  }

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
        <PanResponderExample ref={(comp) => this.PR[0] = comp} bgColor='white'   num=' ' txtCol='black' selPR={() => this.setState({selectedPR: 0})} />
        <PanResponderExample ref={(comp) => this.PR[1] = comp} bgColor='yellow'  num='1' txtCol='black' selPR={() => this.setState({selectedPR: 1})} />
        <PanResponderExample ref={(comp) => this.PR[2] = comp} bgColor='blue'    num='2' txtCol='white' selPR={() => this.setState({selectedPR: 2})} />
        <PanResponderExample ref={(comp) => this.PR[3] = comp} bgColor='red'     num='3' txtCol='white' selPR={() => this.setState({selectedPR: 3})} />
        <PanResponderExample ref={(comp) => this.PR[4] = comp} bgColor='#E74283' num='4' txtCol='black' selPR={() => this.setState({selectedPR: 4})} />
        <PanResponderExample ref={(comp) => this.PR[5] = comp} bgColor='orange'  num='5' txtCol='black' selPR={() => this.setState({selectedPR: 5})} />
        <PanResponderExample ref={(comp) => this.PR[6] = comp} bgColor='green'   num='6' txtCol='white' selPR={() => this.setState({selectedPR: 6})} />
        <PanResponderExample ref={(comp) => this.PR[7] = comp} bgColor='brown'   num='7' txtCol='white' selPR={() => this.setState({selectedPR: 7})} />
        <PanResponderExample ref={(comp) => this.PR[8] = comp} bgColor='black'   num='8' txtCol='white' selPR={() => this.setState({selectedPR: 8})} />
        <PanResponderExample ref={(comp) => this.PR[9] = comp} bgColor='yellow'  num='9' txtCol='black' selPR={() => this.setState({selectedPR: 9})} />
      </View>
      <View style={styles.panel}>
        <Text>AAA</Text>
        <Button title='UP' onPress={() => { this.PR[this.state.selectedPR].updatePos(0, -1); }} />
        <Text> </Text>
        <Button title='LEFT' onPress={() => { this.PR[this.state.selectedPR].updatePos(-1, 0); }} />
        <Text> </Text>
        <Button title='RIGHT' onPress={() => { this.PR[this.state.selectedPR].updatePos(1, 0); }} />
        <Text> </Text>
        <Button title='DOWN' onPress={() => { this.PR[this.state.selectedPR].updatePos(0, 1); }} />
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
