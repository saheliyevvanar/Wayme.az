package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.AboutUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AboutUsRepository extends JpaRepository<AboutUs, Long> {
    List<AboutUs> findBySectionTypeOrderByDisplayOrder(String sectionType);
    List<AboutUs> findAllByOrderByDisplayOrder();
}
