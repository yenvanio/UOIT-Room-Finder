package com.outsourced.shiv.uoitroomfinder.Models;

import android.location.Location;

import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;

public class Room {

    @Expose
    private String room;
    @Expose
    private String building;
    @Expose
    private String location;
    private List<Location> locations = new ArrayList<>();

    public Room(String room, String building, String location) {
        this.room = room;
        this.building = building;
        this.location = location;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    private void gatherLocations() {
        String[] arr = this.location.split(";");
        for (int i = 0; i < arr.length; i++) {
            String[] loc_arr = arr[i].split(",");
            double lat = Double.parseDouble(arr[0]);
            double lng = Double.parseDouble(arr[1]);
                Location loc = new Location("");
                loc.setLatitude(lat);
                loc.setLongitude(lng);
            locations.add(loc);
        }
    }

    public class RoomResult {

        @Expose
        private List<Room> rooms;

        public RoomResult(List<Room> rooms) {
            this.rooms = rooms;
        }

        public List<Room> getRooms() {
            return rooms;
        }

        public void setRooms(List<Room> rooms) {
            this.rooms = rooms;
        }

    }
}
