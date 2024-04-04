package com.group5.EatPreyLuv.Amazon;

public class FileInformation {
    private String fileName;
    private String fileUrl;

    // Constructors
    public FileInformation() {
    }

    public FileInformation(String fileName, String fileUrl) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    // Getters and Setters
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}