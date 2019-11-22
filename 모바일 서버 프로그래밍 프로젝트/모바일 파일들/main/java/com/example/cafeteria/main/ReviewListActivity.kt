package com.example.cafeteria.main

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.cafeteria.R
import com.example.cafeteria.review.Review
import kotlinx.android.synthetic.main.activity_review_list.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import org.json.JSONArray
import java.io.IOException
import java.net.URL

class ReviewListActivity : AppCompatActivity() {

    val ReviewAdapter by lazy {
        com.example.cafeteria.review.ReviewAdapter(ArrayList())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_review_list)

        //val divider = DividerItemDecoration(this, DividerItemDecoration.VERTICAL)
        //RecyclerView_InquireAllMenuList.addItemDecoration(divider)

        //리사이클러뷰에 어댑터 설정
        RecyclerView_InquireReview.adapter = ReviewAdapter

        //리사이클러뷰에 레이아웃메니저 설정
        RecyclerView_InquireReview.layoutManager = LinearLayoutManager(this)

        fetchJson()



    }

    fun fetchJson()= runBlocking(Dispatchers.IO){
        val menunumber = intent.getStringExtra("Menu")
        val url = URL("http://203.249.127.32:65008/user/review/${menunumber}")
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
                    runOnUiThread {
                        //어답터 설정
                        Toast.makeText(this@ReviewListActivity,"등록된 리뷰가 없습니다.", Toast.LENGTH_LONG).show()
                    }
                    finish()
                }else{
                    println(body)

                    val review = JSONArray(body)
                    println(review)
                    var reviewList: ArrayList<Review>?
                    reviewList = mappingStringToReviewList(review)

                    //썸네일을 위한 추가 작업

                    reviewList?.let {
                        ReviewAdapter.reviewList = it
                        runOnUiThread{
                            // 스레드 오류 방지
                            ReviewAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
        })
        //백그라운드에서 돌기 때문에 메인UI로 접근할 수 있도록 해줘야 한다.
        /*
        runOnUiThread {
            //어답터 설정
            RecyclerView_InquireReview.adapter = ReviewAdapter
        }*/

    }
    fun mappingStringToReviewList(jsonBody: JSONArray): ArrayList<Review>? {

        //newsList 생성
        var reviewList: ArrayList<Review>? = ArrayList()
        /* JSON형태의 데이터를 JSONObject로 변환한 후 Items를 가져와서 newsItemArray에 할당 */

        /* newsItemArray를 Loop문을 사용하여 뉴스를 아이템(newsItem)별로 추출 */

        for (i in 0 until jsonBody.length()) {
            Review(
                menunumber = jsonBody.getJSONObject(i).optInt("Menu"),
                userid = jsonBody.getJSONObject(i).optString("UserID"),
                review = jsonBody.getJSONObject(i).optString("reviewText"),
                score = jsonBody.getJSONObject(i).optInt("score")
            ).run {
                /* News 인스턴스를 만든 후 run으로 받아 newsList에 추가합니다.*/
                reviewList!!.add(this)
            }
        }

        /* 생성한 newsList 반환 */

        return reviewList!!
    }
}
