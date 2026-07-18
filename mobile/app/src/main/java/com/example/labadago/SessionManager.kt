package com.example.labadago

import android.content.Context

// Mirrors what the web app keeps in localStorage: token, name, role.
object SessionManager {

    private const val PREFS_NAME = "labadago_session"
    private const val KEY_TOKEN = "token"
    private const val KEY_NAME = "name"
    private const val KEY_ROLE = "role"

    private fun prefs(context: Context) =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun saveSession(context: Context, token: String, name: String, role: String) {
        prefs(context).edit()
            .putString(KEY_TOKEN, token)
            .putString(KEY_NAME, name)
            .putString(KEY_ROLE, role)
            .apply()
    }

    fun getToken(context: Context): String? = prefs(context).getString(KEY_TOKEN, null)

    fun getName(context: Context): String? = prefs(context).getString(KEY_NAME, null)

    fun getRole(context: Context): String? = prefs(context).getString(KEY_ROLE, null)

    fun isLoggedIn(context: Context): Boolean = getToken(context) != null

    fun clearSession(context: Context) {
        prefs(context).edit().clear().apply()
    }
}
