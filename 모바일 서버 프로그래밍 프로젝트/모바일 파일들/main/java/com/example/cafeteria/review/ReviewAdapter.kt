package com.example.cafeteria.review

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cafeteria.R
import kotlinx.android.synthetic.main.review_list_item.view.*

class ReviewAdapter(var reviewList: ArrayList<Review>): RecyclerView.Adapter<ReviewAdapter.ItemViewHolder>(){

    override fun getItemCount() = reviewList.size;
    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): ItemViewHolder {
        val adapterView = LayoutInflater.from(parent.context).inflate(R.layout.review_list_item,parent,false)
        return ItemViewHolder(adapterView)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bindReviewData(reviewList[position])
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        fun bindReviewData(reviewlist:Review) {
            itemView.ReviewID.text = reviewlist.userid
            itemView.ReviewText.text = reviewlist.review
            itemView.ReviewScore.text = reviewlist.score.toString()
            //itemView.detail_menu_origin.text = menu.origin
            //itemView.detail_menu_price.text = menu.price
        }
    }
}