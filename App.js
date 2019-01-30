/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Button, CameraRoll, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {captureScreen} from "react-native-view-shot";
import PanResponderExample from './PR';
//import PanResponderExampleOrig from './PR_orig';
import {VER_STRING, CIRCLE_SIZE, deviceWidth, deviceHeight, tableWidth, tableHeight, panelWidth, panelHeight, spacing} from './Global';

const tableImg = require('./table.png');

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

  async requestExternalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '要求存取權限',
          message: 'App需要「儲存」權限以將畫面儲存至相簿',
          buttonPositive: '同意',
          buttonNegative: '不同意',
          buttonNeutral: '略過'
        },
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  }

  componentDidMount() {
      console.log("device WxH = " + deviceWidth + "x" + deviceHeight);
      console.log("table  WxH = " + tableWidth + "x" + tableHeight);
      console.log("panel  WxH = " + panelWidth + "x" + panelHeight);
      this.requestExternalStoragePermission();
  }

  moveCont(hor, ver) {
      if (this.selectedPR < 0) return;
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
      if (this.selectedPR < 0) return;
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

  saveToFile() {
      captureScreen({
        format: "jpg",
        quality: 0.8
      })
      .then(
        uri => { console.log("Image saved to", uri); CameraRoll.saveToCameraRoll(uri); Alert.alert("畫面已儲存至相簿!"); },
        error => { console.error("Oops, snapshot failed", error); Alert.alert("Error happened!"); }
      );
  }


  render() {
    return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Image source={tableImg} style={styles.tableImage} />
        <PanResponderExample ref={(comp) => this.PR[0] = comp} bgColor='white'   num='0' txtCol='black' spacing={spacing} selPR={() => this.selectedPR=0} />
        <PanResponderExample ref={(comp) => this.PR[1] = comp} bgColor='yellow'  num='1' txtCol='black' spacing={spacing} selPR={() => this.selectedPR=1} />
        <PanResponderExample ref={(comp) => this.PR[2] = comp} bgColor='blue'    num='2' txtCol='white' spacing={spacing} selPR={() => this.selectedPR=2} />
        <PanResponderExample ref={(comp) => this.PR[3] = comp} bgColor='red'     num='3' txtCol='white' spacing={spacing} selPR={() => this.selectedPR=3} />
        <PanResponderExample ref={(comp) => this.PR[4] = comp} bgColor='#E74283' num='4' txtCol='black' spacing={spacing} selPR={() => this.selectedPR=4} />
        <PanResponderExample ref={(comp) => this.PR[5] = comp} bgColor='orange'  num='5' txtCol='black' spacing={spacing} selPR={() => this.selectedPR=5} />
        <PanResponderExample ref={(comp) => this.PR[6] = comp} bgColor='green'   num='6' txtCol='white' spacing={spacing} selPR={() => this.selectedPR=6} />
        <PanResponderExample ref={(comp) => this.PR[7] = comp} bgColor='brown'   num='7' txtCol='white' spacing={spacing} selPR={() => this.selectedPR=7} />
        <PanResponderExample ref={(comp) => this.PR[8] = comp} bgColor='black'   num='8' txtCol='white' spacing={spacing} selPR={() => this.selectedPR=8} />
        <PanResponderExample ref={(comp) => this.PR[9] = comp} bgColor='yellow'  num='9' txtCol='black' spacing={spacing} selPR={() => this.selectedPR=9} />
      </View>
      <View style={styles.panel}>
        <Text>撞球筆記</Text>
        <Text>{VER_STRING}</Text>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(0, -1)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>▲</Text>
        </TouchableOpacity>
        <View style={styles.leftAndRightOut}>
        <TouchableOpacity style={styles.btnStyleLR}
          onPressIn={() => this.moveCont(-1, 0)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyleLR}
          onPressIn={() => this.moveCont(1, 0)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>▶</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnStyleBasic}
          onPressIn={() => this.moveCont(0, 1)} onPressOut={() => this.moveCancel()}>
          <Text style={styles.btnTxtStyle}>▼</Text>
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
        <Text> </Text>
        <TouchableOpacity style={styles.btnStyleBasic} onPress={() => this.saveToFile()}>
          <Text style={styles.btnTxtStyle}>SAVE</Text>
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
    borderWidth: 0,
    borderRadius: 0,
    borderColor: 'red',
    width: tableWidth,
    height: tableHeight 
  },
  tableImage: {
    resizeMode: 'contain',
    width: tableWidth,
    height: tableHeight,
  },
  panel: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'blue',
    width: panelWidth,
    height: panelHeight,
  },
  leftAndRightOut: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: panelWidth - 8 >= 100 ? 100 : panelWidth - 8,
    height: 32
  },
  btnStyleLR: {
    flex: 0,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderWidth: 2,
    borderColor: 'rgba(170,170,170,1)',
    backgroundColor: '#303030',
    margin: 3,
    width: (panelWidth - 12) / 2 >= 48 ? 48 : (panelWidth - 12) / 2,
    height: 54
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
