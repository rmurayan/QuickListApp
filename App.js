import { RootSiblingParent } from "react-native-root-siblings";
import Navigator from "./Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Navigator" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Navigator" component={Navigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
