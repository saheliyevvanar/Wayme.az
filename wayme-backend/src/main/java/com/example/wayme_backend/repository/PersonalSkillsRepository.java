package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.PersonalSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalSkillsRepository extends JpaRepository<PersonalSkills, Long> {

    Optional<PersonalSkills> findBySessionId(String sessionId);

    @Query("SELECT ps FROM PersonalSkills ps JOIN ps.skills s WHERE LOWER(s) LIKE LOWER(CONCAT('%', :skill, '%'))")
    List<PersonalSkills> findBySkillContaining(@Param("skill") String skill);

    @Query("SELECT DISTINCT s FROM PersonalSkills ps JOIN ps.skills s")
    List<String> findAllUniqueSkills();
}
