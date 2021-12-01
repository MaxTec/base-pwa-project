import localforage from "localforage";
const store = localforage.createInstance({
  name: "OfflineDB",
});

export default store;
