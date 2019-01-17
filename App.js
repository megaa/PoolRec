/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PanResponderExample from './PR';
//import PanResponderExampleOrig from './PR_orig';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      /*
      this.state = {
          selectedPR: -1
      };
      */
      this.selectedPR = -1;
      this.PR = [ null ];
      this.timer = null;
  }

  moveCont(hor, ver) {
      console.log("hor=" + hor + ", ver=" + ver);
      step = hor * hor + ver * ver;
      this.PR[this.selectedPR].updatePos(hor, ver);
      if (hor != 0) hor = hor > 0 ? (hor < 96 ? hor + 1 : hor) : (hor > -96 ? hor - 1 : hor);
      if (ver != 0) ver = ver > 0 ? (ver < 96 ? ver + 1 : ver) : (ver > -96 ? ver - 1 : ver);
      this.timer = setTimeout(this.moveCont.bind(this), step == 1 ? 400 : 90, hor, ver);
  }

  moveCancel(event) {
      clearTimeout(this.timer);
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
        <PanResponderExample ref={(comp) => this.PR[0] = comp} bgColor='white'   num='0' txtCol='black' selPR={() => this.selectedPR=0} />
        <PanResponderExample ref={(comp) => this.PR[1] = comp} bgColor='yellow'  num='1' txtCol='black' selPR={() => this.selectedPR=1} />
        <PanResponderExample ref={(comp) => this.PR[2] = comp} bgColor='blue'    num='2' txtCol='white' selPR={() => this.selectedPR=2} />
        <PanResponderExample ref={(comp) => this.PR[3] = comp} bgColor='red'     num='3' txtCol='white' selPR={() => this.selectedPR=3} />
        <PanResponderExample ref={(comp) => this.PR[4] = comp} bgColor='#E74283' num='4' txtCol='black' selPR={() => this.selectedPR=4} />
        <PanResponderExample ref={(comp) => this.PR[5] = comp} bgColor='orange'  num='5' txtCol='black' selPR={() => this.selectedPR=5} />
        <PanResponderExample ref={(comp) => this.PR[6] = comp} bgColor='green'   num='6' txtCol='white' selPR={() => this.selectedPR=6} />
        <PanResponderExample ref={(comp) => this.PR[7] = comp} bgColor='brown'   num='7' txtCol='white' selPR={() => this.selectedPR=7} />
        <PanResponderExample ref={(comp) => this.PR[8] = comp} bgColor='black'   num='8' txtCol='white' selPR={() => this.selectedPR=8} />
        <PanResponderExample ref={(comp) => this.PR[9] = comp} bgColor='yellow'  num='9' txtCol='black' selPR={() => this.selectedPR=9} />
      </View>
      <View style={styles.panel}>
        <Text>撞球筆記</Text>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(0, -1)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(-1, 0)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(1, 0)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>RIGHT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(0, 1)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>DOWN</Text>
        </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: '#111111',
    width: 330,
    height: 660
  },
  panel: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'blue',
    width: 82,
    height: 660,
  },
  btnStyleBasic: {
    flex: 0,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderWidth: 2,
    borderColor: 'rgba(170,170,170,1)',
    backgroundColor: 'blue',
    margin: 3,
    width: 74,
    height: 32
  },
  btnTxtStyle: {
    fontSize: 16,
    color: 'white'
  },
});
