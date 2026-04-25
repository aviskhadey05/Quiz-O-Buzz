/**
 * auth-helper.js
 *
 * Drop this ONE helper at the top of every protected page's <script> block.
 * It handles:
 *   - getAuthHeaders()  → returns headers object with Authorization token
 *   - checkAuth()       → redirects to login if no token found
 *   - logout()          → clears storage and redirects to login
 */

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

function checkAuth() {
    const token = localStorage.getItem("token");
    const user  = JSON.parse(localStorage.getItem("currentUser"));
    if (!token || !user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
