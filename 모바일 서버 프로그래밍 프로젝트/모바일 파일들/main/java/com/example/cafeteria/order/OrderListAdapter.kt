package com.example.cafeteria.order

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cafeteria.R
import com.example.cafeteria.main.DetailOrderListActivity
import kotlinx.android.synthetic.main.order_list_item.view.*

class OrderListAdapter(var OrderList: ArrayList<OrderList>): RecyclerView.Adapter<OrderListAdapter.ItemViewHolder>(){

    override fun getItemCount() = OrderList.size;
    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): ItemViewHolder {
        val adapterView = LayoutInflater.from(parent.context).inflate(R.layout.order_list_item,parent,false)
        return ItemViewHolder(adapterView)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bindMenuData(OrderList[position])
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        fun bindMenuData(orderlist: OrderList){
            itemView.Date.text = orderlist.date
            itemView.Menu.text = orderlist.menu

            itemView.setOnClickListener {
                val intent = Intent(itemView.context, DetailOrderListActivity::class.java)

                //Log.i("SINGER","singerData:" + singerData.name)
                //intent.putExtra("MenuImg",menu.imgbitmap.toString())
                intent.putExtra("OrderDate",orderlist.date)
                intent.putExtra("OrderMenu", orderlist.menu)
                intent.putExtra("OrderPrice", orderlist.price.toString())
                intent.putExtra("OrderState", orderlist.state.toString())
                intent.putExtra("OrderUserId", orderlist.userid)
                intent.putExtra("OrderAccount", orderlist.account)
                intent.putExtra("OrderNumber",orderlist.ordernum.toString())
                println(orderlist.ordernum)
                itemView.context.startActivity(intent)
            }
        }
    }
}