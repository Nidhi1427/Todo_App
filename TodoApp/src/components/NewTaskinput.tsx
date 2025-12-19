import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Task = {
  title: string;
  isFinished: boolean;
};

type NewTaskInputProps = {
  onAdd: (newTask: Task) => void;
};

const NewTaskInput = ({ onAdd }: NewTaskInputProps) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    const trimmed = newTask.trim();
    if (!trimmed) {
      return;
    }
    onAdd({ title: trimmed, isFinished: false });
    setNewTask('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={22}
          color="#111827"
        />
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#6b7280"
          onSubmitEditing={handleSubmit}   // allow multiple adds
          blurOnSubmit={false}
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    flex: 1,
    fontFamily: 'InterSemi',
    color: '#111827',
    fontSize: 15,
  },
});

export default NewTaskInput;
