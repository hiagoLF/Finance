import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {styles} from './styles';
import {FC, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {convertToBrlMoney} from '../../../utils/money';

type NewSectionModalProps = {
  visible: boolean;
  onCreate: (name: string, cost: number, installmentsAmount: number) => void;
  onDismiss: () => void;
};

export const NewItemModal: FC<NewSectionModalProps> = ({
  visible,
  onCreate,
  onDismiss,
}) => {
  const [name, setItemName] = useState('');
  const [cost, setItemCost] = useState('R$ 00,00');
  const [installmentsAmount, setItemInstallmentsAmount] = useState('1');

  const handleCreateNewItemButtonPress = () => {
    const formatedCost = Number(cost.match(/\d/g)?.join(''));
    const installmentsAmountFormated = Number(
      installmentsAmount.match(/\d/g)?.join(''),
    );

    if (!name.length || !formatedCost || !installmentsAmountFormated) {
      return;
    }

    onCreate(name, formatedCost, installmentsAmountFormated);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.ModalContainerStyle}>
        <ScrollView>
          <View style={styles.ModalScrollStyle}>
            <Text variant="titleLarge" style={styles.ModalHeaderText}>
              Criar Novo Ítem em Cartão de Hiago
            </Text>
            <TextInput
              value={name}
              onChangeText={setItemName}
              label="Nome do ítem"
              mode="flat"
              placeholder="Digite o nome do ítem"
            />
            <TextInput
              value={cost}
              onChangeText={val => setItemCost(convertToBrlMoney(val))}
              label="Valor do Ítem ou da parcela"
              mode="flat"
              placeholder="Digite o valor do Ítem ou da parcela"
              inputMode="numeric"
            />
            <TextInput
              value={installmentsAmount}
              onChangeText={setItemInstallmentsAmount}
              label="Número de parcelas"
              mode="flat"
              placeholder="Digite o número de parcelas"
              inputMode="numeric"
            />
            <Button mode="contained" onPress={handleCreateNewItemButtonPress}>
              CRIAR ITEM
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};
