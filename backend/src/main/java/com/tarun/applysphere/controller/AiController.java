package com.tarun.applysphere.controller;

import com.tarun.applysphere.service.AiService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze-resume")
    public Mono<ResponseEntity<AiResponse>> analyzeResume(@RequestBody ResumeRequest request) {
        return aiService.analyzeResume(request.getResumeText(), request.getJobDescription())
                .map(result -> ResponseEntity.ok(new AiResponse(result)));
    }

    @PostMapping("/generate-email")
    public Mono<ResponseEntity<AiResponse>> generateEmail(@RequestBody EmailRequest request) {
        return aiService.generateRecruiterEmail(request.getRecruiterName(), request.getRole(), request.getCompanyName())
                .map(result -> ResponseEntity.ok(new AiResponse(result)));
    }
}

@Data
class ResumeRequest {
    private String resumeText;
    private String jobDescription;
}

@Data
class EmailRequest {
    private String recruiterName;
    private String role;
    private String companyName;
}

@Data
class AiResponse {
    private String analysis;
    
    public AiResponse(String analysis) {
        this.analysis = analysis;
    }
}
