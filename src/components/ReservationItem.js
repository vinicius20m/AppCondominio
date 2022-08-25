import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Box = styled.TouchableOpacity`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 15px;
  margin-bottom: 15px;
  padding-bottom: 10px;
`;
const CoverImage = styled.Image`
  background-color: #CCC;
  height: 150px;
  border-radius: 15px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin: 10px;
`;
const DateText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #9C9DB9;
  margin: 0 10px;
  text-transform: uppercase;
`;
const DateItem = styled.Text`
  font-size: 15px;
  color: #000;
  margin: 0 10px;
`;

export default ({data}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('ReservationAddScreen', {data});
  };

  return (
    <Box onPress={handleClick} >
      <CoverImage source={{uri: data.cover}} resizeMode="cover" />
      <Title>{data.title}</Title>
      <DateText>Horários de Funcionamento:</DateText>
      {data.dates.map((item, index)=>(
        <DateItem key={index} >{item}</DateItem>
      ))}
    </Box>
  );
};
