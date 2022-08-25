import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('12345678911');
  const [password, setPassword] = useState('1234');

  const handleLoginButton = async () => {
    if (cpf && password) {
      let result = await api.login(cpf, password);
      if (result.error === '') {
        dispatch({type: 'USER_SET_TOKEN', payload: {token: result.token}});
        dispatch({type: 'USER_SET_USER', payload: {user: result.user}});

        navigation.reset({
          index: 1,
          routes: [{name: 'ChoosePropertyScreen'}],
        });
      } else {
        Alert.alert('Algo deu errado.', result.error);
      }
    } else {
      Alert.alert('Atenção!', 'Preencha ambos os Campos!')
    }
  }

  const handleRegisterButton = () => {
    navigation.navigate('RegisterScreen');
  }

  return (
    <C.Container>

      <C.Logo
        source={require('../../assets/undraw_home.png')}
        resizeMode="contain"
      />

      <C.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf} onChangeText={(e)=>setCpf(e)}
      />

      <C.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password} onChangeText={(e)=>setPassword(e)}
      />

      <C.ButtonArea onPress={handleLoginButton} >
        <C.ButtonText>ENTRAR</C.ButtonText>
      </C.ButtonArea>

      <C.ButtonArea onPress={handleRegisterButton} >
        <C.ButtonText>CADASTRAR-SE</C.ButtonText>
      </C.ButtonArea>
    </C.Container>
  );
}
