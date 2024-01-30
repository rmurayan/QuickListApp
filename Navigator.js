import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ShareModalByPhoneNumber from "./screens/ShareModalByPhoneNumber";
import ShareModalByEmail from "./screens/ShareModalByEmail";
import { isValidPhoneNumber, isEmailValid } from "./Ultis/utilities";
import * as MailComposer from "expo-mail-composer";
import { Alert, Text, View } from "react-native";
import { useState } from "react";
import * as SMS from "expo-sms";
import { showToast } from "./Ultis/utilities";
import { getListMessage, handleLogout } from "./Ultis/ databaseUtils";
import { getCurrentUserInfo } from "./Ultis/DB";
import { useNavigation } from "@react-navigation/native";

export default function Navigator() {
  const navigation = useNavigation();

  const Stack = createStackNavigator();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const shareByEmail = () => {
    setEmailModalVisible(!emailModalVisible);
  };
  const shareByPhoneNumber = () => {
    setPhoneNumberModalVisible(!phoneNumberModalVisible);
  };

  const emailHandleShare = async () => {
    if (email === "" && emailMessage === "") {
      Alert.alert(
        "Missing Fields",
        "Please ensure that both the Email and message fields are not left empty."
      );
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Invalid Email", "The email address is not valid.");
      return;
    }
    try {
      const { status } = await MailComposer.composeAsync({
        recipients: [email],
        subject: "Quick List App",
        body: await getShareMessageContent(emailMessage),
        isHtml: false,
      });

      if (status === "sent") {
        setEmailModalVisible(!emailModalVisible);
        setEmail("");
        setEmailMessage("");
        showToast("success", "Your email has been sent successfully!");
      } else {
        showToast("error", "Unfortunately, the email was not sent");
      }
    } catch (error) {
      showToast("error", "Error composing email");
    }
  };
  const getShareMessageContent = async (userMessage) => {
    let message = "My grocessy list is \n ";
    const listMessages = [
      await getListMessage("FruitVegList"),
      await getListMessage("MeatFrozenList"),
      await getListMessage("BeverageSnackList"),
      await getListMessage("DeliBakeryList"),
    ];
    listMessages.forEach((listMessage, index) => {
      const listName = [
        "Fruit and Vegetable",
        "Meat and Frozen",
        "Beverage and Snack",
        "Deli and Bakery",
      ];
      message += `${index + 1}. The ${listName[index]} list : `;
      if (listMessage === null) {
        message += `\n There is not any item on that list \n `;
      } else {
        message += `\n ${listMessage}`;
      }
    });
    let fullMessageContent = `${userMessage} \n ${message}`;
    return fullMessageContent;
  };

  const phoneNumberHandleShare = async () => {
    if (phoneNumber === "" && phoneNumberMessage === "") {
      Alert.alert(
        "Missing Fields",
        "Please ensure that both the phone number and message fields are not left empty."
      );
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert(
        "Invalid format",
        "The phone number you provided is not valid."
      );
      return;
    }
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        phoneNumber,
        await getShareMessageContent(phoneNumberMessage)
      );
      switch (result) {
        case "sent":
          Alert.alert("Message has been send");
          showToast("success", "Your SMS Message has been sent successfully!");
          setPhoneNumber("");
          setPhoneNumberMessage("");
          setPhoneNumberModalVisible(!phoneNumberModalVisible);
          break;
        case "cancelled":
          showToast("error", "Unfortunately, the SMS Message was not sent");
          break;
        default:
          Alert.alert("Unkown error");
      }
    } else {
      Alert.alert(
        "Error",
        "Unfortunately, SMS service is not currently available for you."
      );
    }
  };

  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "green",
                  textAlign: "center",
                }}
              >
                Quick Pick List App
              </Text>
            ),
            headerLeft: () => null,
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: 5,
                }}
              >
                <FontAwesome5Icon
                  size={25}
                  color={"#508D69"}
                  name="user-alt"
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                    Alert.alert(
                      "User Profile Information",
                      `The email address you have signed is ${
                        getCurrentUserInfo().email
                      }`
                    );
                  }}
                />
                <FontAwesome5Icon
                  size={25}
                  color={"#508D69"}
                  name="share-alt"
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                    Alert.alert(
                      "Choose an option",
                      "How would you like to share?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Share by Email",
                          onPress: () => shareByEmail(),
                        },
                        {
                          text: "Share by Phone Number",
                          onPress: () => shareByPhoneNumber(),
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                />
                <FontAwesome5Icon
                  size={25}
                  color={"#508D69"}
                  name="sign-out-alt"
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    handleLogout();
                    setTimeout(() => {
                      // naviagte to login page
                      navigation.navigate("Login");
                    }, 1000);
                  }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>

      <ShareModalByPhoneNumber
        modalVisible={phoneNumberModalVisible}
        setModalVisible={setPhoneNumberModalVisible}
        setPhoneNumber={setPhoneNumber}
        setShareMessage={setPhoneNumberMessage}
        handleShare={phoneNumberHandleShare}
        phoneNumber={phoneNumber}
        shareMessage={phoneNumberMessage}
      />
      <ShareModalByEmail
        modalVisible={emailModalVisible}
        setModalVisible={setEmailModalVisible}
        setEmail={setEmail}
        setEmailMessage={setEmailMessage}
        handleShare={emailHandleShare}
        email={email}
        emailMessage={emailMessage}
      />
    </>
  );
}
