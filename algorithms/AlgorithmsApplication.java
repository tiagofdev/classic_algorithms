package com.titi.algorithms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@SpringBootApplication
public class AlgorithmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlgorithmsApplication.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource ubccs = new UrlBasedCorsConfigurationSource();
        CorsConfiguration cc = new CorsConfiguration();
        cc.setAllowCredentials(true);
        cc.setAllowedOrigins(Arrays.asList("https://classics-angular-4o5v3rpzga-ue.a.run.app",
                "https://classics-angular-4o5v3rpzga-ue.a.run.app/*",
                "https://classics.tiagofeitosa.com",
                "https://classics.tiagofeitosa.com/*",
                "http://localhost:4200"));
        cc.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        cc.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token",
                "Authorization", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials", "Filename"));
        cc.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        ubccs.registerCorsConfiguration("/**", cc );
        return new CorsFilter(ubccs);
    }

}
