package com.outsourced.shiv.uoitroomfinder.Fragments;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.Toolbar;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.Toast;

import com.outsourced.shiv.uoitroomfinder.Activities.MainActivity;
import com.outsourced.shiv.uoitroomfinder.Adapters.ExpandableListAdapter;
import com.outsourced.shiv.uoitroomfinder.Models.ClassResult;
import com.outsourced.shiv.uoitroomfinder.Network.DataService;
import com.outsourced.shiv.uoitroomfinder.Network.RetrofitClient;
import com.outsourced.shiv.uoitroomfinder.R;

import com.outsourced.shiv.uoitroomfinder.Models.Class;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    ExpandableListAdapter listAdapter;
    ExpandableListView expListView;
    List<String> listDataHeader = new ArrayList<>();
    HashMap<String, List<Class>> listDataChild = new HashMap<>();
    ProgressDialog mProgressDialog;
    TextView ribbonTitle;
    Toolbar toolbar;
    SwipeRefreshLayout mSwipeRefreshLayout;
    Calendar cal_start, cal_end;
    String displayTime;

    DisplayMetrics metrics;
    int width;

    public static HomeFragment newInstance() {
        HomeFragment fragment = new HomeFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        toolbar = (Toolbar) view.findViewById(R.id.toolbar);
        toolbar.setTitle(R.string.title_home);

        mSwipeRefreshLayout = (SwipeRefreshLayout) view.findViewById(R.id.swiperefresh);
        mSwipeRefreshLayout.setColorSchemeResources(R.color.colorAccent);
        mSwipeRefreshLayout.setOnRefreshListener(
                new SwipeRefreshLayout.OnRefreshListener() {
                    @Override
                    public void onRefresh() {
                        Log.i("", "onRefresh called from SwipeRefreshLayout");
                        startService();
                    }
                }
        );

        mProgressDialog = new ProgressDialog(getActivity());
        expListView = (ExpandableListView) view.findViewById(R.id.expLV);
        ribbonTitle = (TextView) view.findViewById(R.id.ribbon_title);
        mProgressDialog.show();

        metrics = new DisplayMetrics();
        getActivity().getWindowManager().getDefaultDisplay().getMetrics(metrics);
        width = metrics.widthPixels;
        expListView.setIndicatorBounds(width - GetDipsFromPixel(50), width - GetDipsFromPixel(10));

        startService();

        return view;
    }

    private void startService() {
        /* Create handle for the RetrofitInstance interface */
        DataService service = RetrofitClient.getRetrofitInstance().create(DataService.class);
        Call<ClassResult> call = service.getAllClasses();
        call.enqueue(new Callback<ClassResult>() {
            @Override
            public void onResponse(Call<ClassResult> call, Response<ClassResult> response) {
                mProgressDialog.dismiss();
                Log.d("Home: HTTP CODE", Integer.toString(response.code()));
                generateDataList(response.body());
                mSwipeRefreshLayout.setRefreshing(false);
            }

            @Override
            public void onFailure(Call<ClassResult> call, Throwable t) {
                mProgressDialog.dismiss();
                Log.d("Error", t.toString());
                mSwipeRefreshLayout.setRefreshing(false);
                Toast.makeText(getActivity(), "Something went wrong...Please try again!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void generateDataList(ClassResult classes) {
        if (classes.getClasses().size() > 0) {
            List<Class> dataSet = classes.getClasses();
            for (Class c : dataSet) {
                if (!listDataHeader.contains(c.getBuilding())) {
                    listDataHeader.add(c.getBuilding());
                }
                if (!listDataChild.containsKey(c.getBuilding())) {
                    List<Class> cList = new ArrayList<>();
                    cList.add(c);
                    listDataChild.put(c.getBuilding(), cList);
                } else {
                    listDataChild.get(c.getBuilding()).add(c);
                }
            }
            listAdapter = new ExpandableListAdapter(getActivity(), listDataHeader, listDataChild);
            expListView.setAdapter(listAdapter);
            // TODO: Set the ribbon TextView to say "Rooms open from TimeNow - TimeNow + 1 Hour"
            getDisplayTime();
            ribbonTitle.setText(displayTime);
        } else {
            ribbonTitle.setText(R.string.no_rooms);
            Log.d("time", displayTime+" ");
            listDataChild.clear();
            listDataHeader.clear();
            listAdapter = new ExpandableListAdapter(getActivity(), listDataHeader, listDataChild);
            expListView.setAdapter(listAdapter);
        }
    }

    private void getDisplayTime() {
        cal_start = Calendar.getInstance();
        cal_end = Calendar.getInstance();
        cal_end.add(Calendar.HOUR, 1);
        SimpleDateFormat displayFormat = new SimpleDateFormat("hh:mm aa");
        String start = displayFormat.format(cal_start.getTime());
        String end = displayFormat.format(cal_end.getTime());
        displayTime = "Rooms open from " + start + " - " + end;
    }

    public int GetDipsFromPixel(float pixels) {
        // Get the screen's density scale
        final float scale = getResources().getDisplayMetrics().density;
        // Convert the dps to pixels, based on density scale
        return (int) (pixels * scale + 0.5f);
    }
}