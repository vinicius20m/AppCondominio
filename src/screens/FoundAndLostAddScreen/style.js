import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #F5F6FA;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 20px;
  `,
  PhotoArea: styled.View``,
  Title: styled.Text`
    font-size: 17px;
    color: #000;
    margin: 10px 0;
  `,
  Field: styled.TextInput`
    background-color: #FFF;
    border-width: 1px;
    border-color: #CCC;
    padding: 10px;
    color: #000;
    margin-bottom: 15px;
    font-size: 15px;
    border-radius: 5px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  `,
  ButtonText: styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 15px;
  `,
  PhotoItem: styled.Image`
    height: 150px;
    border-radius: 5px;
    margin-bottom: 10px;
  `,
};
