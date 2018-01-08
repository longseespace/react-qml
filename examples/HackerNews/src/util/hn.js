// Rewritten and forked from insin/react-hn

import Firebase from 'firebase';

const MAX_THREAD_NUMBER = 30;
const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/';

const api = new Firebase(BASE_API_URL);

export function getItem(itemId, callback) {
  itemRef(itemId).once('value', snapshot => callback(snapshot.val()));
}

export function getCommentItems(itemIds, callback) {
  const items = new Map();
  itemIds.forEach(itemId =>
    getItem(itemId, item => {
      if (item.type === 'comment') items.set(itemId, item);
      if (items.size >= MAX_THREAD_NUMBER) callback(items, false);
      if (itemIds[itemIds.length - 1] === itemId) callback(items, true); // current last item
    }),
  );
}

export function getItems(itemIds, callback) {
  const items = new Map();
  itemIds.forEach(itemId =>
    getItem(itemId, item => {
      items.set(itemId, item);
      if (items.size >= itemIds.length) callback(items);
    }),
  );
}

export function storiesRef(path) {
  return api.child(path);
}

export function itemRef(id) {
  return api.child('item/' + id);
}

export function userRef(id) {
  return api.child('user/' + id);
}

export function updatesRef() {
  return api.child('updates/items');
}
