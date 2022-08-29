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

  const [name, setName] = useState('');
  const [race, setRace] = useState('');

  const handleAdd = async () => {
    if (name && race) {
      const result = await api.addUnitItem(
        'pet',
        { name, race }
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
      <Title>Adicionar novo pet</Title>

      <Label>Nome do pet:</Label>
      <Field
        placeholder="Digite o nome do pet"
        value={name}
        onChangeText={t => setName(t)}
      />

      <Label>Raça do pet:</Label>
      <Field
        placeholder="Digite a raça do pet"
        value={race}
        onChangeText={t => setRace(t)}
      />

      <ButtonArea>
        <SaveButton title="Adicionar" onPress={handleAdd} />
        <CancelButton color="#FF0000" title="Cancelar" onPress={handleCancel} />
      </ButtonArea>
    </Box>
  );
}
