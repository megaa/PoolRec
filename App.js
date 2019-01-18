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
import {VER_STRING, CIRCLE_SIZE} from './Global';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      /*
      this.state = {
          selectedPR: -1
      };
      */
      this.selectedPR = 0;
      this.lastDelPR = -1;
      this.PR = [ null ];
      this.deleteMark = [ false, false, false, false, false, false, false, false, false, false ];
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

  moveCancel() {
      clearTimeout(this.timer);
  }

  deleteBall() {
      this.PR[this.selectedPR].markAsDeleted();
      this.deleteMark[this.selectedPR] = true;
      this.lastDelPR = this.selectedPR;
      this.selectedPR = -1;
      for (let i = 0; i < 10; i++) {
          if (!this.deleteMark[i]) {
              this.selectedPR = i;
              break;
          }
      }
  }

  recoverBall(ballNo) {
      if (this.deleteMark[ballNo]) {
          this.deleteMark[ballNo] = false;
          this.selectedPR = ballNo;
          this.PR[this.selectedPR].recover();
      }
  }


  render() {
    return (
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
        <Text>{VER_STRING}</Text>
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
        <Text> </Text>
        <TouchableOpacity style={styles.btnStyleBasic} onPress={() => this.deleteBall()}>
          <Text style={styles.btnTxtStyle}>DEL</Text>
        </TouchableOpacity>
        <Text> </Text>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'white'}]}
          onPress={() => this.recoverBall(0)}>
          <Text style={styles.ballTxtStyleBlack}> </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'yellow'}]}
          onPress={() => this.recoverBall(1)}>
          <Text style={styles.ballTxtStyleBlack}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'blue'}]}
          onPress={() => this.recoverBall(2)}>
          <Text style={styles.ballTxtStyleWhite}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'red'}]}
          onPress={() => this.recoverBall(3)}>
          <Text style={styles.ballTxtStyleWhite}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: '#E74283'}]}
          onPress={() => this.recoverBall(4)}>
          <Text style={styles.ballTxtStyleBlack}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'orange'}]}
          onPress={() => this.recoverBall(5)}>
          <Text style={styles.ballTxtStyleBlack}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'green'}]}
          onPress={() => this.recoverBall(6)}>
          <Text style={styles.ballTxtStyleWhite}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'brown'}]}
          onPress={() => this.recoverBall(7)}>
          <Text style={styles.ballTxtStyleWhite}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'black'}]}
          onPress={() => this.recoverBall(8)}>
          <Text style={styles.ballTxtStyleWhite}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyleBall, {backgroundColor: 'yellow'}]}
          onPress={() => this.recoverBall(9)}>
          <Text style={styles.ballTxtStyleBlack}>9</Text>
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
    backgroundColor: '#303030',
    margin: 3,
    width: 74,
    height: 32
  },
  btnTxtStyle: {
    fontSize: 16,
    color: 'white'
  },
  btnStyleBall: {
    flex: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: CIRCLE_SIZE / 2,
    paddingLeft: 8
  },
  ballTxtStyleBlack: {
    fontSize: 18,
    color: 'black'
  },
  ballTxtStyleWhite: {
    fontSize: 18,
    color: 'white'
  },
});
