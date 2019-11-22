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
import com.example.cafeteria.allmenulist.AllMenuList
import kotlinx.android.synthetic.main.fragment_allmenulist.view.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import org.json.JSONArray
import java.io.IOException
import java.net.URL

class AllMenuListFragment : Fragment() {

    val AllMenuListAdapter by lazy {
        com.example.cafeteria.allmenulist.AllMenuListAdapter(ArrayList())
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v:View = inflater.inflate(R.layout.fragment_allmenulist, container, false)

        v.RecyclerView_InquireAllMenuList.setHasFixedSize(true)

        val divider = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)

        v.RecyclerView_InquireAllMenuList.addItemDecoration(divider)
        //리사이클러뷰에 어댑터 설정
        v.RecyclerView_InquireAllMenuList.adapter = AllMenuListAdapter

        //리사이클러뷰에 레이아웃메니저 설정
        v.RecyclerView_InquireAllMenuList.layoutManager = LinearLayoutManager(activity)

        return v
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        fetchJson()

    }

    fun fetchJson()= runBlocking(Dispatchers.IO){
        val url = URL("http://203.249.127.32:65008/menu/list")
        val request = Request.Builder().url(url).build()
        val client = OkHttpClient()



        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("리퀘스트 실패")
                println(e)
            }

            override fun onResponse(call: Call?, response: Response?) {
                val body = response?.body()?.string()!!
                if(body.equals("null")){
                    activity?.runOnUiThread{
                        //어답터 설정
                        Toast.makeText(context ,"등록된 메뉴가 없습니다.", Toast.LENGTH_LONG).show()
                    }
                }else{
                    val menu = JSONArray(body)

                    println(body)
                    println(menu)
                    var menuList: ArrayList<AllMenuList>?
                    menuList = mappingStringToMenuList(menu)

                    //썸네일을 위한 추가 작업

                    menuList?.let {
                        AllMenuListAdapter.menuList = it
                        activity?.runOnUiThread {
                            AllMenuListAdapter.notifyDataSetChanged()
                        }
                    }

                }
            }
        })
        //백그라운드에서 돌기 때문에 메인UI로 접근할 수 있도록 해줘야 한다.
        /*
        activity?.runOnUiThread {
            //어답터 설정
            RecyclerView_InquireAllMenuList.adapter = MenuListAdapter
        }*/

    }
    fun mappingStringToMenuList(jsonBody: JSONArray): ArrayList<AllMenuList> {

        //newsList 생성
        var menuList: ArrayList<AllMenuList>? = ArrayList()
        /* JSON형태의 데이터를 JSONObject로 변환한 후 Items를 가져와서 newsItemArray에 할당 */

        /* newsItemArray를 Loop문을 사용하여 뉴스를 아이템(newsItem)별로 추출 */
        for (i in 0 until jsonBody.length()) {
            AllMenuList(
                menunumber = jsonBody.getJSONObject(i).optInt("Menu_Num"),
                name = jsonBody.getJSONObject(i).optString("Menu_Main"),
                origin = jsonBody.getJSONObject(i).optString("Origin"),
                price = jsonBody.getJSONObject(i).optInt("Price")
            ).run {
                /* News 인스턴스를 만든 후 run으로 받아 newsList에 추가합니다.*/
                menuList!!.add(this)
            }
        }


        /* 생성한 newsList 반환 */
        return menuList!!
    }


}

