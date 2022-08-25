import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    padding: 20px;
    background-color: #F5F6FA;
  `,
  Field: styled.TextInput`
    border-width: 1px;
    border-color: #CCC;
    background-color: #FFF;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 15px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 15px;
  `,
  ButtonText: styled.Text`
    color: #FFF;
    font-size: 15px;
    font-weight: bold;
  `,
};
