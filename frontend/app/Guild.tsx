import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/themes/Colors";
import { Ionicons } from "@expo/vector-icons";

// Enable smooth layout transitions on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Guild: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [guildName, setGuildName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut(); // Smooth expand/collapse effect
    setDropdownVisible(!isDropdownVisible);
  };

  const handleCreateGuild = () => {
    if (!guildName.trim() || !password.trim()) return;

    console.log("Creating guild:", { guildName, password });
    setDropdownVisible(false);
    setGuildName("");
    setPassword("");
  };

  return (
    <ThemedView style={styles.container}>
      {/* Toggle Dropdown Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDropdown}>
        <ThemedText style={styles.buttonText}>
          {isDropdownVisible ? "Cancel" : "Create Guild"}
        </ThemedText>
        <Ionicons
          name={isDropdownVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.light.onPrimary}
        />
      </TouchableOpacity>

      {/* Dropdown Section */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TextInput
            style={styles.input}
            placeholder="Guild Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={guildName}
            onChangeText={setGuildName}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreateGuild}>
            <ThemedText style={styles.createButtonText}>Create</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  toggleButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: Colors.light.onPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    marginTop: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "rgba(4, 36, 124, 0.95)",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 16,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#5476DE",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Guild;
