import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import RFIDScanner, {RFIDScannerEvent} from 'react-native-zebra-rfid';

const App = () => {
  useEffect(() => {
    const onRfidResult = tags => {
      console.info('TAGS: ' + JSON.stringify(tags));
    };

    RFIDScanner.init();

    RFIDScanner.on(RFIDScannerEvent.TAGS, onRfidResult);

    return () => {
      RFIDScanner.removeon(RFIDScannerEvent.TAGS, onRfidResult);
      RFIDScanner.shutdown();
    };
  }, []);

  const startRfidScan = () => {
    RFIDScanner.read();
  };

  const stopRfidScan = () => {
    RFIDScanner.cancel();
  };

  return (
    <View>
      <Text>Dados RFID: </Text>
      <Button title="Iniciar Leitura" onPress={startRfidScan} />
      <Button title="Parar Leitura" onPress={stopRfidScan} />
    </View>
  );
};

export default App;
