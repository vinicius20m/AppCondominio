import React, { useState } from 'react';
import styled from 'styled-components/native';
import api from '../services/api';

const Box = styled.View`
  padding: 20px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Label = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
`;
const Field = styled.TextInput`
  background-color: #FFF;
  border-width: 1px;
  border-color: #CCC;
  border-radius: 5px;
  color: #000;
  font-size: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;
const ButtonArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;
const SaveButton = styled.Button`
  flex: 1;
`;
const CancelButton = styled.Button`
  flex: 1;
`;

export default ({ refreshFunction, setShowModal }) => {

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');

  const handleAdd = async () => {
    if (title && color && plate) {
      const result = await api.addUnitItem(
        'vehicle',
        { title, color, plate }
      );
      if (result.error === '') {
        refreshFunction();
        setShowModal(false);
      } else {
        alert(result.error);
      }
    } else {
      alert('Preencha os campos');
    }
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <Box>
      <Title>Adicionar novo veículo</Title>

      <Label>Nome do veículo:</Label>
      <Field
        placeholder="Digite o nome do veículo"
        value={title}
        onChangeText={t => setTitle(t)}
      />

      <Label>Cor do veículo:</Label>
      <Field
        placeholder="Digite a cor do veículo"
        value={color}
        onChangeText={t => setColor(t)}
      />

      <Label>Placa do veículo:</Label>
      <Field
        placeholder="Digite a placa do veículo"
        value={plate}
        onChangeText={t => setPlate(t)}
      />

      <ButtonArea>
        <SaveButton title="Adicionar" onPress={handleAdd} />
        <CancelButton color="#FF0000" title="Cancelar" onPress={handleCancel} />
      </ButtonArea>
    </Box>
  );
}
