import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/FontAwesome';

import api from "../services/api";
import { Alert, Linking } from "react-native";

const Box = styled.TouchableOpacity`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
`;

export default ({data}) => {

  const handleClick = async () => {
    const supported = await Linking.canOpenURL(data.fileurl);
    if (supported) {
      await Linking.openURL(data.fileurl);
    }
  }

  return (
    <Box onPress={handleClick} >
      <Icon name="file-text" size={30} color="#8B63E7" />
      <Title>{data.title}</Title>
    </Box>
  );
}
