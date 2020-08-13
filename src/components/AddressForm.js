import React, {useState} from 'react';
import {Text, View, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import csc from 'country-state-city'
import RadioButton from '../components/shared/RadioButton';
import styles from '../assets/styles';
import {ScrollView} from 'react-native-gesture-handler';
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import { formatList } from '../helpers'

const defaultAddress = [
  {
    id: 1,
    answer: 'Use as Default',
  },
];

const AddressForm = (props) => {
  const {changeAddress, address} = props;
  const countryList = formatList(csc.getAllCountries());
  return (
    <KeyboardAvoidingView style={{flex: 1}}
    behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <View style={styles.accountBodyContainer}>
        <ScrollView>
          <Text style={styles.accountTextConatiner}>First Name</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.first_name}
            onChangeText={(text) => changeAddress('first_name', text)}
          />
          <Text style={styles.accountTextConatiner}>Last Name</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.last_name}
            onChangeText={(text) => changeAddress('last_name', text)}
          />
          <Text style={styles.accountTextConatiner}>Email</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.email}
            onChangeText={(text) => changeAddress('email', text)}
          />
          <Text style={styles.accountTextConatiner}>Address line 1</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.address_1}
            onChangeText={(text) => changeAddress('address_1', text)}
          />
          <Text style={styles.accountTextConatiner}>Address line 2</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.address_2}
            onChangeText={(text) => changeAddress('address_2', text)}
          />
          <Text style={styles.accountTextConatiner}>City</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.city}
            onChangeText={(text) => changeAddress('city', text)}
          />
          <Text style={styles.accountTextConatiner}>Zip code</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.postcode}
            onChangeText={(text) => changeAddress('postcode', text)}
          />
          <Text style={styles.accountTextConatiner}>State</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.state}
            onChangeText={(text) => changeAddress('state', text)}
          />
          <Text style={styles.accountTextConatiner}>Country</Text>
          <RNPickerSelect
                value={address.country}
                onValueChange={(value) => changeAddress('country', value)}
                items={countryList}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <Chevron size={1} color="gray" />;
                }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderWidth: 1,
                    color: 'black',
                    paddingRight: 20,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    color: 'black',
                    paddingRight: 20,
                  },
                  iconContainer: {
                    top: 10,
                    right: 7,
                  },
                }}
              />
          <Text style={styles.accountTextConatiner}>Phone</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.phone}
            onChangeText={(text) => changeAddress('phone', text)}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
export default AddressForm;
