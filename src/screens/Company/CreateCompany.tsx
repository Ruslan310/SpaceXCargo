import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackNavigationParamList} from '../../navigation/AppNavigator';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {View, Alert} from 'react-native';
import {Input, SaveBottomComponent} from '../../component';
import {CompaniesModel} from '../../database/models/CompaniesModel';
import {styled} from 'nativewind';

type Props = StackScreenProps<MainStackNavigationParamList, 'CreateCompany'>;
const StyledView = styled(View);

const CreateCompany = ({navigation: {goBack}}: Props) => {
  const database = useDatabase();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const isDisabledSave = name === '' || email === '';

  const validateFields = () => {
    return !(name === '' || email === '');
  };
  const createNewCompany = async () => {
    if (validateFields()) {
      const newCompany = {
        name,
        email,
        boxes: '',
      };

      await database.write(async () => {
        await database.get(CompaniesModel.table).create(company => {
          Object.assign(company, newCompany);
        });
      });
      goBack();
    } else {
      Alert.alert(
        'Error',
        'Please fill in all fields correctly.',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <StyledView className="flex-1 justify-between">
      <StyledView className="m-3">
        <Input label="Company name" value={name} change={setName} />
        <Input label="Company mail" value={email} change={setEmail} />
      </StyledView>
      <SaveBottomComponent
        presSave={createNewCompany}
        pressCancel={() => goBack()}
        isDisabledSubmit={isDisabledSave}
      />
    </StyledView>
  );
};
export default CreateCompany;
