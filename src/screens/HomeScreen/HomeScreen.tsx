import {SafeAreaView, ScrollView, View} from 'react-native';
import {Card, FAB, Icon, List, Text} from 'react-native-paper';
import {styles} from './styles';
import {PickMonthModal} from '../components/PickMonthModal/PickMonthModal';
import {useState} from 'react';
import {NewSectionModal} from '../components/NewSectionModal/NewSectionModal';
import {NewItemModal} from '../components/NewItemModal/NewItemModal';
import storage from '../../storage';

export const HomeScreen = () => {
  const [selectingMonth, setSelectingMonth] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    month: 'jan',
    year: '2024',
  });

  const getMonthData = async () => {
    const monthData = await storage.getMonthData(selectedMonth);
    console.log('New Month Data >>> ', monthData);
  };

  const handlePickMonth = (year: string, month: string) => {
    setSelectedMonth({month, year});
    setSelectingMonth(false);
  };

  const handleCreateNewSession = async (name: string) => {
    const created = await storage.createNewSession(name);
    if (created) {
      getMonthData();
    }
  };

  const handleCreateNewItem = (
    name: string,
    cost: number,
    installmentsAmount: number,
  ) => {
    console.log('Criando novo item, ', {name, cost, installmentsAmount});
  };

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
          visible={creatingNewItem}
          onCreate={handleCreateNewItem}
          onDismiss={() => setCreatingNewItem(false)}
        />

        <View style={styles.HomeScreenContainer}>
          {/* Header */}
          <Text variant="displayMedium">Finance</Text>

          {/* Month */}
          <Card onPress={() => setSelectingMonth(true)}>
            <Card.Title title="MÊS" />
            <Card.Content>
              <Text style={[styles.CardValuesText]} variant="titleLarge">
                Janeiro / 2024
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
                R$ 4.500,00
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
                R$ 3.750,00
              </Text>
            </Card.Content>
          </Card>

          {/* Accumulated */}
          <Card>
            <Card.Title title="ACUMULADO" />
            <Card.Content>
              <Text variant="titleLarge">R$ 950,00</Text>
            </Card.Content>
          </Card>

          {/* List */}
          <List.Section title="Lista de ítens">
            <List.Accordion
              title="Cartão de Hiago"
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title="First item" />
              <List.Item title="Second item" />
              <List.Item title="Terceiro item" />
              <List.Item
                onPress={() => setCreatingNewItem(true)}
                title={
                  <View style={styles.NewItemContainer}>
                    <Text style={styles.NewItemText}>Adicionar</Text>
                    <Icon size={20} source={'plus'} color="#0300bc" />
                  </View>
                }
              />
            </List.Accordion>
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
