import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AnimatedView = Animated.createAnimatedComponent(View);

type Task = {
  title: string;
  isFinished: boolean;
};

type RightActionsProps = {
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  onDelete: () => void;
};

const RightActions = ({ dragAnimatedValue, onDelete }: RightActionsProps) => {
  const animatedStyles = {
    transform: [
      {
        translateX: dragAnimatedValue.interpolate({
          inputRange: [-40, 0],
          outputRange: [0, 40],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <AnimatedView
      style={[
        {
          backgroundColor: 'crimson',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        },
        animatedStyles,
      ]}
    >
      <MaterialCommunityIcons
        onPress={onDelete}
        name="delete"
        size={20}
        color="white"
      />
    </AnimatedView>
  );
};

type TaskListItemProps = {
  task: Task;
  onItemPress: () => void;
  onDelete: () => void;
};

const TaskListItem = ({ task, onItemPress, onDelete }: TaskListItemProps) => {
  return (
    <Swipeable
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RightActions
          dragAnimatedValue={dragAnimatedValue}
          onDelete={onDelete}
        />
      )}
    >
      <Pressable onPress={onItemPress} style={styles.taskContainer}>
        <MaterialCommunityIcons
          name={
            task.isFinished
              ? 'checkbox-marked-circle-outline'
              : 'checkbox-blank-circle-outline'
          }
          size={24}
          color={task.isFinished ? 'gray' : 'black'}
        />
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine: task.isFinished ? 'line-through' : 'none',
              color: task.isFinished ? 'gray' : 'black',
            },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskTitle: {
    fontFamily: 'InterSemi',
    fontSize: 15,
    flex: 1,
    color: 'black',
  },
});

export default TaskListItem;
