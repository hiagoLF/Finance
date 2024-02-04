import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {styles} from './styles';
import {FC, useState} from 'react';

type NewSectionModalProps = {
  visible: boolean;
  onCreate: (name: string) => void;
  onDismiss: () => void;
};

export const NewSectionModal: FC<NewSectionModalProps> = ({
  visible,
  onCreate,
  onDismiss,
}) => {
  const [sessionName, setSessionName] = useState('');

  const handleCreateNewSessionButtonPress = () => {
    if (sessionName.length) {
      onCreate(sessionName);
      setSessionName('');
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.ModalContainerStyle}>
        <Text variant="titleLarge" style={styles.ModalHeaderText}>
          Criar Nova Sessão
        </Text>
        <TextInput
          value={sessionName}
          onChangeText={setSessionName}
          label="Nome da sessão"
          mode="flat"
          placeholder="Digite o nome da sessão"
        />
        <Button mode="contained" onPress={handleCreateNewSessionButtonPress}>
          CRIAR
        </Button>
      </Modal>
    </Portal>
  );
};
