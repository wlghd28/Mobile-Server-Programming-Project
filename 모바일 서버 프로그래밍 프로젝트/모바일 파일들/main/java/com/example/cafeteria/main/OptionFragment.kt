package com.example.cafeteria.main


import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.view.ContextThemeWrapper
import androidx.fragment.app.Fragment
import com.example.cafeteria.R
import com.example.cafeteria.login.LoginActivity
import kotlinx.android.synthetic.main.fragment_option.view.*


class OptionFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_option, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.button_changepw_option.setOnClickListener {
            val intent = Intent(activity, ChangepwActivity::class.java)
            startActivity(intent)
        }

        view.button_logout.setOnClickListener {
            val builder = AlertDialog.Builder(ContextThemeWrapper(activity, R.style.Theme_AppCompat_Light_Dialog))
            builder.setTitle("로그아웃")
            builder.setMessage("로그아웃 하시겠습니까?")

            builder.setPositiveButton("로그아웃") { _, _ ->
                val intent = Intent(activity, LoginActivity::class.java)
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
                startActivity(intent)
            }
            builder.setNegativeButton("취소") { _, _ ->

            }

            builder.show()
        }

        view.button_withdraw_option.setOnClickListener {
            val intent = Intent(activity, WithdrawalActivity::class.java)
            startActivity(intent)
        }
    }
}
