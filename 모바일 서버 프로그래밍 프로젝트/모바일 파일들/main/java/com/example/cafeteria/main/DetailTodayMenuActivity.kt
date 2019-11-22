package com.example.cafeteria.main

import android.content.Intent
import android.graphics.BitmapFactory
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_detail_today_menu.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException
import java.net.URL

class DetailTodayMenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_today_menu)

        fetchJson()



    }
    fun fetchJson()= runBlocking(Dispatchers.IO){
        val menuname = intent.getStringExtra("MenuName")
        val origin = intent.getStringExtra("Origin")
        val price = intent.getStringExtra("Price")
        if(origin == null){

            finish()
        }else{
            val imgurl = URL("http://203.249.127.32:65008/menu/picture/${menuname}")
            val imgrequest = Request.Builder().url(imgurl).build()
            val imgclient = OkHttpClient()

            imgclient.newCall(imgrequest).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    println("리퀘스트 실패")
                    println(e)
                }
                override fun onResponse(call: Call?, response: Response?) {
                    val imgbody = response?.body()?.byteStream()!!
                    val bitmap = BitmapFactory.decodeStream(imgbody)
                    //imgArray[0] = bitmap.toString()
                    println(bitmap)
                    /*각 JSON마다 News 인스턴스를 만듭니다.*/
                    runOnUiThread {
                        //어답터 설정
                        detail_menu_picture.setImageBitmap(bitmap)
                        detail_menu_name.text = menuname
                        detail_menu_origin.text = origin
                        detail_menu_price.text = price

                        payment.setOnClickListener {
                            val intent = Intent(this@DetailTodayMenuActivity ,PaymentActivity::class.java)
                            intent.putExtra("price",price)
                            intent.putExtra("menuname",menuname)
                            this@DetailTodayMenuActivity.startActivity(intent)
                        }
                    }
                }
            })
        }
    }
}
