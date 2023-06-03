import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {IconSVG} from '../../../component';
import {Alert, StyleSheet, Text} from 'react-native';
import COLORS from '../../../colors/colors';
import {styled} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackNavigationParamList} from '../../../navigation/AppNavigator';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type Props = {
  id: string;
  deleteRow: (id: string) => void;
  prevOpenedRow: Swipeable | null;
};
const RightButtons = ({id, deleteRow, prevOpenedRow}: Props) => {
  const {navigate} =
    useNavigation<StackNavigationProp<MainStackNavigationParamList>>();
  const StyledText = styled(Text);
  const handleRemoveTransaction = () => {
    let message = 'Are you sure you want to delete this company?';
    Alert.alert(
      'Delete company',
      message,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => deleteRow(id)},
      ],
      {cancelable: false},
    );
  };
  const goToEditCompany = () => {
    prevOpenedRow && prevOpenedRow.close();
    navigate('EditCompany', {id: id});
  };

  return (
    <>
      <RectButton
        style={[styles.activeButton, styles.delete]}
        onPress={handleRemoveTransaction}>
        <IconSVG type="trash" size={90} />
        <StyledText className="font-medium text-white">Delete</StyledText>
      </RectButton>
      <RectButton
        style={[styles.activeButton, styles.edit]}
        onPress={goToEditCompany}>
        <IconSVG type="check" size={90} />
        <StyledText className="font-medium text-white">Edit</StyledText>
      </RectButton>
    </>
  );
};

const styles = StyleSheet.create({
  delete: {
    backgroundColor: COLORS.pink100,
  },
  edit: {
    backgroundColor: COLORS.brown80,
  },
  activeButton: {
    width: 60,
    borderRadius: 4,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RightButtons;
