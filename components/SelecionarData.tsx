import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

interface DateInputProps {
  onDateChange?: (date: string | null) => void;
}

const SelecionarData: React.FC<DateInputProps> = ({ onDateChange }) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const validateDate = (input: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(regex);

    if (!match) {
      setError('Formato inválido. Use DD/MM/AAAA.');
      onDateChange?.(null);
      return false;
    }

    const [, dayStr, monthStr, yearStr] = match;
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (month < 1 || month > 12) {
      setError('Mês inválido.');
      onDateChange?.(null);
      return false;
    }

    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1 || day > daysInMonth[month - 1]) {
      setError('Dia inválido para o mês.');
      onDateChange?.(null);
      return false;
    }

    setError('');
    onDateChange?.(input);
    return true;
  };

  const handleChange = (input: string) => {
    setDate(input);
    validateDate(input);
  };

  return (
    <View style={styles.container}>
      <TextInputMask
        type={'custom'}
        options={{ mask: '99/99/9999' }}
        style={styles.input}
        value={date}
        onChangeText={handleChange}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default SelecionarData;
