package com.tarun.applysphere.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AiService {

    private final WebClient webClient;
    private final String apiKey;

    public AiService(WebClient.Builder webClientBuilder, @Value("${app.gemini.api-key}") String apiKey) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.apiKey = apiKey;
    }

    public Mono<String> analyzeResume(String resumeText, String jobDescription) {
        String prompt = String.format(
            "Analyze this resume against the job description.\nResume: %s\nJob Description: %s\n" +
            "Provide a structured response with:\n" +
            "1. Match Score (0-100)\n" +
            "2. MISSING Keywords\n" +
            "3. Skills to highlight\n" +
            "4. Suggested Resume Enhancements\n" +
            "5. A professional cover letter draft.", resumeText, jobDescription);

        return generateContent(prompt);
    }
    
    public Mono<String> generateRecruiterEmail(String name, String role, String company) {
        String prompt = String.format(
            "Write a highly professional and personalized recruiter outreach email. " +
            "I am applying for the %s role at %s. Address the recruiter as %s if provided (otherwise 'Hiring Team'). " +
            "Keep it concise, engaging, and action-oriented.", role, company, name);
            
        return generateContent(prompt);
    }

    private Mono<String> generateContent(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);
        
        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));
        
        requestBody.put("contents", List.of(content));

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-1.5-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                        Map<String, Object> candidate = candidates.get(0);
                        Map<String, Object> contentRes = (Map<String, Object>) candidate.get("content");
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) contentRes.get("parts");
                        return (String) parts.get(0).get("text");
                    } catch (Exception e) {
                        log.error("Failed to parse Gemini response", e);
                        return "Failed to analyze data using AI.";
                    }
                });
    }
}
