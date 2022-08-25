import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import WarningItem from "../../components/WarningItem";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Livro de Ocorrências',
      headerRight: () => (
        <C.AddButton onPress={()=>navigation.navigate('WarningAddScreen')}>
          <Icon name="plus" size={24} color="#000" />
        </C.AddButton>
      )
    });
    getWarnings();
  }, []);

  const getWarnings = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getWarnings();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      Alert.alert('Algo deu errado.', result.error);
    }
  }

  return (
    <C.Container>
      {!loading && list.length === 0 &&
        <C.NoListArea>
          <C.NoListText>Não há Ocorrências.</C.NoListText>
        </C.NoListArea>
      }
      <C.List
        data={list} keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><WarningItem data={item} />}
        refreshing={loading} onRefresh={getWarnings}
      />
    </C.Container>
  );
}
