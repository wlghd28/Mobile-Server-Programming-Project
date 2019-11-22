package com.example.cafeteria.main

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.activity_detail_order_list.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import java.io.IOException

class DetailOrderListActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_order_list)
        val orderdate = intent.getStringExtra("OrderDate")
        val ordermenu = intent.getStringExtra("OrderMenu")
        val orderprice = intent.getStringExtra("OrderPrice")
        val orderstate = intent.getStringExtra("OrderState")
        val orderuserid = intent.getStringExtra("OrderUserId")
        val orderaccount = intent.getStringExtra("OrderAccount")

        Order_Date.text = orderdate
        Order_Menu.text = ordermenu
        Order_Price.text = orderprice
        Order_State.text = orderstate
        Order_Id.text = orderuserid
        Order_Account.text = orderaccount

        Refund.setOnClickListener {
            fetchJson()
        }

    }
    fun fetchJson()= runBlocking(Dispatchers.IO){
        val orderdate2 = intent.getStringExtra("OrderDate")
        val ordermenu2 = intent.getStringExtra("OrderMenu")
        val orderprice2 = intent.getStringExtra("OrderPrice")
        val orderstate2 = intent.getStringExtra("OrderState")
        val orderuserid2 = intent.getStringExtra("OrderUserId")
        val orderaccount2 = intent.getStringExtra("OrderAccount")
        val ordernumber2 = intent.getStringExtra("OrderNumber")

        println(ordernumber2);


        val formbody: FormBody = FormBody.Builder()
            .add("OrderUserId",orderuserid2)
            .add("OrderAccount",orderaccount2)
            .add("OrderMenu", ordermenu2)
            .add("OrderPrice",orderprice2)
            .add("OrderDate", orderdate2)
            .add("OrderState", orderstate2)
            .add("OrderNumber",ordernumber2)
            .build()

        val request = Request.Builder().url("http://203.249.127.32:65008/user/refund").delete(formbody).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!
                println(body)
                if(body.equals("null")){
                    runOnUiThread {
                        Toast.makeText(this@DetailOrderListActivity,"환불에 실패했습니다.", Toast.LENGTH_LONG).show()
                    }
                }else if(body.equals("OK")){
                    runOnUiThread {
                        Toast.makeText(this@DetailOrderListActivity,"환불되었습니다.", Toast.LENGTH_LONG).show()
                    }
                    finish()
                }else if(body.equals("SOLD")) {
                    runOnUiThread {
                        Toast.makeText(this@DetailOrderListActivity,"이미 먹은 메뉴입니다.", Toast.LENGTH_LONG).show()
                    }
                }
            }
        })
    }
}

