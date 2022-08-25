import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import DocItem from "../../components/DocItem";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Boletos'
    });
    getDocs();
  }, []);

  const getDocs = async () => {
    setDocList([]);
    setLoading(true);
    const result = await api.getBillets();
    setLoading(false);
    if (result.error === '') {
      setDocList(result.list);
    } else {
      Alert.alert('Algo deu errado.', result.error);
    }
  }

  return (
    <C.Container>
      {!loading && docList.length === 0 &&
        <C.NoListArea>
          <C.NoListText>Não há Boletos desta unidade.</C.NoListText>
        </C.NoListArea>
      }
      <C.List
        data={docList} keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><DocItem data={item} />}
        refreshing={loading} onRefresh={getDocs}
      />
    </C.Container>
  );
}
