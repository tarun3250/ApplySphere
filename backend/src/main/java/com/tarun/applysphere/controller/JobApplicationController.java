package com.tarun.applysphere.controller;

import com.tarun.applysphere.entity.JobApplication;
import com.tarun.applysphere.entity.User;
import com.tarun.applysphere.repository.JobApplicationRepository;
import com.tarun.applysphere.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationController(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllJobs() {
        User user = getCurrentUser();
        return ResponseEntity.ok(jobApplicationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
    }

    @PostMapping
    public ResponseEntity<JobApplication> createJob(@RequestBody JobApplication jobApplication) {
        User user = getCurrentUser();
        jobApplication.setUser(user);
        jobApplication.setStatus("APPLIED");
        return ResponseEntity.ok(jobApplicationRepository.save(jobApplication));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<JobApplication> updateJobStatus(@PathVariable Long id, @RequestBody String status) {
        JobApplication job = jobApplicationRepository.findById(id).orElseThrow();
        if (!job.getUser().getId().equals(getCurrentUser().getId())) {
            return ResponseEntity.status(403).build();
        }
        job.setStatus(status);
        return ResponseEntity.ok(jobApplicationRepository.save(job));
    }
}
