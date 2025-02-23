import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import TaskCard from "@/components/TaskCard";
import { Ionicons } from "@expo/vector-icons";

const initialTasks = [
  {
    id: "1",
    title: "Meeting with Client",
    description: "Discuss project details and finalize requirements.",
    dueDate: "2024-04-24T10:05:00Z",
  },
  {
    id: "2",
    title: "Design Cards",
    description: "Create and finalize business card designs for the event.",
    dueDate: "2024-04-24T11:20:00Z",
  },
];

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      {
        id: (tasks.length + 1).toString(),
        title: newTask.title,
        description: newTask.description || "No description",
        dueDate: newTask.dueDate || "No due date",
      },
    ]);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TaskCard
              key={item.id}
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
            />
          </View>
        )}
      />

      <Pressable style={styles.fab} onPress={openModal}>
        <Ionicons name="add" size={30} color="white" />
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Due Date (YYYY-MM-DD)"
              value={newTask.dueDate}
              onChangeText={(text) => setNewTask({ ...newTask, dueDate: text })}
            />
            <View style={styles.buttonRow}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.createButton]} onPress={addTask}>
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ Guild Management Button */}
      <Pressable style={styles.guildButton} onPress={() => router.push("/Guild")}> 
        <Text style={styles.guildButtonText}>Guild</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  task: {
    flexGrow: 1,
    margin: 10,
  },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    marginRight: 5,
  },
  createButton: {
    backgroundColor: "#4CD964",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  guildButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  guildButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
