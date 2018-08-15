package com.outsourced.shiv.uoitroomfinder.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.outsourced.shiv.uoitroomfinder.R;

public class SearchRoomFragment extends Fragment {

    public static SearchRoomFragment newInstance() {
        SearchRoomFragment fragment = new SearchRoomFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_searchroom, container, false);


        return view;
    }
}