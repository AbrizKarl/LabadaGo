package com.example.labadago

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton

class DashboardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (!SessionManager.isLoggedIn(this)) {
            goToLogin()
            return
        }

        setContentView(R.layout.activity_dashboard)

        val name = SessionManager.getName(this).orEmpty()
        val role = SessionManager.getRole(this).orEmpty()

        findViewById<TextView>(R.id.tvGreeting).text =
            "${getString(R.string.dashboard_greeting_prefix)} $name"
        findViewById<TextView>(R.id.tvRoleBadge).text = roleLabel(role)

        findViewById<MaterialButton>(R.id.btnLogout).setOnClickListener {
            SessionManager.clearSession(this)
            goToLogin()
        }
    }

    private fun roleLabel(role: String): String = when (role) {
        "STAFF" -> getString(R.string.register_role_staff)
        "CUSTOMER" -> getString(R.string.register_role_customer)
        else -> role
    }

    private fun goToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
