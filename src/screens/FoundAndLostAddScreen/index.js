import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { launchCamera } from "react-native-image-picker";
import { Alert } from "react-native";
import { useStateValue } from "../../contexts/StateContext";

import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [photo, setPhoto] = useState({});
  const [description, setDescription] = useState('');
  const [where, setWhere] = useState('');

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Adicionar um Perdido'
    });
  }, []);

  const handleAddPhoto = () => {
    launchCamera({
      mediaType: 'photo',
      maxWidth: 1280,
    }, response => {
      if (!response.didCancel) {
        setPhoto(response);
      }
    });
  }

  const handleSave = async () => {
    if (description !== '' && where !== '' && photo.uri !== '') {
      const result = await api.addLostItem(
        photo, description, where
      );
      if (result.error === '') {
        setPhoto({});
        setDescription('');
        setWhere('');
        navigation.navigate('FoundAndLostScreen');
      } else {
        return Alert.alert('Algo deu errado.', result.error);
      }
    } else {
      return Alert.alert('Atenção!', 'Preencha os Campos.');
    }
  }

  return (
    <C.Container>
      <C.Scroller>
        <C.PhotoArea>
          {!photo.uri &&
            <C.ButtonArea onPress={handleAddPhoto} >
              <C.ButtonText>Tirar uma foto</C.ButtonText>
            </C.ButtonArea>
          }
          {photo.uri &&
            <>
              <C.PhotoItem source={{uri: photo.uri}} resizeMode="cover" />
              <C.ButtonArea onPress={handleAddPhoto} >
                <C.ButtonText>Tirar outra foto</C.ButtonText>
              </C.ButtonArea>
            </>
          }
        </C.PhotoArea>

        <C.Title>Descreva o Item</C.Title>
        <C.Field value={description} onChangeText={setDescription}
          placeholder="Ex: Carteira com Documentos."
        />

        <C.Title>Onde foi Encontrado?</C.Title>
        <C.Field value={where} onChangeText={setWhere}
          placeholder="Ex: No pátio."
        />

        <C.ButtonArea onPress={handleSave} >
          <C.ButtonText>Salvar</C.ButtonText>
        </C.ButtonArea>
      </C.Scroller>
    </C.Container>
  );
}
