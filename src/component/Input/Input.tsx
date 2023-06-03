import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Mode} from '../../model/modelText';
import COLORS from '../../colors/colors';
import {KeyboardTypeOptions} from '../../model/modelKeyboard';
import {formatPrice} from '../../services/formatPrice';

type Props = {
  label: string;
  value: string;
  change: (value: string) => void;
  style?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  typeText?: string;
  mode?: Mode;
};

const Input = ({
  label,
  value,
  change,
  style,
  keyboardType,
  mode = Mode.Outlined,
  typeText,
}: Props) => {
  const onChange = (text: string) => {
    if (typeText === 'number') {
      text = formatPrice(text);
    }
    change(text);
  };
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChange}
      style={[styles.input, style]}
      keyboardType={keyboardType}
      mode={mode}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white100,
    marginVertical: 10,
  },
});

export default Input;
