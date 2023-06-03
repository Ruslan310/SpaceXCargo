import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';
import COLORS from '../../colors/colors';
import {Mode} from '../../model/modelButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  pressCancel: () => any;
  presSave: () => any;
  isDisabledSubmit?: boolean;
  style?: StyleProp<ViewStyle>;
  mode?: Mode;
};

const SaveBottomComponent = ({
  pressCancel,
  presSave,
  isDisabledSubmit,
  style,
  mode = Mode.Contained,
}: Props) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.submitButton, {paddingBottom: bottom + 10}, style]}>
      <Button
        style={styles.submit}
        disabled={isDisabledSubmit}
        mode={mode}
        onPress={presSave}>
        Save
      </Button>
      <Button
        style={[styles.submit, {borderColor: COLORS.blueNavy70}]}
        onPress={pressCancel}>
        Cansel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderTopWidth: 1,
    borderColor: COLORS.grey40,
    borderStyle: 'solid',
    paddingTop: 10,
    backgroundColor: COLORS.white100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submit: {
    borderWidth: 1,
    marginHorizontal: 15,
    width: 100,
  },
});

export default SaveBottomComponent;
