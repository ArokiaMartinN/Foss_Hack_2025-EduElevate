import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';

const SubjectListPage = ({ onSelectSubject }) => {
  const subjects = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      semester: "3rd",
      credits: "4",
      faculty: {
        name: "Dr. Kirubakaran",
        designation: "Associate Professor",
        department: "Computer Science",
      }
    },
    {
      id: 2,
      name: "Database Management",
      code: "CS202",
      semester: "3rd",
      credits: "4",
      faculty: {
        name: "Dr. Rajesh",
        designation: "Assistant Professor",
        department: "Computer Science",
      }
    },
    {
      id: 3,
      name: "Computer Networks",
      code: "CS203",
      semester: "3rd",
      credits: "3",
      faculty: {
        name: "Dr. Priya",
        designation: "Associate Professor",
        department: "Computer Science",
      }
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Subjects</Text>
          <Text style={styles.headerSubtitle}>Computer Science Department</Text>
        </View>

        <View style={styles.subjectList}>
          {subjects.map(subject => (
            <TouchableOpacity
              key={subject.id}
              style={styles.subjectCard}
              onPress={() => onSelectSubject(subject)}
            >
              <Text style={styles.subjectName}>{subject.name}</Text>
              <View style={styles.subjectDetails}>
                <Text style={styles.subjectCode}>Code: {subject.code}</Text>
                <Text style={styles.subjectInfo}>Semester: {subject.semester}</Text>
                <Text style={styles.subjectInfo}>Credits: {subject.credits}</Text>
                <Text style={styles.facultyName}>Faculty: {subject.faculty.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SubjectManagementPage = ({ subject, onBack }) => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExceptionDialog, setShowExceptionDialog] = useState(false);
  const [exceptionInput, setExceptionInput] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editMark, setEditMark] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: "Arokia Martin", mark: 85, attendance: "present" },
    { id: 2, name: "Harish", mark: 92, attendance: "absent" },
    { id: 3, name: "Manoj", mark: 78, attendance: "present" },
    { id: 4, name: "Kevin", mark: 95, attendance: "present" },
    { id: 5, name: "Suriya", mark: 88, attendance: "absent" },
  ]);

  const handleEditMark = (student) => {
    setEditingStudent(student);
    setEditMark(student.mark.toString());
  };

  const handleUpdateMark = () => {
    const newMark = parseInt(editMark);
    if (isNaN(newMark) || newMark < 0 || newMark > 100) {
      Alert.alert("Invalid Mark", "Please enter a mark between 0 and 100");
      return;
    }

    setStudents(students.map(student => 
      student.id === editingStudent.id
        ? { ...student, mark: newMark }
        : student
    ));
    setEditingStudent(null);
    setEditMark('');
  };

  const markAllAttendance = (status) => {
    setStudents(students.map(student => ({
      ...student,
      attendance: status
    })));
  };

  const handleExceptionSubmit = () => {
    if (!exceptionInput.trim()) {
      Alert.alert("Error", "Please enter student names");
      return;
    }

    const absentNames = exceptionInput.split(',').map(name => name.trim().toLowerCase());
    setStudents(students.map(student => ({
      ...student,
      attendance: absentNames.includes(student.name.toLowerCase()) ? 'absent' : 'present'
    })));

    setExceptionInput('');
    setShowExceptionDialog(false);
  };

  const toggleAttendance = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId
        ? { ...student, attendance: student.attendance === 'present' ? 'absent' : 'present' }
        : student
    ));
  };

  const filteredStudents = students.filter(student => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Subjects</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>{subject.faculty.name}</Text>
          <Text style={styles.headerSubtitle}>{subject.faculty.designation}</Text>
          <Text style={styles.headerSubtitle}>{subject.faculty.department}</Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
            onPress={() => setActiveTab('attendance')}
          >
            <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>
              Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'marks' && styles.activeTab]}
            onPress={() => setActiveTab('marks')}
          >
            <Text style={[styles.tabText, activeTab === 'marks' && styles.activeTabText]}>
              Marks
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Subject Details</Text>
          <View style={styles.subjectGrid}>
            <View style={styles.subjectItem}>
              <Text style={styles.label}>Subject Name</Text>
              <Text>{subject.name}</Text>
            </View>
            <View style={styles.subjectItem}>
              <Text style={styles.label}>Subject Code</Text>
              <Text>{subject.code}</Text>
            </View>
            <View style={styles.subjectItem}>
              <Text style={styles.label}>Semester</Text>
              <Text>{subject.semester}</Text>
            </View>
            <View style={styles.subjectItem}>
              <Text style={styles.label}>Credits</Text>
              <Text>{subject.credits}</Text>
            </View>
          </View>
        </View>

        {activeTab === 'attendance' && (
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={() => markAllAttendance('present')}
            >
              <Text style={styles.buttonText}>Mark All Present</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={() => markAllAttendance('absent')}
            >
              <Text style={styles.buttonText}>Mark All Absent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => setShowExceptionDialog(true)}
            >
              <Text style={styles.buttonText}>Mark All Present Except</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          {filteredStudents.map(student => (
            <View key={student.id} style={styles.studentRow}>
              <Text style={styles.studentName}>{student.name}</Text>
              {activeTab === 'marks' ? (
                <View style={styles.markContainer}>
                  {editingStudent?.id === student.id ? (
                    <View style={styles.editMarkContainer}>
                      <TextInput
                        style={styles.markInput}
                        value={editMark}
                        onChangeText={setEditMark}
                        keyboardType="numeric"
                        maxLength={3}
                      />
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleUpdateMark}
                      >
                        <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => handleEditMark(student)}>
                      <Text style={styles.markText}>Mark: {student.mark}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleAttendance(student.id)}
                  style={[
                    styles.attendanceStatus,
                    student.attendance === 'present' ? styles.presentStatus : styles.absentStatus
                  ]}
                >
                  <Text style={[
                    styles.attendanceText,
                    student.attendance === 'present' ? styles.presentText : styles.absentText
                  ]}>
                    {student.attendance}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showExceptionDialog}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mark All Present Except</Text>
            <Text style={styles.modalSubtitle}>Enter student names separated by commas</Text>
            <TextInput
              style={styles.modalInput}
              value={exceptionInput}
              onChangeText={setExceptionInput}
              placeholder="e.g., John Doe, Jane Smith"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowExceptionDialog(false);
                  setExceptionInput('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleExceptionSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return selectedSubject ? (
    <SubjectManagementPage
      subject={selectedSubject}
      onBack={() => setSelectedSubject(null)}
    />
  ) : (
    <SubjectListPage onSelectSubject={setSelectedSubject} />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  searchInput: {
    backgroundColor: 'white',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  subjectItem: {
    width: '50%',
    padding: 8,
  },
  label: {
    color: '#666',
    marginBottom: 4,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
  },
  markContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  markInput: {
    width: 60,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    padding: 4,
    textAlign: 'center',
  },
  markText: {
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 4,
  },
  saveButtonText: {
    color: 'white',
  },
  attendanceStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  presentStatus: {
    backgroundColor: '#E5FAE5',
  },
  absentStatus: {
    backgroundColor: '#FFE5E5',
  },
  presentText: {
    color: '#1D804D',
  },
  absentText: {
    color: '#CC0000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#666',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E1E1E1',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  attendanceText: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  subjectList: {
    padding: 16,
  },
  subjectCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  subjectDetails: {
    gap: 4,
  },
  subjectCode: {
    fontSize: 16,
    fontWeight: '500',
  },
  subjectInfo: {
    color: '#666',
  },
  facultyName: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#666',
  },
  lastStudentRow: {
    borderBottomWidth: 0,
  }
});

export default Dashboard
;