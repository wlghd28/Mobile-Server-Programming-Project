package com.example.cafeteria.main

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_changepw.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class ChangepwActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_changepw)

        button_changepw.setOnClickListener {
            if (editText_currentid.text.isEmpty()) {
                Toast.makeText(this, "아이디를 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_currentpw.text.isEmpty()) {
                Toast.makeText(this, "현재 비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_newpw.text.isEmpty()) {
                Toast.makeText(this, "새 비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_checkpw.text.isEmpty()) {
                Toast.makeText(this, "비밀번호를 확인해주세요.", Toast.LENGTH_SHORT).show()
            } else if (editText_newpw.text.toString() == editText_checkpw.text.toString()) {
                fetchJson()
            } else {
                Toast.makeText(this, "입력 정보를 확인해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun fetchJson() = runBlocking(Dispatchers.IO) {

        val user_id = editText_currentid.text.toString()
        val user_pw = editText_currentpw.text.toString()
        val user_newpw = editText_newpw.text.toString()
        val user_checknewpw = editText_checkpw.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_id", user_id)
            .add("user_pw", user_pw)
            .add("user_newpw", user_newpw)
            .add("user_newpwck", user_checknewpw)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/resetPW").put(formbody).build()
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
                        finish()
                        Toast.makeText(this@ChangepwActivity, "비밀번호가 변경되었습니다.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    runOnUiThread {
                        Toast.makeText(this@ChangepwActivity, "비밀번호 변경에 실패했습니다.", Toast.LENGTH_SHORT).show()
                    }
                }

            }
        })
    }
}

