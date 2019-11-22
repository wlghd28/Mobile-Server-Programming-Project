package com.example.cafeteria.main

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.view.ContextThemeWrapper
import com.example.cafeteria.R
import com.example.cafeteria.login.LoginActivity
import kotlinx.android.synthetic.main.activity_withdrawal.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException


class WithdrawalActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal)

        button_withdraw.setOnClickListener {
            if (editText_id_withdraw.text.isEmpty()) {
                Toast.makeText(this, "아이디를 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_num_withdraw.text.isEmpty()) {
                Toast.makeText(this, "학번을 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_name_withdraw.text.isEmpty()) {
                Toast.makeText(this, "이름을 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_pw_withdraw.text.isEmpty()) {
                Toast.makeText(this, "비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_checkpw_withdraw.text.isEmpty()) {
                Toast.makeText(this, "비밀번호를 확인해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_pw_withdraw.text.toString() == editText_checkpw_withdraw.text.toString()) {
                val builder = AlertDialog.Builder(ContextThemeWrapper(this, R.style.Theme_AppCompat_Light_Dialog))
                builder.setTitle("회원탈퇴")
                builder.setMessage("회원탈퇴 하시겠습니까?")

                builder.setPositiveButton("회원탈퇴"){_ ,_->
                    fetchJson()
                }
                builder.setNegativeButton("취소"){_,_ ->

                }

                builder.show()

            } else {
                Toast.makeText(this, "입력정보를 확인해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun fetchJson() = runBlocking(Dispatchers.IO) {

        val user_id = editText_id_withdraw.text.toString()
        val user_pw = editText_pw_withdraw.text.toString()
        val user_num = editText_num_withdraw.text.toString()
        val user_name = editText_name_withdraw.text.toString()
        val user_pwch = editText_checkpw_withdraw.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_name", user_name)
            .add("user_num", user_num)
            .add("user_id", user_id)
            .add("user_pw", user_pw)
            .add("user_pwch", user_pwch)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/secession").delete(formbody).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!

                if (body.equals("1")) {
                    runOnUiThread {
                            val intent = Intent(this@WithdrawalActivity, LoginActivity::class.java)
                            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
                            startActivity(intent)

                        Toast.makeText(this@WithdrawalActivity, "회원탈퇴 되었습니다.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    runOnUiThread {
                        Toast.makeText(this@WithdrawalActivity, "회원탈퇴 실패!", Toast.LENGTH_SHORT).show()
                    }
                }

            }
        })

    }
}