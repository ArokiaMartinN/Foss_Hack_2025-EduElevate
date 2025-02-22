import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const correctPassword = "1234"; // Set your password

  // Submit Feedback
  const handleSubmit = () => {
    if (feedback.trim()) {
      setFeedbackList((prevFeedback) => [
        ...prevFeedback,
        { id: Date.now().toString(), text: feedback.trim() }
      ]);
      setFeedback('');
    }
  };

  // Open Password Modal
  const requestFeedbackAccess = () => {
    setIsPasswordModalVisible(true);
  };

  // Validate Password
  const handlePasswordSubmit = () => {
    if (enteredPassword === correctPassword) {
      setIsPasswordModalVisible(false);
      generateOtp();
      setIsOtpModalVisible(true);
    } else {
      alert("Incorrect password! Try again.");
    }
  };

  // Generate OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otp);
    console.log("Generated OTP:", otp); // You can replace this with actual SMS/email sending
  };

  // Validate OTP
  const handleOtpSubmit = () => {
    if (userOtp === generatedOtp) {
      setIsOtpModalVisible(false);
      setFeedbackVisible(true);
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <StatusBar style="auto" />
          <Text style={styles.title}>Anonymous Teacher-Student Feedback System</Text>
          <Text style={styles.subtitle}>Share your feedback anonymously:</Text>

          <TextInput
            style={styles.input}
            placeholder="Type your feedback here..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />

          <Button title="Submit Feedback" onPress={handleSubmit} />

          <Text style={styles.feedbackHeading}>View Feedback</Text>
          <TouchableOpacity style={styles.passwordButton} onPress={requestFeedbackAccess}>
            <Text style={styles.passwordButtonText}>Enter Password to View</Text>
          </TouchableOpacity>

          {feedbackVisible && (
            <FlatList
              data={feedbackList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.feedbackItem}>
                  <Text style={styles.feedbackText}>{item.text}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No feedback submitted yet.</Text>
              }
              contentContainerStyle={styles.feedbackList}
            />
          )}

          {/* Password Modal */}
          <Modal visible={isPasswordModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={enteredPassword}
                  onChangeText={setEnteredPassword}
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={handlePasswordSubmit}>
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setIsPasswordModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* OTP Modal */}
          <Modal visible={isOtpModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter OTP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  value={userOtp}
                  onChangeText={setUserOtp}
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleOtpSubmit}>
                    <Text style={styles.modalButtonText}>Verify OTP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setIsOtpModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 16,
    minHeight: 60,
  },
  feedbackHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    color: '#333',
  },
  passwordButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  feedbackText: {
    fontSize: 16,
    color: '#444',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});