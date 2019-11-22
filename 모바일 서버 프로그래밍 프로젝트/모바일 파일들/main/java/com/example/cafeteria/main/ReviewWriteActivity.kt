package com.example.cafeteria.main

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_review_write.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class ReviewWriteActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_review_write)

        val menuname = intent.getStringExtra("MenuName")
        Menu_Name.text = menuname

        reviewwrite.setOnClickListener {
            fetchJson()
        }
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){
        val menunumber = intent.getStringExtra("Menu")
        val reviewtext = reviewText.text.toString()
        if(reviewtext.equals(null)){
            runOnUiThread {
                Toast.makeText(this@ReviewWriteActivity,"리뷰를 입력해주세요.", Toast.LENGTH_LONG).show()

            }
        }else if(reviewtext.length > 50){
            runOnUiThread {
                Toast.makeText(this@ReviewWriteActivity,"최대 글자수를 초과했습니다.", Toast.LENGTH_LONG).show()
            }
        }else{
            var score:Int = 0
            when(true){
                radioButton1.isChecked ->{
                    score = 1
                    val formbody: FormBody = FormBody.Builder().add("menunum",menunumber).add("reviewText",reviewtext).add("score", score.toString()).build()

                    val request = Request.Builder().url("http://203.249.127.32:65008/user/writereview").post(formbody).build()
                    val client = OkHttpClient()



                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            println("리퀘스트 실패")
                            println(e)
                        }

                        override fun onResponse(call: Call?, response: Response?) {
                            val body = response?.body()?.string()!!
                            println(body)
                            if(body.equals("OK")){
                                var intent = Intent(this@ReviewWriteActivity,DetailAllMenuListActivity::class.java)
                                intent.putExtra("OK",200)
                                setResult(Activity.RESULT_OK, intent)
                                finish()
                            }
                        }
                    })
                }
                radioButton2.isChecked->{
                    score = 2
                    val formbody: FormBody = FormBody.Builder().add("menunum",menunumber).add("reviewText",reviewtext).add("score", score.toString()).build()

                    val request = Request.Builder().url("http://203.249.127.32:65008/user/writereview").post(formbody).build()
                    val client = OkHttpClient()



                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            println("리퀘스트 실패")
                            println(e)
                        }

                        override fun onResponse(call: Call?, response: Response?) {
                            val body = response?.body()?.string()!!
                            println(body)
                            if(body.equals("OK")){
                                var intent = Intent(this@ReviewWriteActivity,DetailAllMenuListActivity::class.java)
                                intent.putExtra("OK",200)
                                setResult(Activity.RESULT_OK, intent)
                                finish()
                            }
                        }
                    })
                }
                radioButton3.isChecked->{
                    score = 3
                    val formbody: FormBody = FormBody.Builder().add("menunum",menunumber).add("reviewText",reviewtext).add("score", score.toString()).build()

                    val request = Request.Builder().url("http://203.249.127.32:65008/user/writereview").post(formbody).build()
                    val client = OkHttpClient()



                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            println("리퀘스트 실패")
                            println(e)
                        }

                        override fun onResponse(call: Call?, response: Response?) {
                            val body = response?.body()?.string()!!
                            println(body)
                            if(body.equals("OK")){
                                var intent = Intent(this@ReviewWriteActivity,DetailAllMenuListActivity::class.java)
                                intent.putExtra("OK",200)
                                setResult(Activity.RESULT_OK, intent)
                                finish()
                            }
                        }
                    })
                }
                radioButton4.isChecked->{
                    score = 4
                    val formbody: FormBody = FormBody.Builder().add("menunum",menunumber).add("reviewText",reviewtext).add("score", score.toString()).build()

                    val request = Request.Builder().url("http://203.249.127.32:65008/user/writereview").post(formbody).build()
                    val client = OkHttpClient()



                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            println("리퀘스트 실패")
                            println(e)
                        }

                        override fun onResponse(call: Call?, response: Response?) {
                            val body = response?.body()?.string()!!
                            println(body)
                            if(body.equals("OK")){
                                var intent = Intent(this@ReviewWriteActivity,DetailAllMenuListActivity::class.java)
                                intent.putExtra("OK",200)
                                setResult(Activity.RESULT_OK, intent)
                                finish()
                            }
                        }
                    })
                }
                radioButton5.isChecked->{
                    score = 5
                    val formbody: FormBody = FormBody.Builder().add("menunum",menunumber).add("reviewText",reviewtext).add("score", score.toString()).build()

                    val request = Request.Builder().url("http://203.249.127.32:65008/user/writereview").post(formbody).build()
                    val client = OkHttpClient()



                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            println("리퀘스트 실패")
                            println(e)
                        }

                        override fun onResponse(call: Call?, response: Response?) {
                            val body = response?.body()?.string()!!
                            println(body)
                            if(body.equals("OK")){
                                var intent = Intent(this@ReviewWriteActivity,DetailAllMenuListActivity::class.java)
                                intent.putExtra("OK",200)
                                setResult(Activity.RESULT_OK, intent)
                                finish()
                            }
                        }
                    })
                }
            }

        }

    }
}

