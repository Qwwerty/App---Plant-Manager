import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Settings() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>()

  function handleToBack() {
    navigation.navigate('PlantSelect');
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name)
      return Alert.alert('Me diz como chamar você 😢');

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
    } catch (error) {
      Alert.alert('Não foi possível salvar o seu nome. 😢');
    }

    navigation.navigate('Confirmation', {
      title: 'Prontinho',
      subtitle: 'Seu nome foi alterado.',
      buttonTitle: 'Confirmar',
      icon: 'smile',
      nextScreen: 'Welcome',
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Header />
            </View>

            <View style={styles.settingsAbout}>
              <Text style={styles.title}>
                Alterar seu Nome
          </Text>
              <Text style={styles.subtitle}>
                Bastá  alterar seu nome no campo abaixo
                e estar clicando no botão alterar.
          </Text>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.actions}>
                <View style={styles.buttonAlterar}>
                  <Button 
                    title="Alterar" 
                    onPress={handleSubmit}
                  />
                </View>
                <View>
                  <Button
                    title="Voltar"
                    color={colors.red}
                    onPress={handleToBack}
                  />
                </View>
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  settingsAbout: {
    flex: 1,
    width: '100%',
    marginTop: 100,
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  actions: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },

  buttonAlterar: {
    paddingBottom: 10,
  }
});