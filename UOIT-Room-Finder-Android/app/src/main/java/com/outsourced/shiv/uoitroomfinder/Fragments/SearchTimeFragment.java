package com.outsourced.shiv.uoitroomfinder.Fragments;

import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.widget.NestedScrollView;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.outsourced.shiv.uoitroomfinder.Adapters.ExpandableListAdapter;
import com.outsourced.shiv.uoitroomfinder.Models.Class;
import com.outsourced.shiv.uoitroomfinder.Models.ClassResult;
import com.outsourced.shiv.uoitroomfinder.Network.DataService;
import com.outsourced.shiv.uoitroomfinder.Network.RetrofitClient;
import com.outsourced.shiv.uoitroomfinder.R;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchTimeFragment extends Fragment {

    ExpandableListAdapter listAdapter;
    ExpandableListView expListView;
    List<String> listDataHeader = new ArrayList<>();
    HashMap<String, List<Class>> listDataChild = new HashMap<>();
    TextView ribbonTitle;

    DisplayMetrics metrics;
    int width;

    EditText edit_date, edit_start_time, edit_end_time;
    Calendar date_cal, start_time_cal, end_time_cal;
    String date, start_time, end_time;

    boolean canSearch = false;
    FloatingActionButton searchFab;

    ProgressDialog mProgressDialog;

    public static SearchTimeFragment newInstance() {
        SearchTimeFragment fragment = new SearchTimeFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_searchtime, container, false);

        mProgressDialog = new ProgressDialog(getActivity());

        expListView = (ExpandableListView) view.findViewById(R.id.expLV);
        expListView.setFocusable(false);
        ribbonTitle = (TextView) view.findViewById(R.id.ribbon_title);

        metrics = new DisplayMetrics();
        getActivity().getWindowManager().getDefaultDisplay().getMetrics(metrics);
        width = metrics.widthPixels;
        expListView.setIndicatorBounds(width - GetDipsFromPixel(50), width - GetDipsFromPixel(10));

        date_cal = Calendar.getInstance();
        start_time_cal = Calendar.getInstance();
        end_time_cal = Calendar.getInstance();

        edit_date = (EditText) view.findViewById(R.id.date);
        edit_start_time = (EditText) view.findViewById(R.id.start_time);
        edit_end_time = (EditText) view.findViewById(R.id.end_time);

        searchFab = (FloatingActionButton) view.findViewById(R.id.search_time);
        searchFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /* Create handle for the RetrofitInstance interface */
                DataService service = RetrofitClient.getRetrofitInstance().create(DataService.class);
                Call<ClassResult> call = service.getClassesByParam(date, start_time, end_time);
                call.enqueue(new Callback<ClassResult>() {
                    @Override
                    public void onResponse(Call<ClassResult> call, Response<ClassResult> response) {
                        mProgressDialog.dismiss();
                        Log.d("Search Time: HTTP CODE", Integer.toString(response.code()));
                        generateDataList(response.body());
                    }

                    @Override
                    public void onFailure(Call<ClassResult> call, Throwable t) {
                        mProgressDialog.dismiss();
                        Log.d("Error", t.toString());
                        Toast.makeText(getActivity(), "Something went wrong...Please try again!", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
        checkParams();

        edit_date.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                checkParams();
            }
        });
        final DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                date_cal.set(Calendar.YEAR, year);
                date_cal.set(Calendar.MONTH, monthOfYear);
                date_cal.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateDateLabel();
            }
        };
        updateDateLabel();
        edit_date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new DatePickerDialog(getActivity(), date, date_cal
                        .get(Calendar.YEAR), date_cal.get(Calendar.MONTH),
                        date_cal.get(Calendar.DAY_OF_MONTH)).show();
            }
        });
        edit_start_time.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                checkParams();
            }
        });

        edit_start_time.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar time = Calendar.getInstance();
                int hour = time.get(Calendar.HOUR_OF_DAY);
                int minute = time.get(Calendar.MINUTE);

                TimePickerDialog sTimePicker = new TimePickerDialog(getActivity(), new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker timePicker, int selectedHour, int selectedMinute) {
                        updateStartTimeLabel(selectedHour, selectedMinute);
                    }
                }, hour, minute, false);
                sTimePicker.setTitle("Select Time");
                sTimePicker.show();

            }
        });

        edit_end_time.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                checkParams();
            }
        });
        edit_end_time.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar time = Calendar.getInstance();
                int hour = time.get(Calendar.HOUR_OF_DAY);
                int minute = time.get(Calendar.MINUTE);

                TimePickerDialog sTimePicker = new TimePickerDialog(getActivity(), new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker timePicker, int selectedHour, int selectedMinute) {
                        updateEndTimeLabel(selectedHour, selectedMinute);
                    }
                }, hour, minute, false);
                sTimePicker.setTitle("Select Time");
                sTimePicker.show();

            }
        });
        updateStartTimeLabel(start_time_cal.get(Calendar.HOUR_OF_DAY), start_time_cal.get(Calendar.MINUTE));
        end_time_cal.add(Calendar.HOUR, 1);
        updateEndTimeLabel(end_time_cal.get(Calendar.HOUR_OF_DAY), end_time_cal.get(Calendar.MINUTE));
        return view;
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
            // TODO: Set the ribbon TextView to say "Open rooms for TimeNow - TimeNow + 1 Hour"
            ribbonTitle.setText("Rooms open from " + edit_start_time.getText().toString()
                                                   + " - " + edit_end_time.getText().toString());
        }
        else {
            // Set the ribbon TextView to say "No Open Rooms"
            ribbonTitle.setText(R.string.no_rooms);
        }
    }

    private void checkParams() {
        // Date
        if (edit_date.getText().toString().equals("")) {
            edit_date.setError("Date cannot be empty");
            canSearch = false;
        } else {
            edit_date.setError(null);
        }
        // Time
        if (end_time_cal.getTimeInMillis() <= start_time_cal.getTimeInMillis()) {
            edit_end_time.setError("End Time must be after Start Time");
            canSearch = false;
        } else if (start_time_cal.getTimeInMillis() >= end_time_cal.getTimeInMillis()) {
            edit_start_time.setError("Start Time must be before End Time");
            canSearch = false;
        } else {
            canSearch = true;
            edit_start_time.setError(null);
            edit_end_time.setError(null);
        }
        searchFab.setEnabled(canSearch);
    }

    private void updateDateLabel() {
        String paramFormat = "YYYY-MM-dd";
        String displayFormat = "MMMM dd yyyy";

        SimpleDateFormat sdf = new SimpleDateFormat(paramFormat, Locale.CANADA);
        date = sdf.format((date_cal.getTime()));

        sdf = new SimpleDateFormat(displayFormat, Locale.CANADA);
        edit_date.setText(sdf.format(date_cal.getTime()));
    }

    private void updateStartTimeLabel(int hour, int minute) {
        start_time_cal.set(Calendar.HOUR_OF_DAY,hour);
        start_time_cal.set(Calendar.MINUTE,minute);

        SimpleDateFormat paramFormat = new SimpleDateFormat("hh:mm:ss");
        SimpleDateFormat displayFormat = new SimpleDateFormat("hh:mm aa");
        start_time = paramFormat.format(start_time_cal.getTime());

        edit_start_time.setText(displayFormat.format(start_time_cal.getTime()));
    }

    private void updateEndTimeLabel(int hour, int minute) {
        end_time_cal.set(Calendar.HOUR_OF_DAY,hour);
        end_time_cal.set(Calendar.MINUTE,minute);

        SimpleDateFormat paramFormat = new SimpleDateFormat("hh:mm:ss");
        SimpleDateFormat displayFormat = new SimpleDateFormat("hh:mm aa");
        end_time = paramFormat.format(end_time_cal.getTime());

        edit_end_time.setText(displayFormat.format(end_time_cal.getTime()));
    }

    public int GetDipsFromPixel(float pixels) {
        // Get the screen's density scale
        final float scale = getResources().getDisplayMetrics().density;
        // Convert the dps to pixels, based on density scale
        return (int) (pixels * scale + 0.5f);
    }
}