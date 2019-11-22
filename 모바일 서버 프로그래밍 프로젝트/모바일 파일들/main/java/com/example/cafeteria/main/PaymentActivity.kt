package com.example.cafeteria.main

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_payment.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class PaymentActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)

        pay.setOnClickListener {
            fetchJson()
        }
    }
    fun fetchJson()= runBlocking(Dispatchers.IO){
        val paynumber = paynumber.text.toString()
        val paypassword = paypassword.text.toString()
        val price = intent.getStringExtra("price")
        val menuname = intent.getStringExtra("menuname")

        val formbody: FormBody = FormBody.Builder()
            .add("paynumber",paynumber)
            .add("paypassword",paypassword)
            .add("price",price).add("menuname",menuname)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/payment").put(formbody).build()
        val client = OkHttpClient()



        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!
                if(body.equals("OK")){
                    val intent = Intent(this@PaymentActivity ,MainActivity::class.java)
                    this@PaymentActivity.startActivity(intent)
                    runOnUiThread {
                        Toast.makeText(this@PaymentActivity,"결제가 완료되었습니다.", Toast.LENGTH_LONG).show()
                        finish()
                    }

                }else if(body.equals("SOLD OUT")){
                    runOnUiThread {
                        Toast.makeText(this@PaymentActivity,"메뉴가 매진되었습니다.", Toast.LENGTH_LONG).show()
                    }
                }else{
                    runOnUiThread {
                        Toast.makeText(this@PaymentActivity,"계좌정보가 잘못되었습니다.", Toast.LENGTH_LONG).show()
                    }
                }
            }
        })
    }
}
