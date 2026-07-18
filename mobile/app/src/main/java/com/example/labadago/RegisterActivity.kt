package com.example.labadago

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.labadago.network.ApiClient
import com.example.labadago.network.AuthResponse
import com.example.labadago.network.RegisterRequest
import com.google.android.material.button.MaterialButton
import com.google.android.material.button.MaterialButtonToggleGroup
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private lateinit var toggleRole: MaterialButtonToggleGroup
    private lateinit var tilName: TextInputLayout
    private lateinit var tilEmail: TextInputLayout
    private lateinit var tilPassword: TextInputLayout
    private lateinit var etName: TextInputEditText
    private lateinit var etEmail: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var tvError: TextView
    private lateinit var btnRegister: MaterialButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        toggleRole = findViewById(R.id.toggleRole)
        tilName = findViewById(R.id.tilName)
        tilEmail = findViewById(R.id.tilEmail)
        tilPassword = findViewById(R.id.tilPassword)
        etName = findViewById(R.id.etName)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        tvError = findViewById(R.id.tvError)
        btnRegister = findViewById(R.id.btnRegister)

        btnRegister.setOnClickListener { attemptRegister() }
        findViewById<TextView>(R.id.tvGoLogin).setOnClickListener { finish() }
    }

    private fun attemptRegister() {
        tilName.error = null
        tilEmail.error = null
        tilPassword.error = null
        tvError.visibility = TextView.GONE

        val name = etName.text?.toString()?.trim().orEmpty()
        val email = etEmail.text?.toString()?.trim().orEmpty()
        val password = etPassword.text?.toString().orEmpty()

        var hasError = false
        if (name.isEmpty()) {
            tilName.error = "Full name is required."
            hasError = true
        }
        if (email.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.error = "Enter a valid email address."
            hasError = true
        }
        if (password.length < 8) {
            tilPassword.error = "Use at least 8 characters."
            hasError = true
        }
        if (hasError) return

        val role = if (toggleRole.checkedButtonId == R.id.btnRoleStaff) "STAFF" else "CUSTOMER"

        setLoading(true)
        ApiClient.authApi.register(RegisterRequest(name, email, password, role))
            .enqueue(object : Callback<AuthResponse> {
                override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                    setLoading(false)
                    val body = response.body()
                    if (response.isSuccessful && body?.token != null) {
                        SessionManager.saveSession(
                            this@RegisterActivity,
                            body.token,
                            body.name ?: name,
                            body.role ?: role
                        )
                        goToDashboard()
                    } else {
                        showError(body?.message ?: "We couldn't create your account.")
                    }
                }

                override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                    setLoading(false)
                    showError("Couldn't reach the server. Check your connection and try again.")
                }
            })
    }

    private fun setLoading(loading: Boolean) {
        btnRegister.isEnabled = !loading
        btnRegister.text = getString(
            if (loading) R.string.register_button_loading else R.string.register_button
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
