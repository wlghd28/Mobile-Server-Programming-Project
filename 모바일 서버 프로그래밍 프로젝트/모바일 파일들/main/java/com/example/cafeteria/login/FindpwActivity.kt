package com.example.cafeteria.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_findpw.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class FindpwActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_findpw)

        button_findpw.setOnClickListener {
            if (editText_findpw_id.text.isEmpty()) {
                Toast.makeText(this, "아이디를 입력하세요.", Toast.LENGTH_SHORT).show()
            }
            else if (editText_findpw_num.text.isEmpty()) {
                Toast.makeText(this, "학번을 입력하세요.", Toast.LENGTH_SHORT).show()
            }

            else {
                fetchJson()
            }
        }
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){

        val user_id = editText_findpw_id.text.toString()
        val user_num = editText_findpw_num.text.toString()

        val formbody: FormBody = FormBody.Builder()
            .add("user_id",user_id)
            .add("user_num",user_num)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/mobilefindpw").post(formbody).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!
                if(body.equals("null")){
                    runOnUiThread {
                        Toast.makeText(this@FindpwActivity, "입력정보 오류!", Toast.LENGTH_SHORT).show()
                    }

                }else if(body.equals("OK")){
                    val intent = Intent(this@FindpwActivity, ModifypwActivity::class.java)
                    intent.putExtra("user_id",user_id)
                    startActivity(intent)
                }
            }
        })
    }
}
