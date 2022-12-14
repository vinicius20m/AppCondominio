import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import DocItem from "../../components/DocItem";
import LostItem from "../../components/LostItem";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import C from './style';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [lostList, setLostList] = useState([]);
  const [recoveredList, setRecoveredList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Achados e Perdidos',
      headerRight: () => (
        <C.AddButton onPress={handleAddItem} >
          <Icon name="plus" size={24} color="#000" />
        </C.AddButton>
      )
    });
    getFoundAndLost();
  }, []);

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', ()=>{
      getFoundAndLost();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddItem = () => {
    navigation.navigate('FoundAndLostAddScreen');
  }

  const getFoundAndLost = async () => {
    setLostList([]);
    setRecoveredList([]);
    setLoading(true);
    const result = await api.getFoundAndLost();
    setLoading(false);
    if (result.error === '') {
      setLostList(result.lost);
      setRecoveredList(result.recovered);
    } else {
      Alert.alert('Algo deu errado.', result.error);
    }
  }

  return (
    <C.Container>
      <C.Scroller>
        {loading &&
          <C.LoadingIcon color="#8B63E7" size="large" />
        }
        {!loading && lostList.length === 0 && recoveredList.length === 0 &&
          <C.NoListArea>
            <C.NoListText>Não há itens perdidos/recuperados.</C.NoListText>
          </C.NoListArea>
        }

        {!loading && lostList.length > 0 &&
          <>
            <C.Title>Itens Perdidos</C.Title>
            <C.ProductScroller
              horizontal={true} showsHorizontalScrollIndicator={false}
            >
              {lostList.map((item, index)=>(
                <LostItem key={index} data={item} showButton={true} refreshFunction={getFoundAndLost} />
              ))}
            </C.ProductScroller>
          </>
        }

        {!loading && recoveredList.length > 0 &&
          <>
            <C.Title>Itens Recuperados</C.Title>
            <C.ProductScroller
              horizontal={true} showsHorizontalScrollIndicator={false}
            >
              {recoveredList.map((item, index)=>(
                <LostItem key={index} data={item} showButton={false} />
              ))}
            </C.ProductScroller>
          </>
        }
      </C.Scroller>
    </C.Container>
  );
}
