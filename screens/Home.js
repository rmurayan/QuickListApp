// Home.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FruitVegScreen from './FruitVegScreen';
import MeatFrozenScreen from './MeatFrozenScreen';
import BeverageSnackScreen from './BeverageSnackScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DeliBakeryScreen from './DeliBakeryScreen';
const Tab = createBottomTabNavigator();
const Home = () => {
  const iconTabSize = 30;
  const iconTabColor = '#FB5F43';
  const headerTabTitleStyle = {
    fontWeight: 700,
    fontSize: 22,
    marginLeft: -10,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FB5F43',
        headerTitleAlign: 'left',
        headerTintColor: '#FB5F43',
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
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.4,
          borderBottomColor: '#54A695',
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
          marginLeft: 5,
        },
      }}
    >
      <Tab.Screen
        name="Fruits"
        component={FruitVegScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: 'Fruits',
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
        name="Meat"
        component={MeatFrozenScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: 'Meat',
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
        name="Juices"
        component={BeverageSnackScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 22,
            marginLeft: -10,
          },
          headerTitle: 'Juices',
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
        name="Bakery"
        component={DeliBakeryScreen}
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: 'Bakery',
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
