import {SafeAreaView, ScrollView, View} from 'react-native';
import {Card, FAB, Icon, List, Text} from 'react-native-paper';
import {styles} from './styles';
import {PickMonthModal} from '../components/PickMonthModal/PickMonthModal';
import {useEffect, useMemo, useState} from 'react';
import {NewSectionModal} from '../components/NewSectionModal/NewSectionModal';
import {NewItemModal} from '../components/NewItemModal/NewItemModal';
import storage, {GetMonthDataProps, MonthResult} from '../../storage';
import {monthsList} from '../../mock/months';
import {convertToBrlMoney} from '../../utils/money';

export const HomeScreen = () => {
  const [selectingMonth, setSelectingMonth] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [creatingNewItem, setCreatingNewItem] = useState({
    cession: '',
    creating: false,
  });
  const [selectedMonth, setSelectedMonth] = useState({
    month: 'jan',
    year: '2024',
  });
  const [monthData, setMonthData] = useState<MonthResult | undefined>();

  const getSelectedMonthData = async () => {
    const monthResult = await storage.getMonthData(selectedMonth);
    setMonthData(monthResult);
  };

  const getMonth = async ({month, year}: GetMonthDataProps) => {
    const monthResult = await storage.getMonthData({month, year});
    setMonthData(monthResult);
  };

  const handlePickMonth = (year: string, month: string) => {
    setSelectedMonth({month, year});
    setSelectingMonth(false);
  };

  const handleCreateNewSession = async (name: string) => {
    const created = await storage.createNewSession(name);
    if (created) {
      getSelectedMonthData();
      setCreatingSession(false);
    }
  };

  const handleCreateNewItem = (
    name: string,
    cost: number,
    installmentsAmount: number,
  ) => {
    storage.createNewItem({
      name,
      cost,
      installmentsAmount,
      cessionId: creatingNewItem.cession,
      firstMonth: selectedMonth,
    });
    setCreatingNewItem({cession: '', creating: false});
  };

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const currentMonthAbbreviation = monthsList.map(month => month.value)[
      currentMonth - 1
    ];

    getMonth({
      month: currentMonthAbbreviation,
      year: currentYear.toString(),
    });
  }, []);

  const formatedData = useMemo(() => {
    return {
      year: monthData?.year,
      month: monthsList.find(month => month.value === monthData?.month)?.label,
      deposit: convertToBrlMoney(monthData?.deposit.toString() || ''),
      outflow: convertToBrlMoney(monthData?.outflow.toString() || ''),
      accumulated: convertToBrlMoney(monthData?.accumulated.toString() || ''),
      cessions: monthData?.cessions,
    };
  }, [monthData?.year, monthData?.month, monthData?.cessions.length]);

  return (
    <SafeAreaView>
      <ScrollView>
        <PickMonthModal
          visible={selectingMonth}
          onPick={handlePickMonth}
          onDismiss={() => setSelectingMonth(false)}
        />
        <NewSectionModal
          visible={creatingSession}
          onCreate={handleCreateNewSession}
          onDismiss={() => setCreatingSession(false)}
        />
        <NewItemModal
          visible={creatingNewItem.creating}
          onCreate={handleCreateNewItem}
          onDismiss={() =>
            setCreatingNewItem(({cession}) => ({cession, creating: false}))
          }
        />

        <View style={styles.HomeScreenContainer}>
          {/* Header */}
          <Text variant="displayMedium">Finance</Text>

          {/* Month */}
          <Card onPress={() => setSelectingMonth(true)}>
            <Card.Title title="MÊS" />
            <Card.Content>
              <Text style={[styles.CardValuesText]} variant="titleLarge">
                {formatedData.month} / {formatedData.year}
              </Text>
            </Card.Content>
          </Card>

          {/* INPUT */}
          <Card>
            <Card.Title title="ENTRADA" />
            <Card.Content>
              <Text
                style={[styles.CardValuesText, styles.GreenText]}
                variant="titleLarge">
                {formatedData.deposit}
              </Text>
            </Card.Content>
          </Card>

          {/* OUTPUT */}
          <Card>
            <Card.Title title="SAÍDA" />
            <Card.Content>
              <Text
                style={[styles.CardValuesText, styles.RedText]}
                variant="titleLarge">
                {formatedData.outflow}
              </Text>
            </Card.Content>
          </Card>

          {/* Accumulated */}
          <Card>
            <Card.Title title="ACUMULADO" />
            <Card.Content>
              <Text variant="titleLarge">{formatedData.accumulated}</Text>
            </Card.Content>
          </Card>

          {/* List */}
          <List.Section title="Lista de ítens">
            {formatedData.cessions?.map(cession => (
              <List.Accordion
                key={cession.id}
                title={cession.name}
                left={props => <List.Icon {...props} icon="folder" />}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
                <List.Item title="Terceiro item" />
                <List.Item
                  onPress={() =>
                    setCreatingNewItem({cession: cession.id, creating: true})
                  }
                  title={
                    <View style={styles.NewItemContainer}>
                      <Text style={styles.NewItemText}>Adicionar</Text>
                      <Icon size={20} source={'plus'} color="#0300bc" />
                    </View>
                  }
                />
              </List.Accordion>
            ))}
          </List.Section>
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        onPress={() => setCreatingSession(true)}
        style={styles.NewSectionFab}
      />
    </SafeAreaView>
  );
};
