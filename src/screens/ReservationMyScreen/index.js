import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import DocItem from "../../components/DocItem";
import MyReservationItem from "../../components/MyReservationItem";
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
      headerTitle: 'Minhas Reservas'
    });
    getList();
  }, []);

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', ()=>{
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getMyReservations();
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
          <C.NoListText>Não há Reservas.</C.NoListText>
        </C.NoListArea>
      }
      <C.List
        data={list} keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><MyReservationItem data={item} refreshFunction={getList} />}
        refreshing={loading} onRefresh={getList}
      />
    </C.Container>
  );
}
