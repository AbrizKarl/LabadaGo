package com.example.labadago

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.labadago.network.ApiClient
import com.example.labadago.network.AuthResponse
import com.example.labadago.network.LoginRequest
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var tilEmail: TextInputLayout
    private lateinit var tilPassword: TextInputLayout
    private lateinit var etEmail: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var tvError: TextView
    private lateinit var btnLogin: MaterialButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Already signed in (token saved from a previous session) - skip
        // straight to the Dashboard instead of showing the login form.
        if (SessionManager.isLoggedIn(this)) {
            goToDashboard()
            return
        }

        setContentView(R.layout.activity_login)

        tilEmail = findViewById(R.id.tilEmail)
        tilPassword = findViewById(R.id.tilPassword)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        tvError = findViewById(R.id.tvError)
        btnLogin = findViewById(R.id.btnLogin)

        btnLogin.setOnClickListener { attemptLogin() }
        findViewById<TextView>(R.id.tvGoRegister).setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun attemptLogin() {
        tilEmail.error = null
        tilPassword.error = null
        tvError.visibility = TextView.GONE

        val email = etEmail.text?.toString()?.trim().orEmpty()
        val password = etPassword.text?.toString().orEmpty()

        var hasError = false
        if (email.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.error = "Enter a valid email address."
            hasError = true
        }
        if (password.isEmpty()) {
            tilPassword.error = "Password is required."
            hasError = true
        }
        if (hasError) return

        setLoading(true)
        ApiClient.authApi.login(LoginRequest(email, password))
            .enqueue(object : Callback<AuthResponse> {
                override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                    setLoading(false)
                    val body = response.body()
                    if (response.isSuccessful && body?.token != null) {
                        SessionManager.saveSession(
                            this@LoginActivity,
                            body.token,
                            body.name ?: "",
                            body.role ?: ""
                        )
                        goToDashboard()
                    } else {
                        showError(body?.message ?: "We couldn't sign you in.")
                    }
                }

                override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                    setLoading(false)
                    showError("Couldn't reach the server. Check your connection and try again.")
                }
            })
    }

    private fun setLoading(loading: Boolean) {
        btnLogin.isEnabled = !loading
        btnLogin.text = getString(
            if (loading) R.string.login_button_loading else R.string.login_button
        )
    }

    private fun showError(message: String) {
        tvError.text = message
        tvError.visibility = TextView.VISIBLE
    }

    private fun goToDashboard() {
        val intent = Intent(this, DashboardActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
