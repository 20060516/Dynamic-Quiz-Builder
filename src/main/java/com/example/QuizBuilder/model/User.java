    package com.example.QuizBuilder.model;

    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String username;
        private String password;
        private String role;
    }
