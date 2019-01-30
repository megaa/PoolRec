import {Dimensions} from 'react-native';

const VER_STRING = "A0130";
const CIRCLE_SIZE = 30;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height - 24;
const tableWidth = deviceHeight / 2;
const tableHeight = deviceHeight;
const panelWidth = deviceWidth - tableWidth;
const panelHeight = deviceHeight;
const spacing = (tableHeight - 40 - CIRCLE_SIZE) / 9;

export {
    VER_STRING,
    CIRCLE_SIZE,
    deviceWidth,
    deviceHeight,
    tableWidth,
    tableHeight,
    panelWidth,
    panelHeight,
    spacing
};

