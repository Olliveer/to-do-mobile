import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import IconClose from "react-native-vector-icons/AntDesign";
import trashIcon from "../assets/icons/trash/trash.png";
import pen from "../assets/icons/pen.png";
import { Task } from "./TasksList";

type TaskItemProps = {
  index: number;
  task: Task;
  handleEditTask: (id: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
};

export function TaskItem({
  removeTask,
  handleEditTask,
  toggleTaskDone,
  task,
  index,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    handleEditTask(task.id, newTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={
              task.done === true ? styles.taskMarkerDone : styles.taskMarker
            }
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            //TODO - use style prop
            onChangeText={setNewTitle}
            editable
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done === true ? styles.taskTextDone : styles.taskText}
          >
            {newTitle}
          </TextInput>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleCancelEditing}
          >
            <IconClose name="close" size={23} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={pen} />
          </TouchableOpacity>
        )}
        <View style={styles.divider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 12 }}
          //TODO - use onPress (remove task) prop
          disabled={isEditing}
          activeOpacity={isEditing ? 0.2 : 1}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  iconContainer: {
    flexDirection: "row",
  },
});
