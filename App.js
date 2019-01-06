import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  TextInput,
  Button,
  Alert,
  Picker,
  Slider,
  Switch,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      language: 'java',
      sliderState: 0,
      switchState: false,
      modalVisible: false,
      calendarState: ''
    };
    this.onDayPress = this.onDayPress.bind(this);

  }

  onDayPress(day) {
    this.setState({
      calendarState: day.dateString,
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleUnhandledTouches() {
    Keyboard.dismiss();
    return false;
  }

  render() {
    const pickerItems = [
      {
        label: "Java",
        value: "java"
      },
      {
        label: "Javascript",
        value: "js"
      }
    ]

    return (
      <View style={styles.container} onStartShouldSetResponder={this.handleUnhandledTouches}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput
          placeholder='Placeholder text'
          keyboardType='numeric'
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={
            (text) => this.setState({text})
          }
          value={this.state.text}
        />
        <Text>{this.state.text}</Text>
        <Button
          onPress={
            () => {
              this.setState({text: ''});
              Alert.alert('Button pressed');
            }
          }
          title='Clear'
        />
        <Picker
          selectedValue={this.state.language}
          onValueChange={
            (itemValue, itemIndex) => this.setState({
              language: itemValue
            })
          }
        >
          {
            pickerItems.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value}/>) 
          }
        </Picker>
        <Text>{this.state.language}</Text>
        <Slider
          style={{ height: 50, width: '100%' }}
          onValueChange={
            (sliderValue) => this.setState({
              sliderState: sliderValue
            })
          }
          maximumValue={100}
        />
        <Text>{this.state.sliderState}</Text>
        <Switch
          style={{ height: 50, width: 50 }}
          onValueChange={
            (switchValue) => this.setState({
              switchState: switchValue
            })
          }
          value={this.state.switchState}
        />
        <Text>{this.state.switchState.toString()}</Text>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed')
          }}
        >
          <View style={styles.container}>
            <View><Text>Modal</Text></View>
            <Button
              onPress={
                () => {
                  this.setModalVisible(false);
                }
              }
              title='Close Modal'
            />
          </View>
        </Modal>
        <Button
          onPress={
            () => {
              this.setModalVisible(true);
            }
          }
          title='Open Modal'
        />
        <Calendar 
          current={'2019-01-06'}
          firstDay={7}
          onDayPress={this.onDayPress}
        />
        <Text>{this.state.calendarState}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  }
});
