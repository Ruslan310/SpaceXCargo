import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {CompaniesModel} from '../../database/models/CompaniesModel';
import {Input, SaveBottomComponent} from '../../component';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackNavigationParamList} from '../../navigation/AppNavigator';
import {styled} from 'nativewind';
import {useRoute} from '@react-navigation/native';

type Props = StackScreenProps<MainStackNavigationParamList, 'EditCompany'>;
const StyledView = styled(View);

const EditCompany = ({navigation: {goBack}}: Props) => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const database = useDatabase();
  const [company, setCompany] = useState<CompaniesModel>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const isDisabledSave = name !== company?.name || email !== company?.email;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedWord = await database
        .get<CompaniesModel>(CompaniesModel.table)
        .find(id);
      setCompany(fetchedWord);
      setName(fetchedWord.name);
      setEmail(fetchedWord.email);
    };
    fetchData().then();
  }, [database, id]);

  const editCompany = async () => {
    if (company) {
      await database.write(async () => {
        await company.update(el => {
          el.name = name;
          el.email = email;
        });
      });
      setCompany(undefined);
      goBack();
    }
  };

  if (!company) {
    return null;
  }

  return (
    <StyledView className="flex-1 justify-between">
      <StyledView className="m-3">
        <Input label="Company name" value={name} change={setName} />
        <Input label="Company mail" value={email} change={setEmail} />
      </StyledView>
      <SaveBottomComponent
        presSave={editCompany}
        pressCancel={() => goBack()}
        isDisabledSubmit={!isDisabledSave}
      />
    </StyledView>
  );
};

export default EditCompany;
