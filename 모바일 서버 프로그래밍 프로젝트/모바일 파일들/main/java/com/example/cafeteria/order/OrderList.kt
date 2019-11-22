package com.example.cafeteria.order

data class OrderList(
    val ordernum: Int,
    val date: String,
    val menu: String,
    val price:Int,
    val state:Int,
    val userid:String,
    val account:String
)