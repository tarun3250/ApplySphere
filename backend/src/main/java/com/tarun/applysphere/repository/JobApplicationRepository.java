package com.tarun.applysphere.repository;

import com.tarun.applysphere.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByUserIdOrderByCreatedAtDesc(Long userId);
}
