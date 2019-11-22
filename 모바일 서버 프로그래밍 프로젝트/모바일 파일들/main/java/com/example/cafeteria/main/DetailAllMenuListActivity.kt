package com.example.cafeteria.main

import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_detail_all_menu_list.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException
import java.net.URL

class DetailAllMenuListActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_all_menu_list)

        fetchJson()


    }

    fun fetchJson()= runBlocking(Dispatchers.IO){
        val menuname = intent.getStringExtra("Menu_Main")
        val origin = intent.getStringExtra("Origin")
        val price = intent.getStringExtra("Price")

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
                    val menunumber = intent.getStringExtra("Menu_Num")
                    InquireReview.setOnClickListener {
                        val intent = Intent(this@DetailAllMenuListActivity ,ReviewListActivity::class.java)
                        intent.putExtra("Menu",menunumber)
                        this@DetailAllMenuListActivity.startActivityForResult(intent,200)
                    }
                    reviewwrite.setOnClickListener{
                        val intent = Intent(this@DetailAllMenuListActivity ,ReviewWriteActivity::class.java)
                        intent.putExtra("Menu",menunumber)
                        intent.putExtra("MenuName",menuname)
                        this@DetailAllMenuListActivity.startActivityForResult(intent, 200)
                    }
                }
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(resultCode == Activity.RESULT_OK){
            Toast.makeText(this,"리뷰가 등록되었습니다.", Toast.LENGTH_LONG).show()
        }
    }
}
