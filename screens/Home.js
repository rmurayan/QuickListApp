// Home.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FruitVegScreen from "./FruitVegScreen";
import MeatFrozenScreen from "./MeatFrozenScreen";
import BeverageSnackScreen from "./BeverageSnackScreen";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DeliBakeryScreen from "./DeliBakeryScreen";
const Tab = createBottomTabNavigator();
const Home = () => {
  const iconTabSize = 30;
  const iconTabColor = "#508D69";
  const headerTabTitleStyle = {
    fontWeight: 700,
    fontSize: 22,
    marginLeft: -10,
  };


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "green",
        headerTitleAlign: "left",
        headerTintColor: "green",
        showIcon: true,
        showLabel: false,
        iconStyle: {
          width: 20,
          height: 20,
        },
        tabStyle: {
          margin: 0.2,
          borderRadius: 2,
        },
        tabBarStyle: {
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          borderBottomColor: "#6D9886",
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
          marginLeft: 5,
        },
      }}
    >
      <Tab.Screen
        name="Fruits & Vegetables"
        component={FruitVegScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Fruits & Vegetables",
          headerRight: () => null,
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="carrot"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="carrot" />
          ),
        }}
      />
      <Tab.Screen
        name="Meat & Frozen"
        component={MeatFrozenScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Meat & Frozen",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="drumstick-bite"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="drumstick-bite" />
          ),
        }}
      />
      <Tab.Screen
        name="Beverages & Snacks"
        component={BeverageSnackScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 22,
            marginLeft: -10,
          },
          headerTitle: "Beverages & Snacks",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="glass-cheers"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="glass-cheers" />
          ),
        }}
      />
      <Tab.Screen
        name="Deli & Bakery"
        component={DeliBakeryScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Deli & Bakery",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="bread-slice"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="bread-slice" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
