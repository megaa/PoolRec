/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow weak
 */

'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {PanResponder, StyleSheet, Text, View} = ReactNative;

import type {PanResponderInstance, GestureState} from 'PanResponder';
import type {PressEvent} from 'CoreEventTypes';
import {CIRCLE_SIZE, SPACING} from './Global';

type CircleStyles = {
  backgroundColor?: string,
  left?: number,
  top?: number,
};

type Props = $ReadOnly<{||}>;

export default class PanResponderExample extends React.Component<Props> {
  constructor(props) {
      super(props);
      /*
      this.state = {
        //_circleStyles: {|style: CircleStyles|} = {style: {}},
        _circleStyles: {
            backgroundColor: 'gray',
            left: 20,
            top: 20,
        },
      };
      */
  }

  _handleStartShouldSetPanResponder = (
    event: PressEvent,
    gestureState: GestureState,
  ): boolean => {
    // Should we become active when the user presses down on the circle?
    return true;
  };

  _handleMoveShouldSetPanResponder = (
    event: PressEvent,
    gestureState: GestureState,
  ): boolean => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };

  _handlePanResponderGrant = (
    event: PressEvent,
    gestureState: GestureState,
  ) => {
    this._highlight();
  };

  _handlePanResponderMove = (event: PressEvent, gestureState: GestureState) => {
    /*
    this.setState({_circleStyles: {
            left: this._previousLeft + gestureState.dx,
            top: this._previousTop + gestureState.dy,
            backgroundColor: 'gray'
    }});
    */
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (event: PressEvent, gestureState: GestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    if (this._previousLeft > 312) {
        this._previousLeft = 312;
        this._circleStyles.style.left = 312;
        this._updateNativeStyles();
    }
    if (this._previousLeft < -15) {
        this._previousLeft = -15;
        this._circleStyles.style.left = -15;
        this._updateNativeStyles();
    }
    if (this._previousTop > 642) {
        this._previousTop = 642;
        this._circleStyles.style.top = 642;
        this._updateNativeStyles();
    }
    if (this._previousTop < -15) {
        this._previousTop = -15;
        this._circleStyles.style.top = -15;
        this._updateNativeStyles();
    }
  };

  _panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderGrant,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
  });

  _previousLeft: number = 0;
  _previousTop: number = 0;
  _circleStyles: {|style: CircleStyles|} = {style: {}};
  circle: ?React.ElementRef<typeof View> = null;

  UNSAFE_componentWillMount() {
    this._previousLeft = 20;
    this._previousTop = 20 + parseInt(this.props.num) * SPACING;
    /*
    this.setState({_circleStyles: {
            left: 20,
            top: 20,
            backgroundColor: this.props.bgColor,
    }});
    */
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: this.props.bgColor //'green',
      },
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this._updateNativeStyles();
  }

  _highlight() {
    /*
    this.setState({_circleStyles: {
            backgroundColor: 'gray' 
    }});
    */
    this._circleStyles.style.backgroundColor = 'gray';
    this._updateNativeStyles();
  }

  _unHighlight() {
    /*
    this.setState({_circleStyles: {
            backgroundColor: 'blue' 
    }});
    */
    this._circleStyles.style.backgroundColor = this.props.bgColor;
    this._updateNativeStyles();
    this.props.selPR();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
    console.log("left=" + this._circleStyles.style.left + ", top=" + this._circleStyles.style.top + ", bg=" + this._circleStyles.style.backgroundColor);
  }

  updateColor(col) {
    this._circleStyles.style.backgroundColor = col;//this.props.bgColor;
    this._updateNativeStyles();
  }

  updatePos(shiftX, shiftY) {
    this._previousLeft += shiftX;
    this._previousTop += shiftY;
    this._previousLeft = this._previousLeft > 312 ? 312 : this._previousLeft;
    this._previousLeft = this._previousLeft < -15 ? -15 : this._previousLeft;
    this._previousTop = this._previousTop > 642 ? 642 : this._previousTop;
    this._previousTop = this._previousTop < -15 ? -15 : this._previousTop;
    this._circleStyles.style.left = this._previousLeft;
    this._circleStyles.style.top = this._previousTop;
    this._updateNativeStyles();
  }

  markAsDeleted() {
    this._previousLeft = 440;
    this._previousTop = 360;
    this._circleStyles.style.left = this._previousLeft;
    this._circleStyles.style.top = this._previousTop;
    this._updateNativeStyles();
  }

  recover() {
    this._previousLeft = 20;
    this._previousTop = 20 + parseInt(this.props.num) * SPACING;
    this._circleStyles.style.left = this._previousLeft;
    this._circleStyles.style.top = this._previousTop;
    this._updateNativeStyles();
  }

  render() {
    return (
        <View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        >
        <Text style={[styles.innerText, {color: this.props.txtCol}]}>{this.props.num == '0' ? ' ' : this.props.num}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  innerText: {
    position: 'absolute',
    left: CIRCLE_SIZE / 2 - 7,
    top: CIRCLE_SIZE / 2 - 15,
    fontSize: 18 
  },
  container: {
    flex: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    borderWidth: 1
  },
});
/*
exports.title = 'PanResponder Sample';
exports.description =
  'Shows the Use of PanResponder to provide basic gesture handling';
exports.examples = [
  {
    title: 'Basic gresture handling',
    render: function(): React.Element<typeof PanResponderExample> {
      return <PanResponderExample />;
    },
  },
];
*/
