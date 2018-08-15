package com.outsourced.shiv.uoitroomfinder.Models;

import com.google.gson.annotations.Expose;

import java.util.List;

public class ClassResult {

    @Expose
    private List<Class> classes;

    public ClassResult(List<Class> classes) {
        this.classes = classes;
    }

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

}
