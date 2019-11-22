package com.example.cafeteria.login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_signup.*
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.OkHttpClient
import okhttp3.Response
import java.io.IOException

class SignupActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)


        button_register.setOnClickListener {
            if(editText_createid.text.isEmpty()){
                Toast.makeText(this, "아이디를 입력해주세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_createnum.text.isEmpty()){
                Toast.makeText(this, "학번을 입력해주세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_createname.text.isEmpty()){
                Toast.makeText(this, "이름을 입력해주세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_createpw.text.isEmpty()){
                Toast.makeText(this, "비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_checkpw.text.isEmpty()){
                Toast.makeText(this, "비밀번호를 확인해주세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_createpw.text.toString() == editText_checkpw.text.toString()){
                fetchJson()
            }else{
                Toast.makeText(this, "입력정보를 확인해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){

        val user_name = editText_createname.text.toString()
        val user_id = editText_createid.text.toString()
        val user_pw = editText_createpw.text.toString()
        val user_num = editText_createnum.text.toString()
        val user_checkpw = editText_checkpw.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_name",user_name)
            .add("user_num",user_num)
            .add("user_id",user_id)
            .add("user_pw",user_pw)
            .add("user_pwch",user_checkpw)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/signIn/register").post(formbody).build()
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
                        Toast.makeText(this@SignupActivity, "회원가입에 성공하셨습니다.", Toast.LENGTH_SHORT).show()
                    }
                    finish()
                }else{
                    Toast.makeText(this@SignupActivity, "회원가입에 실패하셨습니다.", Toast.LENGTH_SHORT).show()
                }
            }
        })
    }
}