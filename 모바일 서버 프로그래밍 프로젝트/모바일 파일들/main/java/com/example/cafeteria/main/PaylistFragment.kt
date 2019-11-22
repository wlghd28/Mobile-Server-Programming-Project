package com.example.cafeteria.main


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.cafeteria.R
import com.example.cafeteria.order.OrderList
import kotlinx.android.synthetic.main.fragment_paylist.view.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import okhttp3.OkHttpClient
import org.json.JSONArray
import java.io.IOException
import java.net.URL

class PaylistFragment : Fragment() {

    val OrderListAdapter by lazy {
        com.example.cafeteria.order.OrderListAdapter(ArrayList())
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v:View = inflater.inflate(R.layout.fragment_paylist, container, false)

        val divider = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)

        v.RecyclerView_InquireOrderList.addItemDecoration(divider)

        //리사이클러뷰에 어댑터 설정
        v.RecyclerView_InquireOrderList.adapter = OrderListAdapter

        //리사이클러뷰에 레이아웃메니저 설정
        v.RecyclerView_InquireOrderList.layoutManager = LinearLayoutManager(activity)


        return v
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        fetchJson()
    }

    fun fetchJson()= runBlocking(Dispatchers.IO){
        val url = URL("http://203.249.127.32:65008/order/search")
        val request = Request.Builder().url(url).build()
        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!
                if (body.equals("null")) {
                    activity?.runOnUiThread {
                        //어답터 설정
                        Toast.makeText(context,"주문내역이 없습니다.", Toast.LENGTH_LONG).show()
                    }

                } else {
                    val orderlist = JSONArray(body)

                    println(body)
                    println(orderlist[0])
                    var orderList: ArrayList<OrderList>?
                    orderList = mappingStringToOrderList(orderlist)

                    //썸네일을 위한 추가 작업
                    orderList?.let {
                        OrderListAdapter.OrderList = it
                        activity?.runOnUiThread{
                            OrderListAdapter.notifyDataSetChanged()
                        }
                    }

                }
            }
        })
        //백그라운드에서 돌기 때문에 메인UI로 접근할 수 있도록 해줘야 한다.
        /*
        runOnUiThread {
            //어답터 설정
            RecyclerView_InquireOrderList.adapter = OrderListAdapter
        }*/

    }
    fun mappingStringToOrderList(jsonBody: JSONArray): ArrayList<OrderList> {

        //newsList 생성
        var orderList: ArrayList<OrderList>? = ArrayList()
        /* JSON형태의 데이터를 JSONObject로 변환한 후 Items를 가져와서 newsItemArray에 할당 */

        /* newsItemArray를 Loop문을 사용하여 뉴스를 아이템(newsItem)별로 추출 */
        for (i in 0 until jsonBody.length()) {
            OrderList(
                ordernum = jsonBody.getJSONObject(i).optInt("Order_Num"),
                date = jsonBody.getJSONObject(i).optString("Date"),
                menu = jsonBody.getJSONObject(i).optString("Menu_Name"),
                price = jsonBody.getJSONObject(i).optInt("Price"),
                state = jsonBody.getJSONObject(i).optInt("Order_State"),
                userid = jsonBody.getJSONObject(i).optString("UserID"),
                account = jsonBody.getJSONObject(i).optString("Account_Num")
            ).run {
                /* News 인스턴스를 만든 후 run으로 받아 newsList에 추가합니다.*/
                orderList!!.add(this)
            }
        }

        /* 생성한 newsList 반환 */
        return orderList!!
    }
}