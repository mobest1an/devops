package ru.karapetyan.erik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.karapetyan.erik.model.Event;

/**
 * @author erik.karapetyan
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
