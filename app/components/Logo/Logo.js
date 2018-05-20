import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  Animated,
  Platform,
  StyleSheet,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    this.imageWidth = new Animated.Value(styles.$largeImageSize);
  }

  componentDidMount() {
    let showListener = "keyboardWillShow";
    let hideListener = "keyboardWillHide";
    if (Platform.OS === "android") {
      showListener = "keyboardDidShow";
      hideListener = "keyboardDidHide";
    }

    this.keyboardShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardShow
    );
    this.keyboardHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  };

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  };

  render() {
    const containerImageStyle = [
      styles.containerImage,
      { width: this.containerImageWidth, height: this.containerImageWidth }
    ];

    //const imageStyle = [styles.logo, { width: this.imageWidth }];
    const imageStyle = [
      styles.logo,
      this.props.tintColor ? { tintColor: this.props.tintColor } : null
    ];

    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyle}>
          <ImageBackground
            source={require("./images/background.png")}
            style={styles.backgroundImage}
            resizeMode="contain"
          >
            <Animated.Image
              source={require("./images/logo.png")}
              style={imageStyle}
              resizeMode="contain"
            />
          </ImageBackground>
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
