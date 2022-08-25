import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import WallItem from "../../components/WallItem";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [wallList, setWallList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Mural de Avisos'
    });
    getWall();
  }, []);

  const getWall = async () => {
    setWallList([]);
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === '') {
      setWallList(result.list);
    } else {
      Alert.alert('Algo deu errado.', result.error);
    }
  }

  return (
    <C.Container>
      {!loading && wallList.length === 0 &&
        <C.NoListArea>
          <C.NoListText>Não há avisos.</C.NoListText>
        </C.NoListArea>
      }
      <C.List
        data={wallList} keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=><WallItem data={item} />}
        refreshing={loading} onRefresh={getWall}
      />
    </C.Container>
  );
}
