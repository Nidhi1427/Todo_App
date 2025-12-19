import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { CurvedTransition } from 'react-native-reanimated';

import TaskListItem from '../components/TaskListitem';
import NewTaskInput from '../components/NewTaskinput';

export type Task = {
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  { title: 'Setup structure', isFinished: true },
  { title: 'Render a list of tasks', isFinished: false },
  { title: 'Add a new task', isFinished: false },
  { title: 'Change the status of a task', isFinished: false },
  { title: 'Separate in 2 tabs: todo and complete', isFinished: false },
];

type Tab = 'ALL' | 'TODO' | 'FINISHED';

const TodoScreen = () => {
  console.log('TodoScreen rendered');

  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<Tab>('ALL');

  const filteredTasks = tasks.filter(task => {
    if (tab === 'TODO' && task.isFinished) return false;
    if (tab === 'FINISHED' && !task.isFinished) return false;
    if (!searchQuery.trim()) return true;
    return task.title
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase().trim());
  });

  const onItemPressed = (index: number) => {
    setTasks(currentTasks => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  const onDeleteTask = (index: number) => {
    setTasks(currentTasks => currentTasks.filter((_, i) => i !== index));
  };

  const onAddTask = (newTask: Task) => {
    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.page}>
      {/* Background layer */}
      <View style={styles.background} />

      {/* Content overlay */}
      <View style={styles.overlay}>
        <SafeAreaView
          edges={['bottom']}
          style={[styles.contentWrapper, { paddingTop: 35 }]}
        >
          <View style={styles.tabsRow}>
            <Button title="All" onPress={() => setTab('ALL')} />
            <Button title="Todo" onPress={() => setTab('TODO')} />
            <Button title="Finished" onPress={() => setTab('FINISHED')} />
          </View>

          <View style={styles.card}>
            <Animated.FlatList
              data={filteredTasks}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              contentContainerStyle={styles.listContent}
              style={styles.list}
              itemLayoutAnimation={CurvedTransition.delay(50)}
              contentInsetAdjustmentBehavior="automatic"
              renderItem={({ item, index }) => (
                <TaskListItem
                  task={item}
                  onItemPress={() => onItemPressed(index)}
                  onDelete={() => onDeleteTask(index)}
                />
              )}
              ListFooterComponent={<NewTaskInput onAdd={onAddTask} />}
            />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ede9fe', // soft lavender
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ede9fe',
  },
  overlay: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    marginTop: 16,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#ffe4d6', // peach card
    borderWidth: 1,
    borderColor: '#fec6a1',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  listContent: {
    gap: 8,
    padding: 12,
  },
  list: {
    minHeight: 300,
  },
});

export default TodoScreen;
