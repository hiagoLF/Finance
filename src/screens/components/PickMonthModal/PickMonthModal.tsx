import {FC, useState} from 'react';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {styles} from './styles';
import RNPickerSelect from 'react-native-picker-select';
import {yearsList} from '../../../mock/years';
import {monthsList} from '../../../mock/months';

type PickMonthModalProps = {
  visible: boolean;
  onPick: (year: string, month: string) => void;
  onDismiss: () => void;
};

export const PickMonthModal: FC<PickMonthModalProps> = ({
  visible,
  onPick,
  onDismiss,
}) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handlePickValueButtonPress = () => {
    onPick(selectedYear, selectedMonth);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.ModalContainerStyle}>
        <Text variant="titleLarge" style={styles.ModalHeaderText}>
          Escolha o mês e o ano
        </Text>
        <RNPickerSelect
          value={selectedMonth}
          placeholder={{label: 'Selecione um mês'}}
          onValueChange={setSelectedMonth}
          items={monthsList}
        />
        <RNPickerSelect
          value={selectedYear}
          placeholder={{label: 'Selecione um ano'}}
          onValueChange={setSelectedYear}
          items={yearsList}
        />
        <Button mode="contained" onPress={handlePickValueButtonPress}>
          APLICAR
        </Button>
      </Modal>
    </Portal>
  );
};
