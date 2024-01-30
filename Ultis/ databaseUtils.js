// databaseUtils.js

import { ref, set, get, onValue } from "firebase/database";
import { showToast } from "../Ultis/utilities";
import { db, auth } from "../Ultis/DB";
import { signOut } from "firebase/auth";

export const updateDatabase = (listPath, updatedData, isDelete) => {
  const dbRef = ref(db, listPath);

  set(dbRef, { list: updatedData })
    .then(() => {
      if (isDelete) {
        showToast("success", `Your item has been successfully removed!`);
      } else {
        showToast("success", `Your item has been successfully updated!`);
      }
    })
    .catch(() => {
      if (isDelete) {
        showToast("error", `Your item has not been successfully removed!`);
      } else {
        showToast("error", `Your item has not been successfully updated!`);
      }
    });
};

export const addItemToDatabase = (listPath, newItem) => {
  const dbRef = ref(db, listPath);

  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val().list || [];
      const updatedData = [...existingData, newItem];

      set(dbRef, { list: updatedData })
        .then(() => {
          showToast(
            "success",
            `Your item ${newItem.name} has been successfully added.`
          );
        })
        .catch(() => {
          showToast("error", `Adding item ${newItem.name} was not successful.`);
        });
    } else {
      set(dbRef, { list: [newItem] })
        .then(() => {
          showToast(
            "success",
            `Your item ${newItem.name} has been successfully added.`
          );
        })
        .catch(() => {
          showToast("error", `Adding item ${newItem.name} was not successful.`);
        });
    }
  });
};
export const deleteItemFromDatabase = (listPath, index) => {
  const dbRef = ref(db, listPath);
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val().list || [];
      const updatedData = existingData.filter((_, i) => i !== index);

      updateDatabase(listPath, updatedData, true);
    }
  });
};

export const getListFromDatabase = (listPath, setItems) => {
  const dbRef = ref(db, listPath);

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      setItems(snapshot.val().list);
    }
  });
}
export const getListMessage = async (listName) => {
  try {
    const data = await getAllData(listName);
    
    return data[0].name
      ? data.map((item) => `Item : ${item.name} Quantity : ${item.quantity} - \n`)
      : null;
  } catch (error) {
    console.error("Error fetching list data:", error);
    return null;
  }
}

export const getAllData = (url) => {
  return new Promise((resolve, reject) => {
    let userID = auth.currentUser.uid;
    const Ref = ref(db, url + "/" + userID);

    onValue(
      Ref,
      (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val().list;
          resolve(data);
        } else {
          resolve([{}]);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      showToast("success", `You have successfully logged out`);
    })
    .catch((error) => {
      showToast("error", ` Unsuccessful logout attempt`);
    });
}