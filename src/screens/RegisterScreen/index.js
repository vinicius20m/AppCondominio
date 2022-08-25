import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [name, setName] = useState('Vinicius Mendes');
  const [cpf, setCpf] = useState('12345678911');
  const [email, setEmail] = useState('vmcmendes17@gmail.com');
  const [password, setPassword] = useState('123456');
  const [passwordConfirm, setPasswordConfirm] = useState('123456');

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Fazer Cadastro'
    });
  }, []);

  const handleRegisterButton = async () => {
    if (name && email && cpf && password && passwordConfirm) {
      let result = await api.register(name, email, cpf, password, passwordConfirm);
      if(result.error === '') {
        dispatch({type: 'USER_SET_TOKEN', payload: {token: result.token}})
        dispatch({type: 'USER_SET_USER', payload: {user: result.user}})

        navigation.reset({
          index: 1,
          routes: [{name: 'ChoosePropertyScreen'}],
        });
      } else {
        return Alert.alert('Algo deu errado.', result.error);
      }
    } else {
      return Alert.alert('Atenção!', 'Preecha todos os Campos!');
    }
  }

  return (
    <C.Container>

      <C.Field
        placeholder="Digite seu Nome Completo"
        value={name} onChangeText={(e)=>setName(e)}
      />
      <C.Field
        placeholder="Digite seu Email"
        value={email} onChangeText={(e)=>setEmail(e)}
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
      <C.Field
        placeholder="Digite sua Senha Novamente"
        secureTextEntry={true}
        value={passwordConfirm} onChangeText={(e)=>setPasswordConfirm(e)}
      />

      <C.ButtonArea onPress={handleRegisterButton} >
        <C.ButtonText>CADASTRAR-SE</C.ButtonText>
      </C.ButtonArea>
    </C.Container>
  );
}
