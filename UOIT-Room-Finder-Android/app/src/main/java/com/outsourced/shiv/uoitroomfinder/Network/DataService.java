package com.outsourced.shiv.uoitroomfinder.Network;

import com.outsourced.shiv.uoitroomfinder.Models.ClassResult;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface DataService {

    @GET("class/all")
    Call<ClassResult> getAllClasses();

    @GET("class/all")
    Call<ClassResult> getClassesByParam(@Query("date") String date,
                                        @Query("start_time") String start_time, @Query("end_time") String end_time);

    @GET("room/all")
    Call<RoomResult> getAllRooms();

}
