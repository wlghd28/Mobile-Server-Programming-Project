package com.example.cafeteria.login

import android.os.Bundle
import com.example.cafeteria.R
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_findid.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class FindidActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_findid)

        button_findid.setOnClickListener {
            if (editText_findid_num.text.isEmpty()) {
                Toast.makeText(this, "학번을 입력하세요.", Toast.LENGTH_SHORT).show()
            }else if (editText_findid_name.text.isEmpty()){
                Toast.makeText(this, "이름을 입력하세요.", Toast.LENGTH_SHORT).show()
            }else{
                fetchJson()
            }
        }
    }
    fun fetchJson()= runBlocking(Dispatchers.IO){

        val user_name = editText_findid_name.text.toString()
        val user_num = editText_findid_num.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_name",user_name)
            .add("user_num",user_num)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/findID").post(formbody).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!

                if(body.equals("2")) {
                    runOnUiThread {
                        Toast.makeText(this@FindidActivity, "아이디 찾기 실패", Toast.LENGTH_LONG).show()
                    }
                }else{
                    runOnUiThread {
                        Toast.makeText(this@FindidActivity, "아이디는 ${body} 입니다.", Toast.LENGTH_LONG).show()
                    }
                }
            }
        })
    }
}

