package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {

    // Ad və soyadla axtarış
    Optional<PersonalInfo> findByNameAndSurname(String name, String surname);

    // Ada görə axtarış
    List<PersonalInfo> findByNameContainingIgnoreCase(String name);

    // Soyadına görə axtarış
    List<PersonalInfo> findBySurnameContainingIgnoreCase(String surname);

    // Ad və soyad mövcuddurmu yoxlama
    boolean existsByNameAndSurname(String name, String surname);
}
