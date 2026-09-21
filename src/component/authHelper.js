// authHelper.js
const API_URL = 'http://localhost:8000';
const USER_KEY = 'user'; // Utiliser la même clé que dans LoginUser

// ---------- Gestion de l'utilisateur connecté ----------
export function setLoggedInUser(user, remember = false) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function getLoggedInUser() {
  // Vérifier d'abord sessionStorage, puis localStorage
  const sessionUser = sessionStorage.getItem(USER_KEY);
  if (sessionUser) return JSON.parse(sessionUser);
  const localUser = localStorage.getItem(USER_KEY);
  return localUser ? JSON.parse(localUser) : null;
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}

// ---------- Favoris via API backend ----------
export async function getFavorites() {
  const user = getLoggedInUser();
  if (!user) return { coaches: [], courses: [] };
  try {
    const res = await fetch(`${API_URL}/favorites?userId=${user._id}`);
    if (!res.ok) throw new Error('Erreur API');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur getFavorites", err);
    return { coaches: [], courses: [] };
  }
}

export async function toggleFavoriteCoach(coachId) {
  const user = getLoggedInUser();
  if (!user) return null;
  try {
    const res = await fetch(`${API_URL}/favorites/coach/${coachId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    if (!res.ok) throw new Error('Erreur API');
    const data = await res.json();
    return data.favoriteCoaches; // tableau des IDs
  } catch (err) {
    console.error("Erreur toggleFavoriteCoach", err);
    return null;
  }
}

export async function toggleFavoriteCourse(courseId) {
  const user = getLoggedInUser();
  if (!user) return null;
  try {
    const res = await fetch(`${API_URL}/favorites/course/${courseId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    if (!res.ok) throw new Error('Erreur API');
    const data = await res.json();
    return data.favoriteCourses; // tableau des IDs
  } catch (err) {
    console.error("Erreur toggleFavoriteCourse", err);
    return null;
  }
}
const ADMIN_KEY = 'admin';

export function setLoggedInAdmin(admin, remember = false) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function getLoggedInAdmin() {
  const sessionAdmin = sessionStorage.getItem(ADMIN_KEY);
  if (sessionAdmin) return JSON.parse(sessionAdmin);
  const localAdmin = localStorage.getItem(ADMIN_KEY);
  return localAdmin ? JSON.parse(localAdmin) : null;
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_KEY);
  sessionStorage.removeItem(ADMIN_KEY);
}