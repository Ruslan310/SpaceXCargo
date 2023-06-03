import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styled} from 'nativewind';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackNavigationParamList} from '../../navigation/AppNavigator';
import {CompaniesModel} from '../../database/models/CompaniesModel';
import {useRoute} from '@react-navigation/native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {Input, SaveBottomComponent} from '../../component';
import {Mode} from '../../model/modelKeyboard';

type Props = StackScreenProps<MainStackNavigationParamList, 'Company'>;
const StyledView = styled(View);
const StyledText = styled(Text);

let reg = /[0-9]+([.][0-9]+)?/g;
const countBox = (value: string) => {
  const nums = value.match(reg); // find all possible numbers in a string
  const sum =
    (nums && nums.reduce((acc, numStr) => acc + parseFloat(numStr), 0)) || 0; // add up the numbers
  let lengthLine = value.length ? 1 : 0;
  return Math.floor(sum / 10.1) + lengthLine;
};

const Company = ({navigation: {goBack}}: Props) => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const database = useDatabase();
  const [company, setCompany] = useState<CompaniesModel>();
  const [boxes, setBoxes] = useState<string>('');
  const [bays, setBays] = useState<number>(0);

  const lastEl = boxes.length;
  const isPoint = boxes[lastEl - 1] === '.';
  const isDisabledSave = company?.boxes === boxes || isPoint;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedWord = await database
        .get<CompaniesModel>(CompaniesModel.table)
        .find(id);
      setCompany(fetchedWord);
      setBays(countBox(fetchedWord.boxes));
      setBoxes(fetchedWord.boxes);
    };
    fetchData().then();
  }, [database, id]);

  const handleBaysCount = (value: string) => {
    const nums = value.match(reg); // find all possible numbers in a string
    const sum =
      (nums && nums.reduce((acc, numStr) => acc + parseFloat(numStr), 0)) || 0; // add up the numbers
    let result = countBox(value);
    setBoxes(value);
    if (!value || sum === 0) {
      return setBays(0);
    }
    result && setBays(result);
  };

  const saveBoxes = async () => {
    if (company) {
      await database.write(async () => {
        await company.update(el => {
          el.boxes = boxes;
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
        <StyledText className="text-xl">{company.name}</StyledText>
        <StyledText className="text-base text-gray-400">
          {company.email}
        </StyledText>
        <StyledText className="text-base my-10">
          Number of required cargo bays {bays}
        </StyledText>
        <Input
          typeText={Mode.Number}
          label="Cargo boxes"
          value={boxes}
          change={handleBaysCount}
        />
      </StyledView>
      <SaveBottomComponent
        presSave={saveBoxes}
        pressCancel={() => goBack()}
        isDisabledSubmit={bays < 1 || isDisabledSave}
      />
    </StyledView>
  );
};

export default Company;
