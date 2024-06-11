package com.bridgeexample

import android.content.ContentResolver
import android.database.Cursor
import android.net.Uri
import android.provider.Telephony
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log

class SmsReaderModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    @ReactMethod(isBlockingSynchronousMethod = true)

    override fun getName(): String {
        return "SmsReaderModule"
    }


    @ReactMethod
    fun readSms(promise: Promise) {
        Log.d("SMS TESTER 1", "readSms method called")

        val contentResolver: ContentResolver = reactApplicationContext.contentResolver
        val uri: Uri = Telephony.Sms.Inbox.CONTENT_URI
        val cursor: Cursor? = contentResolver.query(uri, null, null, null, null)

        if (cursor != null && cursor.moveToFirst()) {
            val smsList = Arguments.createArray()
            do {
                val senderAddress = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.ADDRESS))
                val messageBody = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.BODY))

                // Log the retrieved SMS data
                Log.d("SMS TESTER 2", "Sender: $senderAddress, Body: $messageBody")

                val sms = Arguments.createMap()
                sms.putString("sender", senderAddress)
                sms.putString("body", messageBody)
                smsList.pushMap(sms)
            } while (cursor.moveToNext())
            cursor.close()

            Log.d("SMS TESTER 3", "Sms List: $smsList")
            promise.resolve(smsList)
        } else {
            Log.e("SMS TESTER 4", "No SMS found or cursor is null")
            promise.reject("Error ", "No SMS found")
        }
    }

}
