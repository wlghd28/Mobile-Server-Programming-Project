package com.example.cafeteria.main

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.cafeteria.R
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.nav_order -> {
                supportFragmentManager.beginTransaction().replace(R.id.fragment_container, TodayMenuFragment()).commit()
            }

            R.id.nav_food_list -> {
                supportFragmentManager.beginTransaction().replace(R.id.fragment_container, AllMenuListFragment()).commit()
            }

            R.id.nav_pay_list -> {
                supportFragmentManager.beginTransaction().replace(R.id.fragment_container, PaylistFragment()).commit()
            }
            R.id.nav_option -> {
                supportFragmentManager.beginTransaction().replace(R.id.fragment_container, OptionFragment()).commit()
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bottom_navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        supportFragmentManager.beginTransaction().replace(R.id.fragment_container, TodayMenuFragment()).commit()
    }

}
