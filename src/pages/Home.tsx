import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const taskDone = tasks.findIndex((task) => task.id === id);

    if (tasks[taskDone].done === false) {
      tasks[taskDone].done = true;
    } else {
      tasks[taskDone].done = false;
    }

    setTasks([...tasks]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const editTask = tasks.findIndex((task) => task.id === taskId);

    if (editTask) {
      tasks[editTask].title = taskNewTitle;
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        handleEditTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
