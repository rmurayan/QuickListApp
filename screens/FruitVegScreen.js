import React, { useState, useEffect } from "react";
import { RenderListItem } from "../screens/ItemListRender";
import ItemModal from "../screens/ItemModal";
import {
  updateDatabase,
  addItemToDatabase,
  deleteItemFromDatabase,
  getListFromDatabase,
} from "../Ultis/ databaseUtils";

import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { auth } from "../Ultis/DB";
import { screenStyle } from "../Ultis/Styles";
const FruitVegScreen = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const listPath = "FruitVegList";

  const clearFields = () => {
    setModalVisible(!modalVisible);
    setItemName("");
    setQuantity("");
    setEditItemIndex(null);
    setEditItemName("");
    setEditQuantity("");
  };
  const getList = () => {
    getListFromDatabase(getListPath(), setItems);
  };

  useEffect(() => {
    getList();
  }, []);

  const addItem = () => {
    if ((itemName || editItemName) && (quantity || editQuantity)) {
      const newItem = {
        name: itemName || editItemName,
        quantity: quantity || editQuantity,
      };
      const itemExists = items.some((item) => item.name === newItem.name);
      if (itemExists && editItemIndex == null) {
        Alert.alert("Item existed",`Item ${newItem.name} already exists in the list`);
      } else {
        if (editItemIndex !== null) {
          const updatedData = items.map((item, index) =>
            index === editItemIndex ? newItem : item
          );

          setItems(updatedData);
          updateDatabase(getListPath(), updatedData);
        } else {
          addItemToDatabase(getListPath(), newItem);
          setItems(...items, newItem);
        }
        clearFields();
      }
    }
  };

  const getCurrentUser = () => {
    return auth.currentUser.uid;
  };

  const getListPath = () => {
    return `${listPath}/${getCurrentUser()}`;
  };
  const startEdit = (index) => {
    const itemToEdit = items[index];
    setEditItemIndex(index);
    setEditItemName(itemToEdit.name);
    setEditQuantity(itemToEdit.quantity);
    setModalVisible(true);
  };
  const renderItem = ({ item, index }) => (
    <RenderListItem
      item={item}
      index={index}
      startEdit={startEdit}
      deleteItem={deleteItem}
    />
  );

  const deleteItem = (index) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setItems(updatedItems);
            deleteItemFromDatabase(getListPath(), index);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require("../assets/BG.jpg")}
      style={{
        flex: 1,
      }}
    >
      <View style={screenStyle.container}>
        {items.length === 0 ? (
          <Image
            source={require("../assets/emptyCart.jpg")}
            style={{ width: 300, height: 300 }}
          />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}

        <ItemModal
          modalVisible={modalVisible}
          editItemIndex={editItemIndex}
          editItemName={editItemName}
          editQuantity={editQuantity}
          setEditItemName={setEditItemName}
          setEditQuantity={setEditQuantity}
          setItemName={setItemName}
          setQuantity={setQuantity}
          itemName={itemName}
          quantity={quantity}
          addItem={addItem}
          clearFields={clearFields}
        />

        <Pressable
          style={screenStyle.createBtnWrapper}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={screenStyle.createBtn}>Add New Item</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default FruitVegScreen;
