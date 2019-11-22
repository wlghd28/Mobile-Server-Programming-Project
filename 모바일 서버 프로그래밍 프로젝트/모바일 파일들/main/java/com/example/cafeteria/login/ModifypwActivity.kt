package com.example.cafeteria.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_modifypw.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import okhttp3.FormBody
import okhttp3.OkHttpClient
import java.io.IOException

class ModifypwActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_modifypw)

        button_modifypw.setOnClickListener {
            if (editText_newpw.text.isEmpty()) {
                Toast.makeText(this, "새 비밀번호를 입력하세요.", Toast.LENGTH_SHORT).show()
            }else if(editText_checknewpw.text.isEmpty()){
                Toast.makeText(this, "비밀번호 확인란에 비밀번호를 입력해주세요", Toast.LENGTH_SHORT).show()
            }else if (editText_newpw.text.toString() == editText_checknewpw.text.toString()) {
                fetchJson()
            }else {
                Toast.makeText(this, "새 비밀번호란과 새 비밀번호 확인란이 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){

        val user_pw = editText_newpw.text.toString()
        val user_checkpw = editText_checknewpw.text.toString()
        val user_id = intent.getStringExtra("user_id")

        val formbody: FormBody = FormBody.Builder()
            .add("user_pw",user_pw)
            .add("user_checkpw",user_checkpw)
            .add("user_id",user_id)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/mobilefindpw/change").post(formbody).build()
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
                        Toast.makeText(this@ModifypwActivity, "비밀번호 재설정에 실패했습니다.", Toast.LENGTH_SHORT).show()
                    }

                }else if(body.equals("OK")){
                    runOnUiThread {
                        Toast.makeText(this@ModifypwActivity, "비밀번호가 재설정 되었습니다.", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this@ModifypwActivity, LoginActivity::class.java)
                        startActivity(intent)
                    }
                    finish()
                }
            }
        })
    }
}
