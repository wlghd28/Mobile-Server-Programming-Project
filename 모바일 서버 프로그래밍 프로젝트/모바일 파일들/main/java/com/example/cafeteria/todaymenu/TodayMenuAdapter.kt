package com.example.cafeteria.todaymenu

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cafeteria.R
import com.example.cafeteria.main.DetailTodayMenuActivity
import kotlinx.android.synthetic.main.menu_list.view.*

class TodayMenuAdapter(var menuList: ArrayList<TodayMenu>): RecyclerView.Adapter<TodayMenuAdapter.ItemViewHolder>(){

    override fun getItemCount() = menuList.size;
    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): ItemViewHolder {
        val adapterView = LayoutInflater.from(parent.context).inflate(R.layout.menu_list,parent,false)
        return ItemViewHolder(adapterView)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bindMenuData(menuList[position])
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        fun bindMenuData(menu: com.example.cafeteria.todaymenu.TodayMenu){
            itemView.MenuName.text = menu.name

            itemView.setOnClickListener {
                val intent = Intent(itemView.context, DetailTodayMenuActivity::class.java)

                //Log.i("SINGER","singerData:" + singerData.name)
                //intent.putExtra("MenuImg",menu.imgbitmap.toString())
                intent.putExtra("MenuName",menu.name)
                intent.putExtra("Origin", menu.origin)
                intent.putExtra("Price",menu.price.toString())
                itemView.context.startActivity(intent)
            }
        }
    }
}