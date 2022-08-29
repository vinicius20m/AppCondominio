import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

const Box = styled.View``;
const Item = styled.View`
  background-color: #FFF;
  border-width: 1px;
  border-color: #E8E9ED;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const InfoArea = styled.View`
  flex: 1;
`;
const StrongText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
const RegularText = styled.Text`
  font-size: 14px;
  color: #9C9DB9;
`;
const RemoveButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

export default ({ list, refreshFunction }) => {
  const handleRemove = (index) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este veículo?',
      [
        { text: 'Sim', onPress: () => removeItem(index) },
        { text: 'Cancelar', onPress: null, styled: 'cancel' }
      ]
    );
  }

  const removeItem = async (index) => {
    let result = await api.removeUnitItem(
      'vehicle',
      list[index].id
    );
    if (result.error === '') {
      refreshFunction();
    } else {
      alert(result.error);
    }
  }

  return (
    <Box>
      {list.map((item, index) => (
        <Item key={index}>
          <InfoArea>
            <StrongText>{item.title}</StrongText>
            <RegularText>Cor: {item.color} - Placa: {item.plate}</RegularText>
          </InfoArea>
          <RemoveButton onPress={() => handleRemove(index)}>
            <Icon name="remove" color="#FF0000" size={24} />
          </RemoveButton>
        </Item>
      ))}
    </Box>
  );
}
