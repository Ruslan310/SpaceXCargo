import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, StyleSheet, View, Animated} from 'react-native';
import {MainStackNavigationParamList} from '../navigation/AppNavigator';
import {Card, FAB, Searchbar} from 'react-native-paper';
import COLORS from '../colors/colors';
import {styled} from 'nativewind';
import FlatList = Animated.FlatList;
import {CompaniesModel} from '../database/models/CompaniesModel';
import {CompaniesColumns} from '../database/columns';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightButtons from './Company/compoonent/RightButtons';

const StyledView = styled(View);
const StyledText = styled(Text);

const Home = () => {
  const database = useDatabase();
  const [companies, setCompanies] = useState<CompaniesModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {navigate} =
    useNavigation<StackNavigationProp<MainStackNavigationParamList>>();
  const companiesList = companies.filter(company =>
    company.name.includes(searchQuery),
  ); //search list
  useEffect(() => {
    //get a list of companies and subscribe to update fields
    const subs = database
      .get<CompaniesModel>(CompaniesModel.table)
      .query()
      .observeWithColumns([
        CompaniesColumns.name,
        CompaniesColumns.email,
        CompaniesColumns.boxes,
      ])
      .subscribe(setCompanies);
    return () => subs.unsubscribe();
  }, [database]);

  const deleteRow = async (id: string) => {
    const fetchedWord = await database
      .get<CompaniesModel>(CompaniesModel.table)
      .find(id); // remove swiped line

    if (fetchedWord) {
      await database.write(async () => {
        await fetchedWord.markAsDeleted(); // syncable
        await fetchedWord.destroyPermanently(); // permanent delete
      });
    }
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  //close\open swipeable line
  let prevOpenedRow: Swipeable | null;
  let row: Array<Swipeable | null> = [];
  let closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  return (
    <>
      <StyledView className="flex-1 m-2">
        <Searchbar
          style={styles.search}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <FlatList
          data={companiesList}
          ListEmptyComponent={() => (
            <StyledView className="items-center m-10">
              <StyledText className="font-bold">
                List of companies is empty...
              </StyledText>
            </StyledView>
          )}
          renderItem={({item, index}) => (
            <Swipeable
              key={item.id}
              ref={ref => (row[index] = ref)}
              onSwipeableWillOpen={() => closeRow(index)}
              friction={2}
              renderRightActions={() => (
                <RightButtons
                  prevOpenedRow={prevOpenedRow}
                  deleteRow={deleteRow}
                  id={item.id}
                />
              )}
              overshootRight={false}>
              <Card
                onPress={() => navigate('Company', {id: item.id})}
                style={styles.cartContainer}>
                <Card.Content>
                  <StyledText>{item.name}</StyledText>
                  <StyledText className="font-medium text-gray-400">
                    {item.email}
                  </StyledText>
                </Card.Content>
              </Card>
            </Swipeable>
          )}
        />
      </StyledView>
      <FAB
        color={COLORS.black100}
        style={styles.createCompanyFab}
        size="small"
        icon="plus"
        onPress={() => navigate('CreateCompany')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    borderRadius: 4,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  createCompanyFab: {
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: COLORS.white100,
    margin: 30,
    right: 0,
    bottom: 0,
  },
  search: {
    marginVertical: 10,
  },
});

export default Home;
