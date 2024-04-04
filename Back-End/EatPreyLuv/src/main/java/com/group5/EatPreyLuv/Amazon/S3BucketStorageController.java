package com.group5.EatPreyLuv.Amazon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class S3BucketStorageController {
    @Autowired
    S3BucketStorageService service;

    @GetMapping("/files")
    public ResponseEntity<List<FileInformation>> getAllFiles() {
        List<FileInformation> fileInformationList = service.getAllImages();
        return new ResponseEntity<>(fileInformationList, HttpStatus.OK);
    }

    @DeleteMapping(value = "/file/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileName") String fileName) {
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }
    @PostMapping("/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("fileName") String fileName,
                                             @RequestParam("file") MultipartFile file) {

        return new ResponseEntity<>(service.uploadFile(fileName, file), HttpStatus.OK);
    }
}
