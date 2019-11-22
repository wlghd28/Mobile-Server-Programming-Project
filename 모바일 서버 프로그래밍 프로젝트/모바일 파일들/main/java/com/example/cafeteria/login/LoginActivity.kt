package com.example.cafeteria.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.main.MainActivity
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class LoginActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        button_signup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

        button_findid_login.setOnClickListener {
            val intent = Intent(this, FindidActivity::class.java)
            startActivity(intent)
        }

        button_findpw_login.setOnClickListener {
            val intent = Intent(this, FindpwActivity::class.java)
            startActivity(intent)
        }

        button_signin.setOnClickListener {
            if(editText_inputid.text.isEmpty()){
                Toast.makeText(this,"아이디를 입력해주세요.", Toast.LENGTH_LONG).show()
            }else if(editText_inputpw.text.isEmpty()){
                Toast.makeText(this,"비밀번호를 입력해주세요.", Toast.LENGTH_LONG).show()
            }else{
                fetchJson()

            }
        }
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){

        val user_id = editText_inputid.text.toString()
        val user_pw = editText_inputpw.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_id",user_id)
            .add("user_pw",user_pw)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/logIn").post(formbody).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!

                if(body.equals("1")){
                    runOnUiThread {
                        Toast.makeText(this@LoginActivity,"로그인 성공", Toast.LENGTH_LONG).show()
                    }
                    val intent = Intent(this@LoginActivity, MainActivity::class.java)
                    this@LoginActivity.startActivity(intent)

                }else{
                    runOnUiThread {
                        Toast.makeText(this@LoginActivity,"로그인 실패", Toast.LENGTH_LONG).show()
                    }
                }

            }
        })
    }

}