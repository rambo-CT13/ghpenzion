import ViewPager from "@react-native-community/viewpager";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RoundShape from "../components/RoundShape";
import { styles } from "../components/Styles";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage, firebase } from "../services/Firebase";
import { Picker } from "@react-native-picker/picker";

export default function AppForm({ route, navigation }) {
  const { email, password } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [digitalAddress, setDigitalAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [town, setTown] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState();
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [phone, setPhone] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nextKin, setNextKin] = useState("");
  const [kinPhone, setKinPhone] = useState("");
  const [image, setImage] = useState(null);
  const [passPhoto, setPassPhoto] = useState("");
  const [income, setIncome] = useState("");
  const contribution = income && income * 0.185;
  const [uploading, setUploading] = useState(false);
  const [signing, setSigning] = useState(false);

  const photoName = "passportpic4" + email;

  //firebase Refs
  const usersRef = db.collection("users");
  const storageRef = storage.ref();

  const onSubmit = () => {
    setSigning(true);
    if (income && nextKin && father && mother && kinPhone) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const uid = user.uid;
          const personData = {
            id: uid,
            email: email,
            firstName,
            lastName,
            otherName,
            previousName,
            digitalAddress,
            town,
            nationality,
            idType,
            idNumber,
            dob,
            marital,
            gender,
            phone,
            fatherName: father,
            motherName: mother,
            nextOfKin: nextKin,
            nextOfKinPhone: kinPhone,
            occupation,
            income,
            contribution,
            passPhoto,
            status: "",
            ssnitNumber: "",
            refNumber: "",
            wallet: "",
          };
          usersRef
            .doc(uid)
            .set(personData)
            .then(() => {
              navigation.navigate("Application Form");
              Alert.alert("You've Successfully Registered on Penzion App");
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              Alert.alert(errorMessage);
              setSigning(false);
            });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorMessage);
          setSigning(false);
          // ..
        });
    } else {
      setSigning(false);
      Alert.alert("Please Complete the Form");
      return;
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      // base64: true,
      // exif: true,
    });
    const response = await fetch(result.uri);
    const blob = await response.blob();
    console.log(result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
      handleUpload(blob);
    }
  };

  const handleUpload = (item) => {
    setUploading(true);
    // // Create the file metadata
    // var metadata = {
    //   contentType: "image/jpeg",
    // };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef
      .child("passportpictures/" + photoName)
      .put(item);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (progress) {
          case 0:
            setUploading(true);

            break;
          case 100:
            setUploading(true);

            break;
          default:
            setUploading(true);
        }
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            setUploading(false);
            Alert.alert("User doesn't have permission to access the object");
            break;

          case "storage/canceled":
            setUploading(false);
            Alert.alert("User canceled the upload");
            break;

          case "storage/unknown":
            setUploading(false);
            Alert.alert("Unknown error occurred");
            break;
          default:
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setPassPhoto(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  const continueForm = () => {
    if (
      firstName &&
      lastName &&
      digitalAddress &&
      town &&
      nationality &&
      idNumber &&
      idType &&
      dob &&
      gender &&
      phone
    ) {
      handlePageChange(2);
    } else {
      Alert.alert("Please Complete the Form");
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: "#eee" }]}>
      <ViewPager
        style={styles.container}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={false}
      >
        <View key="1">
          <KeyboardAwareScrollView style={styles.container}>
            <RoundShape shapeColor="#eee" />
            <Text style={styles.appHead}>Pension Application Form</Text>
            {/* <Text style={styles.subHead}>Personal Details</Text> */}
            <View style={styles.appForm}>
              <Text style={styles.appFormpicText}>Add Passport Photo</Text>
              {uploading ? (
                <View style={styles.uploadingBox}>
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={{ color: "#fff", alignSelf: "center" }}
                  />
                  <Text style={styles.uploadingText}>Uploading...</Text>
                </View>
              ) : passPhoto ? (
                <Image
                  style={styles.appPic}
                  source={{
                    uri: image,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={styles.appPic}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/penzion-1ecd1.appspot.com/o/penzionApp_Pictures%2Fdepositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg?alt=media&token=c3c1fec9-0ac1-4ade-908b-c8ed4189fe10",
                  }}
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={pickImage}
              >
                <Text style={styles.uploadpicText}>
                  {passPhoto ? "Change Photo" : "Upload Photo"}
                </Text>
              </TouchableOpacity>
              <View style={styles.halveCon}>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>First Name</Text>
                  <TextInput
                    style={styles.appInput}
                    placeholder="First Name"
                    placeholderTextColor="#777"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                  />
                </View>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>Last Name</Text>
                  <TextInput
                    style={styles.appInput}
                    placeholder="Last Name"
                    placeholderTextColor="#777"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                  />
                </View>
              </View>
              <View style={styles.halveCon}>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>Other Names</Text>
                  <TextInput
                    style={styles.appInput}
                    placeholder="Other Names"
                    placeholderTextColor="#777"
                    onChangeText={(text) => setOtherName(text)}
                    value={otherName}
                  />
                </View>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>Previous/Maiden Name</Text>
                  <TextInput
                    style={styles.appInput}
                    placeholder="Previous/Maiden Name"
                    placeholderTextColor="#777"
                    onChangeText={(text) => setPreviousName(text)}
                    value={previousName}
                  />
                </View>
              </View>
              <Text style={styles.formLabel}>Digital Address</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Digital Address"
                placeholderTextColor="#777"
                onChangeText={(text) => setDigitalAddress(text)}
                value={digitalAddress}
              />
              <Text style={styles.formLabel}>Town/City</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Town/City"
                placeholderTextColor="#777"
                onChangeText={(text) => setTown(text)}
                value={town}
              />
              <Text style={styles.formLabel}>Nationality</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Nationality"
                placeholderTextColor="#777"
                onChangeText={(text) => setNationality(text)}
                value={nationality}
              />
              <Text style={styles.formLabel}>ID Type</Text>
              <View style={styles.pickerInput}>
                <Picker
                  style={{ color: "#777" }}
                  selectedValue={idType}
                  onValueChange={(itemValue, itemIndex) => setIdType(itemValue)}
                >
                  <Picker.Item label="Select ID Type" value="" />
                  <Picker.Item label="Ghana Card" value="GH Card" />
                  <Picker.Item label="NHIS" value="NHIS" />
                  <Picker.Item label="Voters ID" value="Voters" />
                  <Picker.Item label="Passport" value="Passport" />
                </Picker>
              </View>
              <Text style={styles.formLabel}>ID Number</Text>
              <TextInput
                style={styles.appInput}
                placeholder="ID Number"
                placeholderTextColor="#777"
                onChangeText={(text) => setIdNumber(text)}
                value={idNumber}
              />
              <Text style={styles.formLabel}>Date of Birth</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Date of Birth"
                placeholderTextColor="#777"
                onChangeText={(text) => setDob(text)}
                value={dob}
              />
              <Text
                style={{
                  marginLeft: 3,
                  marginTop: -8,
                  marginBottom: 10,
                  color: "#888",
                }}
              >
                07/05/1980
              </Text>

              <View style={styles.halveCon}>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>Marital Status</Text>
                  <View style={styles.pickerInput}>
                    <Picker
                      style={{ color: "#777" }}
                      selectedValue={marital}
                      onValueChange={(itemValue, itemIndex) =>
                        setMarital(itemValue)
                      }
                    >
                      <Picker.Item label="Marital Status" value="" />
                      <Picker.Item label="Single" value="Single" />
                      <Picker.Item label="Married" value="Married" />
                      <Picker.Item label="Divorced" value="Divorced" />
                      <Picker.Item label="Widowed" value="Widowed" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.half}>
                  <Text style={styles.formLabel}>Gender</Text>
                  <View style={styles.pickerInput}>
                    <Picker
                      style={{ color: "#777" }}
                      selectedValue={gender}
                      onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                      }
                    >
                      <Picker.Item label="Gender" value="" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </View>
              </View>
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Phone Number"
                placeholderTextColor="#777"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                keyboardType="number-pad"
              />

              <TouchableOpacity
                activeOpacity={0.6}
                style={{ flex: 1 }}
                onPress={continueForm}
              >
                <Text style={styles.continueBtn}>Continue</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View key="2">
          <KeyboardAwareScrollView style={styles.container}>
            <RoundShape shapeColor="#eee" />
            <Text style={styles.appHead}>Pension Application Form</Text>
            {/* <Text style={styles.subHead}>Personal Details</Text> */}
            <View style={styles.appForm}>
              <Text style={styles.formLabel}>Name of Father</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Name of Father"
                placeholderTextColor="#777"
                onChangeText={(text) => setFather(text)}
                value={father}
              />
              <Text style={styles.formLabel}>Name of Mother</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Name of Mother"
                placeholderTextColor="#777"
                onChangeText={(text) => setMother(text)}
                value={mother}
              />
              <Text style={styles.formLabel}>Next of Kin's Name</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Next of Kin's Name"
                placeholderTextColor="#777"
                onChangeText={(text) => setNextKin(text)}
                value={nextKin}
              />
              <Text style={styles.formLabel}>Next of Kin's Phone Number</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Next of Kin's Phone Number"
                placeholderTextColor="#777"
                onChangeText={(text) => setKinPhone(text)}
                value={kinPhone}
                keyboardType="number-pad"
              />
              <Text style={styles.formLabel}>Occupation</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Eg: Trader"
                placeholderTextColor="#777"
                onChangeText={(text) => setOccupation(text)}
                value={occupation}
              />
              <Text style={styles.formLabel}>Income Per/month</Text>
              <TextInput
                style={styles.appInput}
                placeholder="Eg: 1500"
                placeholderTextColor="#777"
                onChangeText={(text) => setIncome(text)}
                value={income}
                keyboardType="number-pad"
              />

              <View style={{ flexDirection: "row" }}>
                <Text>Your Contribution : </Text>
                <Text style={{ color: "#dd4400" }}>
                  {income && " GHC " + contribution}
                </Text>
              </View>

              <Text style={{ color: "#dd4400", fontStyle: "italic" }}>
                Note: Your Contribution per month is 18.5% of your monthly
                Income.
              </Text>
              {signing ? (
                <ActivityIndicator
                  color="#dd4400"
                  size="large"
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <View style={styles.btnCon2}>
                  <TouchableOpacity onPress={() => handlePageChange(1)}>
                    <Text style={styles.conBtn1}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} onPress={onSubmit}>
                    <Text style={styles.conBtn}>Submit Form</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ViewPager>
    </View>
  );
}
