package com.example.cafeteria.allmenulist

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cafeteria.R
import com.example.cafeteria.main.DetailAllMenuListActivity
import kotlinx.android.synthetic.main.menu_list_item.view.*

class AllMenuListAdapter(var menuList: ArrayList<AllMenuList>): RecyclerView.Adapter<AllMenuListAdapter.ItemViewHolder>(){

    override fun getItemCount() = menuList.size
    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): ItemViewHolder {
        val adapterView = LayoutInflater.from(parent.context).inflate(R.layout.menu_list_item,parent,false)
        return ItemViewHolder(adapterView)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bindMenuData(menuList[position])
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        fun bindMenuData(menulist: com.example.cafeteria.allmenulist.AllMenuList){

            itemView.All_Menu_Name.text = menulist.name
            //itemView.detail_menu_origin.text = menu.origin
            //itemView.detail_menu_price.text = menu.price

            itemView.setOnClickListener {
                val intent = Intent(itemView.context, DetailAllMenuListActivity::class.java)

                //Log.i("SINGER","singerData:" + singerData.name)
                //intent.putExtra("MenuImg",menu.imgbitmap.toString())
                intent.putExtra("Menu_Num",menulist.menunumber.toString())
                intent.putExtra("Menu_Main",menulist.name)
                intent.putExtra("Origin", menulist.origin)
                intent.putExtra("Price",menulist.price.toString())
                itemView.context.startActivity(intent)
            }
        }
    }
}